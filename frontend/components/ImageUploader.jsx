"use client";

import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

function ImageUploader({ onImageSelect, loading }) {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,

    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
    maxSize: 10485760, //10MB
    noClick: true,
    noKeyboard: true,
  });

  //   Preview Mode
  if (preview) {
    return <div></div>;
  }

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
    </div>
  );
}

export default ImageUploader;
