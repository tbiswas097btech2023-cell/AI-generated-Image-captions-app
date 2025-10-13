import { MessageSquare, Sparkles } from "lucide-react";

interface CaptionDisplayProps {
  caption: string;
  isGenerating: boolean;
}

export const CaptionDisplay = ({ caption, isGenerating }: CaptionDisplayProps) => {
  if (!caption && !isGenerating) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative rounded-3xl bg-gradient-warm p-8 shadow-elegant">
        <div className="absolute -top-3 -left-3 bg-gradient-to-br from-primary to-orange-400 p-3 rounded-2xl shadow-lg animate-float">
          {isGenerating ? (
            <Sparkles className="w-6 h-6 text-white animate-pulse" />
          ) : (
            <MessageSquare className="w-6 h-6 text-white" />
          )}
        </div>
        
        <div className="ml-6">
          <h3 className="text-sm font-semibold font-poppins text-primary mb-3 uppercase tracking-wide">
            {isGenerating ? "Generating Caption..." : "Your Caption"}
          </h3>
          
          <p className="text-lg font-inter text-foreground leading-relaxed">
            {isGenerating ? (
              <span className="inline-flex items-center gap-2">
                <span className="animate-pulse">AI is analyzing your image</span>
                <span className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </span>
            ) : (
              caption
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
