'use client';

import { FileImage, UploadCloud, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Input } from '../ui/input';

const ImageColor = {
  bgColor: 'bg-purple-600',
  fillColor: 'fill-purple-600',
};

interface FileUploadProgress {
  progress: number;
  File: File;
}

export default function ImageUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);

  const removeFile = (file: File) => {
    setFilesToUpload((prevUploadProgress) => {
      return prevUploadProgress.filter((item) => item.File !== file);
    });

    setUploadedFiles((prevUploadedFiles) => {
      return prevUploadedFiles.filter((item) => item !== file);
    });
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFilesToUpload((prevUploadProgress) => {
      return [
        ...prevUploadProgress,
        ...acceptedFiles.map((file) => {
          return {
            progress: 0,
            File: file,
            source: null,
          };
        }),
      ];
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div>
        <label
          {...getRootProps()}
          className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
        >
          <div className=" text-center">
            <div className=" border p-2 rounded-md max-w-min mx-auto">
              <UploadCloud size={20} />
            </div>

            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">Drag files</span>
            </p>
            <p className="text-xs text-gray-500">
              Click to upload files &#40;files should be under 10 MB &#41;
            </p>
          </div>
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg"
          type="file"
          className="hidden"
        />
      </div>

      {filesToUpload.length > 0 && (
        <div>
          <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
            Files to upload
          </p>
          <div className="space-y-2">
            {filesToUpload.map((fileUploadProgress) => {
              return (
                <div
                  key={fileUploadProgress.File.lastModified}
                  className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 pr-2 items-center"
                >
                  <div className="flex items-center flex-1 p-2">
                    <div className="text-white flex">
                      <FileImage size={40} className={ImageColor.fillColor} />,
                    </div>

                    <div className="w-full ml-2 space-y-1">
                      <div className="text-sm flex justify-between items-center">
                        <p className="text-muted-foreground ">
                          {fileUploadProgress.File.name.slice(0, 25)}
                        </p>
                        {/* <span className="text-xs">
                          {fileUploadProgress.progress}%
                        </span> */}
                      </div>
                      {/* <Progress
                          progress={fileUploadProgress.progress}
                          className={ImageColor.bgColor}
                        /> */}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      // if (fileUploadProgress.source)
                      //   fileUploadProgress.source.cancel('Upload cancelled');
                      removeFile(fileUploadProgress.File);
                    }}
                    className="transition-all items-center justify-center cursor-pointer px-2"
                  >
                    <X size={20} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div>
          <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
            Uploaded Files
          </p>
          <div className="space-y-2 pr-3">
            {uploadedFiles.map((file) => {
              return (
                <div
                  key={file.lastModified}
                  className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center flex-1 p-2">
                    <div className="text-white">
                      <FileImage size={40} className={ImageColor.fillColor} />,
                    </div>
                    <div className="w-full ml-2 space-y-1">
                      <div className="text-sm flex justify-between">
                        <p className="text-muted-foreground ">
                          {file.name.slice(0, 25)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(file)}
                    className="items-center justify-center px-2"
                  >
                    <X size={20} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
