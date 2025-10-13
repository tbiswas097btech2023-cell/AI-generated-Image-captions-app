import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onImageSelect: (imageData: string) => void;
  selectedImage: string | null;
  onClear: () => void;
}

export const ImageUpload = ({ onImageSelect, selectedImage, onClear }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelect(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  }, [handleImageUpload]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  }, [handleImageUpload]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!selectedImage ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative rounded-3xl border-2 border-dashed p-12 text-center
            transition-all duration-300 cursor-pointer group
            ${isDragging 
              ? 'border-primary bg-accent/10 scale-105' 
              : 'border-border bg-secondary/30 hover:border-primary/50 hover:bg-accent/5'
            }
          `}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse-soft" />
              <div className="relative bg-gradient-to-br from-primary to-orange-400 p-6 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-poppins text-foreground">
                Drop your image here
              </h3>
              <p className="text-muted-foreground font-inter">
                or click to browse from your device
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ImageIcon className="w-4 h-4" />
              <span>Supports JPG, PNG, WebP</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-3xl overflow-hidden bg-secondary/30 p-4">
          <Button
            onClick={onClear}
            size="icon"
            variant="secondary"
            className="absolute top-6 right-6 z-10 rounded-full bg-white/90 hover:bg-white shadow-lg"
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={selectedImage}
              alt="Uploaded preview"
              className="w-full h-auto max-h-[500px] object-contain bg-white"
            />
          </div>
        </div>
      )}
    </div>
  );
};
