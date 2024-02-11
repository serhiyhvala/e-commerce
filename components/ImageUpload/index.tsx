import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import { FC } from "react";
import { ImagePlus, UploadIcon } from "lucide-react";

interface IImageUploadProps {
  handleUpload: (result: any) => void;
}

const ImageUpload: FC<IImageUploadProps> = ({ handleUpload }) => {
  return (
    <CldUploadWidget uploadPreset="dxdimsn9" onUpload={handleUpload}>
      {({ open }) => {
        function handleOnClick(e: any) {
          e.preventDefault();
          open();
        }
        return (
          <Button variant="outline" onClick={handleOnClick}>
            <ImagePlus className="w-4 h-4 mr-2" />
            Upload an Image
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
