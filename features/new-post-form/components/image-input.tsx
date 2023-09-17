import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { FilePond, registerPlugin } from "react-filepond";
import { FilePondFile, FilePondInitialFile } from "filepond";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { Label } from "@/components/ui/label";

// Register filepond plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

type ImageInputProps = {
  files: FilePondFile[];
  setFiles: (files: FilePondFile[]) => void;
};

export function ImageInput({ files, setFiles }: ImageInputProps) {
  return (
    <div className="App">
      <div className="App">
        <Label className="text-sm dark:text-neutral-300">Images</Label>
        <div className="pb-2" />
        <FilePond
          allowReorder
          files={
            files as unknown as (string | FilePondInitialFile | Blob | File)[]
          }
          onupdatefiles={(fileItems) => {
            // Convert FilePond file items to an array of File objects
            const files = fileItems.map(
              (fileItem) => fileItem.file
            ) as unknown as FilePondFile[];
            setFiles(files);
          }}
          onreorderfiles={(reorderedItems) => {
            // Convert FilePond reordered items to an array of File objects
            const newFiles = reorderedItems.map(
              (item) => item.file
            ) as unknown as FilePondFile[];
            setFiles(newFiles);
          }}
          allowMultiple={true}
          maxFiles={3}
          //   server="/api"
          name="files"
          labelIdle='Drag & Drop your images or <span class="filepond--label-action">Browse</span>'
        />
      </div>
    </div>
  );
}
