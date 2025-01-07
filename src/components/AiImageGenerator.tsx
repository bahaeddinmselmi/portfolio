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

      // Using HuggingFace's Stable Diffusion XL
      const response = await fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
        },
        body: JSON.stringify({
          inputs: `${artStyle === 'photorealistic' ? 'photorealistic, highly detailed, 8k uhd, professional photography, ' : 
                  artStyle === 'anime' ? 'anime style, high quality, detailed anime illustration, ' :
                  artStyle === 'digital-art' ? 'digital art, highly detailed digital painting, trending on artstation, ' :
                  ''}${prompt}`,
          wait_for_model: true,
          use_cache: false,
          parameters: {
            negative_prompt: negativePrompt || "low quality, blurry, distorted, disfigured, bad anatomy",
            width: aspectRatio === '16:9' ? 1024 : aspectRatio === '9:16' ? 576 : 768,
            height: aspectRatio === '16:9' ? 576 : aspectRatio === '9:16' ? 1024 : 768,
            num_inference_steps: Math.floor(quality * 0.5) + 25,
            guidance_scale: enhanceDetails ? 12.0 : 7.5,
            return_full_resolution: true
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to generate image' }));
        throw new Error(errorData.error || 'Failed to generate image');
      }

      // Get the image data
      const imageBlob = await response.blob();
      if (imageBlob.size === 0) {
        throw new Error('Generated image is empty. Please try again.');
      }
      const imageUrl = URL.createObjectURL(imageBlob);
      setGeneratedImages(prev => [imageUrl, ...prev]);
      
      clearInterval(progressInterval);
      setProgress(100);
    } catch (error) {
      console.error('Error generating image:', error);
      alert(error instanceof Error ? error.message : 'Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image. Please try again.');
    }
  };

  const handleVariations = async (imageUrl: string) => {
    setPrompt(`Create a variation of this image: ${imageUrl}`);
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

        <div className="space-y-2">
          <Label>Negative Prompt (Optional)</Label>
          <Textarea
            placeholder="Elements to avoid in the generation..."
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            className="min-h-[60px]"
          />
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating || !prompt} 
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Image
            </>
          )}
        </Button>

        {isGenerating && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Generating image...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}
      </div>

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
  );
};

export default AiImageGenerator;
