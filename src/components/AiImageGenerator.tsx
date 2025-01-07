import React, { useState } from 'react';
import { Wand2, Download, Clock, Coins, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';

interface GenerationOptions {
  artStyle: string;
  quality: number;
  aspectRatio: string;
  enhanceDetails: boolean;
}

const AiImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [artStyle, setArtStyle] = useState('photorealistic');
  const [quality, setQuality] = useState(75);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [enhanceDetails, setEnhanceDetails] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setProgress(0);

    try {
      // Progress animation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 5;
        });
      }, 300);

      // Call Hugging Face API
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY || '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'}`,
          },
          body: JSON.stringify({
            inputs: prompt + (negativePrompt ? ` {negative prompt: ${negativePrompt}}` : ''),
            parameters: {
              num_inference_steps: quality,
              guidance_scale: 7.5,
              width: aspectRatio === '16:9' ? 832 : aspectRatio === '9:16' ? 512 : 640,
              height: aspectRatio === '16:9' ? 512 : aspectRatio === '9:16' ? 832 : 640
            }
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setGeneratedImages(prev => [imageUrl, ...prev]);

      clearInterval(progressInterval);
      setProgress(100);
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleVariations = async (imageUrl: string) => {
    setPrompt('Generate variations of this image');
    await handleGenerate();
  };

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Prompt</Label>
          <Textarea
            placeholder="Describe the image you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        {isGenerating && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Generating image...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {generatedImages.map((image, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
              <img src={image} alt={`Generated ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="sm" variant="secondary" className="text-xs" onClick={() => handleDownload(image)}>
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
                <Button size="sm" variant="secondary" className="text-xs" onClick={() => handleVariations(image)}>
                  <Wand2 className="h-3 w-3 mr-1" />
                  Variations
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 mt-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px] space-y-2">
              <Label>Art Style</Label>
              <Select value={artStyle} onValueChange={setArtStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="photorealistic">Photorealistic</SelectItem>
                  <SelectItem value="artistic">Artistic</SelectItem>
                  <SelectItem value="anime">Anime</SelectItem>
                  <SelectItem value="digital-art">Digital Art</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px] space-y-2">
              <Label>Aspect Ratio</Label>
              <Select value={aspectRatio} onValueChange={setAspectRatio}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1:1">Square (1:1)</SelectItem>
                  <SelectItem value="16:9">Landscape (16:9)</SelectItem>
                  <SelectItem value="9:16">Portrait (9:16)</SelectItem>
                  <SelectItem value="4:3">Standard (4:3)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Quality</Label>
              <span className="text-xs text-muted-foreground">{quality}%</span>
            </div>
            <Slider
              value={[quality]}
              onValueChange={([value]) => setQuality(value)}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Negative Prompt</Label>
            <Textarea
              placeholder="Elements to avoid in the generation..."
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="enhance-details"
              checked={enhanceDetails}
              onCheckedChange={setEnhanceDetails}
            />
            <Label htmlFor="enhance-details">Enhance Details</Label>
          </div>
        </div>
      </div>

      <div className="border-t mt-4 pt-4">
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between">
          <Button
            onClick={handleGenerate}
            disabled={!prompt || isGenerating}
            className="w-full sm:w-auto gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                Generate
              </>
            )}
          </Button>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>~30s per image</span>
            </div>
            <div className="flex items-center gap-1">
              <Coins className="h-3 w-3" />
              <span>2 credits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiImageGenerator;
