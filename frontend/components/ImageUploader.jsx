"use client";

import { Camera, ImageIcon } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";

function ImageUploader({ onImageSelect, loading }) {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {
        // Do whatever you want with the file contents
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      onImageSelect(file);
    },
    [onImageSelect],
  );
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,

    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
    maxSize: 10485760, //10MB
    noClick: true,
    noKeyboard: true,
  });

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onDrop([file]);
    }
  };

  //   Preview Mode
  if (preview) {
    return <div></div>;
  }

  return (
    <>
      <div
        {...getRootProps()}
        className={`relative w-full aspect-square border-2 border-dashed rounded-2xl transition-all cursor-pointer ${isDragActive ? "border-orange-600 bg-orange-50 scale-[1.02]" : "border-stone-300 bg-stone-50 hover:border-orange-400 hover:bg-orange-50/50"}`}
      >
        <input {...getInputProps()} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
          {/* Icon */}
          <div
            className={`p-4 rounded-full transition-all ${isDragActive ? "bg-orange-600 scale-110" : "bg-orange-100"}`}
          >
            {isDragActive ? (
              <ImageIcon className="w-8 h-8 text-white" />
            ) : (
              <Camera className="w-8 h-8 text-orange-600" />
            )}
          </div>

          {/* Text */}
          <div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">
              {isDragActive ? "Drop your image here" : "Scan your Pantry"}
            </h3>
            <p className="text-stone-600 text-sm max-w-sm">
              {isDragActive
                ? "Release to upload"
                : "Take a photo or drag & drop an image of your fridge/pantry"}
            </p>
          </div>

          {!isDragActive && (
            <div>
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className={"gap-2"}
                variant="primary"
              >
                <Camera className="w-4 h-4" />
                Take Photo
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Hidden file input with capture attribute for mobile */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </>
  );
}

export default ImageUploader;
