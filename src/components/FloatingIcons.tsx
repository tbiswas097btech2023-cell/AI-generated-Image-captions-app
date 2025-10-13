import { Camera, Brain, MessageCircle, Sparkles, Image as ImageIcon } from "lucide-react";

export const FloatingIcons = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Camera Icon */}
      <div className="absolute top-20 left-[10%] animate-float" style={{ animationDelay: '0s' }}>
        <div className="bg-primary/10 p-4 rounded-2xl backdrop-blur-sm">
          <Camera className="w-8 h-8 text-primary/40" />
        </div>
      </div>
      
      {/* Brain Icon */}
      <div className="absolute top-40 right-[15%] animate-float" style={{ animationDelay: '1s' }}>
        <div className="bg-primary/10 p-4 rounded-2xl backdrop-blur-sm">
          <Brain className="w-8 h-8 text-primary/40" />
        </div>
      </div>
      
      {/* Message Icon */}
      <div className="absolute bottom-40 left-[20%] animate-float" style={{ animationDelay: '2s' }}>
        <div className="bg-primary/10 p-4 rounded-2xl backdrop-blur-sm">
          <MessageCircle className="w-8 h-8 text-primary/40" />
        </div>
      </div>
      
      {/* Sparkles Icon */}
      <div className="absolute top-1/3 right-[10%] animate-float" style={{ animationDelay: '1.5s' }}>
        <div className="bg-primary/10 p-4 rounded-2xl backdrop-blur-sm">
          <Sparkles className="w-8 h-8 text-primary/40" />
        </div>
      </div>
      
      {/* Image Icon */}
      <div className="absolute bottom-1/3 right-[25%] animate-float" style={{ animationDelay: '0.5s' }}>
        <div className="bg-primary/10 p-4 rounded-2xl backdrop-blur-sm">
          <ImageIcon className="w-8 h-8 text-primary/40" />
        </div>
      </div>
      
      {/* Decorative circles */}
      <div className="absolute top-1/4 left-[5%] w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-1/4 right-[8%] w-40 h-40 bg-orange-300/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
    </div>
  );
};
