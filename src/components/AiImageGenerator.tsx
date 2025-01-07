import React, { useState } from 'react';
import { Wand2, Download, Clock, Coins, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { X } from 'lucide-react';

interface GenerationOptions {
  artStyle: string;
  quality: number;
  aspectRatio: string;
  enhanceDetails: boolean;
}

const AiImageGenerator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [artStyle, setArtStyle] = useState('photorealistic');
  const [quality, setQuality] = useState(75);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [enhanceDetails, setEnhanceDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('generate');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setGeneratedImages(prev => [...prev, '/placeholder-image.jpg']);
          return 0;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-900 to-purple-600 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer">
          <div className="relative z-10">
            <div className="mb-4 text-4xl text-purple-100/80">🎨</div>
            <h3 className="text-xl font-semibold text-white mb-2">AI Image Generator</h3>
            <p className="text-purple-100/80 text-sm">Generate unique and creative images from text descriptions</p>
            <div className="mt-4 flex gap-2">
              <span className="inline-block px-2 py-1 text-xs font-medium text-purple-100 bg-purple-800/50 rounded">React</span>
              <span className="inline-block px-2 py-1 text-xs font-medium text-purple-100 bg-purple-800/50 rounded">TypeScript</span>
              <span className="inline-block px-2 py-1 text-xs font-medium text-purple-100 bg-purple-800/50 rounded">OpenAI</span>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-900/10 transform scale-x-[2] translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[90%] h-[90vh] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">AI Image Generator</h2>
              <DialogClose className="rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
            <Tabs defaultValue="generate" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start mb-2 h-auto p-1 gap-1 bg-muted/50 flex-wrap">
                <TabsTrigger value="generate" className="text-xs py-1.5 px-2 h-auto data-[state=active]:py-1.5">
                  Generate
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-xs py-1.5 px-2 h-auto data-[state=active]:py-1.5">
                  Advanced Settings
                </TabsTrigger>
                <TabsTrigger value="history" className="text-xs py-1.5 px-2 h-auto data-[state=active]:py-1.5">
                  History
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-4">
            <TabsContent value="generate" className="mt-0 space-y-4">
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
                        <Button size="sm" variant="secondary" className="text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="secondary" className="text-xs">
                          <Wand2 className="h-3 w-3 mr-1" />
                          Variations
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-0 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
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

                <div className="space-y-2">
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
            </TabsContent>

            <TabsContent value="history" className="mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                    <img src="/placeholder-image.jpg" alt={`History ${index + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary" className="text-xs">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="secondary" className="text-xs">
                        <Wand2 className="h-3 w-3 mr-1" />
                        Variations
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </div>

          {/* Footer */}
          <div className="border-t p-4">
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
      </DialogContent>
    </Dialog>
  );
};

export default AiImageGenerator;
