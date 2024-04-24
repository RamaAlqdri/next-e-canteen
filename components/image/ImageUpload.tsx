import { useState } from "react";
import Image from "next/image";

const ImageUpload = ({ onUpload }: { onUpload: any }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e:any) => {
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
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
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
