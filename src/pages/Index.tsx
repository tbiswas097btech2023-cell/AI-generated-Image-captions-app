import { useState } from "react";
import { Sparkles, Wand2, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";
import { CaptionDisplay } from "@/components/CaptionDisplay";
import { FloatingIcons } from "@/components/FloatingIcons";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCaption = async () => {
    if (!selectedImage) {
      toast.error("Please upload an image first");
      return;
    }

    setIsGenerating(true);
    setCaption("");

    try {
      // Extract base64 data from the data URL
      const base64Data = selectedImage.split(',')[1];
      
      // Call Lovable Cloud edge function for AI-powered captioning
      const { data, error } = await supabase.functions.invoke('generate-caption', {
        body: { image: base64Data }
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setCaption(data.caption);
      toast.success("Caption generated successfully!");
    } catch (error: any) {
      console.error('Caption generation error:', error);
      toast.error(error.message || "Failed to generate caption. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setCaption("");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      <FloatingIcons />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <header className="pt-16 pb-8 px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 bg-gradient-warm px-6 py-2 rounded-full shadow-soft">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold font-poppins text-primary">
                Where Vision Speaks
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold font-poppins bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent leading-tight">
              Turn Images into Words<br />with AI Magic!
            </h1>
            
            <p className="text-xl md:text-2xl font-inter text-muted-foreground max-w-2xl mx-auto">
              Upload. Generate. Caption. Inspire.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 pb-20">
          <div className="max-w-6xl mx-auto space-y-8">
            <ImageUpload
              onImageSelect={setSelectedImage}
              selectedImage={selectedImage}
              onClear={handleClearImage}
            />

            {selectedImage && (
              <div className="flex justify-center animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Button
                  onClick={handleGenerateCaption}
                  disabled={isGenerating}
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-primary to-orange-500 hover:from-orange-500 hover:to-primary text-white font-poppins font-bold text-lg px-8 py-6 rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Wand2 className={`w-6 h-6 ${isGenerating ? 'animate-spin' : ''}`} />
                    {isGenerating ? 'Generating Magic...' : 'Generate Caption'}
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
              </div>
            )}

            <CaptionDisplay caption={caption} isGenerating={isGenerating} />
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-inter">
            <Brain className="w-4 h-4 text-primary" />
            <span>Powered by AI • Language meets Vision</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
