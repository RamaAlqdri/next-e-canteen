import { useState } from "react";
import Image from "next/image";

const ImageUpload = ({ onUpload }: { onUpload: any }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = () => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      // Kirim formData ke endpoint server menggunakan fetch atau axios
      // Misalnya:
      // fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // })
      // .then(response => response.json())
      // .then(data => {
      //   console.log('Upload success:', data);
      //   onUpload(data.imageUrl); // Panggil callback dengan URL gambar yang diunggah
      // })
      // .catch(error => console.error('Upload error:', error));

      // Untuk contoh, kita akan panggil callback secara langsung
      onUpload(URL.createObjectURL(image));
    }
  };

  return (
    <div className="px-10 py-10 border border-spacing-3 border-collapse rounded-xl">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.927 7.99C12.317 7.082 6.617 11.99 7 18.5M4.5 6C4.5 6.53043 4.71071 7.03914 5.08579 7.41421C5.46086 7.78929 5.96957 8 6.5 8C7.03043 8 7.53914 7.78929 7.91421 7.41421C8.28929 7.03914 8.5 6.53043 8.5 6C8.5 5.46957 8.28929 4.96086 7.91421 4.58579C7.53914 4.21071 7.03043 4 6.5 4C5.96957 4 5.46086 4.21071 5.08579 4.58579C4.71071 4.96086 4.5 5.46957 4.5 6Z"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 11.066C3.78 10.681 6.275 12.024 7.624 14.166"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 7.4C1 5.16 1 4.04 1.436 3.184C1.81949 2.43139 2.43139 1.81949 3.184 1.436C4.04 1 5.16 1 7.4 1H12.6C14.84 1 15.96 1 16.816 1.436C17.5686 1.81949 18.1805 2.43139 18.564 3.184C19 4.04 19 5.16 19 7.4V12.6C19 14.84 19 15.96 18.564 16.816C18.1805 17.5686 17.5686 18.1805 16.816 18.564C15.96 19 14.84 19 12.6 19H7.4C5.16 19 4.04 19 3.184 18.564C2.43139 18.1805 1.81949 17.5686 1.436 16.816C1 15.96 1 14.84 1 12.6V7.4Z"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <input className="" type="file" accept="image/*" onChange={handleImageChange} />
      {/* <button onClick={handleUpload}>Upload</button> */}
      {image && (
        <div>
          <Image
            src={URL.createObjectURL(image)}
            alt="Preview"
            width={300}
            height={300}
            className="object-cover sm:h-full h-24 w-24 rounded-2xl sm:w-full"
          />
        </div>
      )}
      {/* <img src={} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} /> */}
    </div>
  );
};

export default ImageUpload;
