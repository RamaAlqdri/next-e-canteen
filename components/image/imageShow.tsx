// components/ImageDisplay.js
import { useState, useEffect } from "react";
import Image from "next/image";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { set } from "firebase/database";

interface ImageDisplayProps {
  path: string;
  setError?: (error: boolean) => void;
  defaultPath: string;
  imgStyle: string;
}

const ImageDisplay = ({
  path,
  setError,
  defaultPath,
  imgStyle,
}: ImageDisplayProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, path); // Ganti dengan path ke gambar Anda
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
        // if (path === "") setImageUrl(defaultPath);
      } catch (error) {
        if (setError) setError(true);

        setImageUrl(defaultPath);
        console.log("Error fetching image:", error);
      }
    };

    fetchImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
    </>
  );
};

export default ImageDisplay;
