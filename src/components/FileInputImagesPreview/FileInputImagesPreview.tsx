import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function FileInputImagesPreview({
  images,
  onRemove,
}: {
  images: FileList | File[] | null | undefined;
  onRemove: (index: number) => void;
}) {
  console.log(images);
  if (!images) return null;

  return (
    <div className="grid grid-cols-3 gap-4">
      {[...images].map((image, index) => (
        <div key={index} className="relative">
          <Image
            width={200}
            height={200}
            src={URL.createObjectURL(image)}
            alt="preview"
            className="w-full h-40 object-cover"
          />
          <Button
            size={"icon"}
            variant={"destructive"}
            onClick={() => onRemove(index)}
            className="absolute top-1 right-1 "
          >
            <Trash />
          </Button>
        </div>
      ))}
    </div>
  );
}
