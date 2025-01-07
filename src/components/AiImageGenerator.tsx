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

      // Using Replicate's SDXL model
      const response = await fetch('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${import.meta.env.VITE_REPLICATE_API_KEY}`,
        },
        body: JSON.stringify({
          version: "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
          input: {
            prompt: `${artStyle === 'photorealistic' ? 'photorealistic, highly detailed, 8k uhd, professional photography, ' : 
                    artStyle === 'anime' ? 'anime style, high quality, detailed anime illustration, ' :
                    artStyle === 'digital-art' ? 'digital art, highly detailed digital painting, trending on artstation, ' :
                    ''}${prompt}`,
            negative_prompt: negativePrompt || "low quality, blurry, distorted, disfigured, bad anatomy",
            width: aspectRatio === '16:9' ? 1024 : aspectRatio === '9:16' ? 576 : 768,
            height: aspectRatio === '16:9' ? 576 : aspectRatio === '9:16' ? 1024 : 768,
            num_outputs: 1,
            scheduler: "K_EULER",
            num_inference_steps: Math.floor(quality * 0.5) + 25,
            guidance_scale: enhanceDetails ? 12.0 : 7.5,
            refine: enhanceDetails ? "expert_ensemble_refiner" : "no_refiner",
            high_noise_frac: enhanceDetails ? 0.95 : 0.8,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to start image generation');
      }

      const prediction = await response.json();
      
      // Poll for results
      let result = null;
      while (!result) {
        const pollResponse = await fetch(prediction.urls.get, {
          headers: {
            'Authorization': `Token ${import.meta.env.VITE_REPLICATE_API_KEY}`,
          },
        });
        
        if (!pollResponse.ok) {
          throw new Error('Failed to check generation status');
        }

        const pollResult = await pollResponse.json();
        if (pollResult.status === 'succeeded') {
          result = pollResult;
          break;
        } else if (pollResult.status === 'failed') {
          throw new Error('Image generation failed');
        }

        // Wait before polling again
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Add generated image to the list
      if (result.output && result.output[0]) {
        setGeneratedImages(prev => [result.output[0], ...prev]);
      }

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
