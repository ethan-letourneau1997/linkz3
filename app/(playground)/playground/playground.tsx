"use client";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { ChangeEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function Playground() {
  const [image, setImage] = useState<string | null>(null);

  const [cropper, setCropper] = useState<Cropper>();

  const supabase = createClientComponentClient();

  const setNewImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const getCropData = async () => {
    if (cropper) {
      const file = await fetch(cropper.getCroppedCanvas().toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
          return new File([blob], "newAvatar.png", { type: "image/png" });
        });
      if (file) {
        const filename = uuidv4();

        const { data, error } = await supabase.storage
          .from("images")
          .upload(`/public/${filename}`, file, {
            cacheControl: "3600",
            upsert: false,
          });
        if (data) {
          console.log(data);
        }
        if (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={setNewImage}
      />
      {image && (
        <>
          <Cropper
            aspectRatio={1}
            src={image}
            style={{ height: 400, width: 400 }}
            initialAspectRatio={4 / 3}
            minCropBoxHeight={100}
            minCropBoxWidth={100}
            guides={false}
            checkOrientation={false}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />
          <button onClick={getCropData}>Crop Image</button>
        </>
      )}
    </div>
  );
}

// "use client";

// import "react-image-crop/dist/ReactCrop.css";

// import ReactCrop, { Crop } from "react-image-crop";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";

// export function Playground() {
//   const [crop, setCrop] = useState<Crop>();

//   const [image, setImage] = useState<string | null>(null);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];

//     if (file) {
//       // Read the selected file as a data URL and set it to the image state
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         if (e.target) {
//           setImage(e.target.result as string);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <>
//       <div className="grid w-full max-w-sm items-center gap-1.5">
//         <Label htmlFor="picture">Picture</Label>
//         <Input id="picture" type="file" onChange={handleImageChange} />
//       </div>
//       <div className="max">
//         {image && (
//           <ReactCrop
//             circularCrop
//             aspect={1}
//             crop={crop}
//             onChange={(c) => setCrop(c)}
//           >
//             <img src={image} />
//           </ReactCrop>
//         )}
//       </div>
//     </>
//   );
// }
