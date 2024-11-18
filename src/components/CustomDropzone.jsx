"use client";

import Dropzone from "react-dropzone";
import { DiDropbox } from "react-icons/di";

export default function CustomDropzone({ setFile }) {
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      Object.keys(acceptedFiles).forEach(async (key) => {
        const selectedFile = acceptedFiles[key];
        const base64 = await fileToBase64(selectedFile);
        setFile((pre) => [
          ...pre,
          {
            fileBase64: base64,
            fileName: selectedFile.name,
            url: URL.createObjectURL(selectedFile),
          },
        ]);
      });
    }
  };

  return (
    <Dropzone
      onDrop={handleFileChange}
      maxFiles={10}
      accept={{
        "image/*": [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".tiff", ".svg"],
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <section
          {...getRootProps()}
          className="flex w-full cursor-pointer h-full p-2 rounded border-dashed items-center justify-center border"
        >
          <div>
            <input {...getInputProps()} />
            <p className="text-sm flex items-center gap-2 text-muted-foreground">
              <DiDropbox size={"25px"} /> Drag &apos;n&apos; drop an image here, or click
              to select a file
            </p>
          </div>
        </section>
      )}
    </Dropzone>
  );
}
