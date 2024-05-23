// components/ImageDisplay.js
import { useState, useEffect } from "react";
import Image from "next/image";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { set } from "firebase/database";

const ImageDisplay = ({
  path,
  defaultPath,
  imgStyle,
}: {
  path: string;
  defaultPath: string;
  imgStyle: string;
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, path); // Ganti dengan path ke gambar Anda
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
        // if (path === "") setImageUrl(defaultPath);
      } catch (error) {
        setImageUrl(defaultPath);
        console.log("Error fetching image:", error);
      }
    };

    fetchImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      {imageUrl && (
        <Image
          loader={() => imageUrl}
          src={imageUrl}
          alt="Image"
          width={500}
          height={500}
          className={imgStyle}
        />
      )}
    </div>
  );
};

export default ImageDisplay;
