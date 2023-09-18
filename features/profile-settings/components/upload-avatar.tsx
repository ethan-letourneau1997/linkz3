"use client";

import "cropperjs/dist/cropper.css";

import { ChangeEvent, useState } from "react";

import Cropper from "react-cropper";
import { PublicProfile } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { upsertUserAvatar } from "../api/upsert-user-avatar";
import { v4 as uuidv4 } from "uuid";

type UploadAvatarProps = {
  user: PublicProfile;
};

export function UploadAvatar({ user }: UploadAvatarProps) {
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
          const { data: publicUrl } = await supabase.storage
            .from("images")
            .getPublicUrl(`${data.path}`);

          if (publicUrl) {
            upsertUserAvatar(publicUrl.publicUrl);
            await supabase
              .from("public_profile")
              .upsert({
                id: user.id,
                avatar: publicUrl.publicUrl,
                username: user.username,
                biography: user.biography,
              })
              .select();
          }
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
