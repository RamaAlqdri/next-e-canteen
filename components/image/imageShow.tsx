import React, { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase"; // Adjust the path as necessary
import Image from "next/image";

const ImageDownloader = ({ imagePath }: { imagePath: string }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const imageRef = ref(storage, imagePath);

    getDownloadURL(imageRef)
      .then((url) => {
        setImageUrl(url);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching image:", err);
        setError("Failed to load image");
        setLoading(false);
      });

      console.log(imageUrl);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadImage = () => {
    if (!imageUrl) return;

    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      const blob = xhr.response;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "downloaded-image.jpg";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    };
    xhr.open("GET", imageUrl);
    xhr.send();
  };

  return (
    <div>
      {loading ? (
        <p>Loading image...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>hehehe</div>
        // <Image
        //   src={imageUrl}
        //   alt="From Firebase"
        //   width={640} // Specify desired width
        //   height={480} // Specify desired height
        //   layout="responsive"
        // />
      )}
    </div>
  );
};

export default ImageDownloader;
