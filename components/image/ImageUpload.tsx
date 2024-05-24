import { useState } from "react";
import Image from "next/image";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes } from "firebase/storage";
import ImageDisplay from "./imageShow";
import { set } from "firebase/database";

interface ImageUploadProps {
  maxSize: number;
  setImageFile: (file: any) => void;
  path?: string;
}

const ImageUpload = ({ maxSize, setImageFile, path }: ImageUploadProps) => {
  const [image, setImage] = useState(null);
  // const [pathImage, setPathImage] = useState(path || "");
  const [isChanged, setIsChanged] = useState(false);
  const [isError, setIsError] = useState(false);
  // console.log(path);

  const handleImageChange = (e: any) => {
    if (e) {
      const file = e.target.files[0];
      if (file.size > maxSize * 1024) {
        alert("Ukuran file terlalu besar!");
        e.target.value = null;
        return;
      }
      // setIsChanged(true);
      setImage(file);
      setImageFile(file);
      console.log(image);
    }
  };

  const [color, setColor] = useState("gray");

  const randomId = Math.random().toString(36).substring(7);

  return (
    <div
      onMouseEnter={() => {
        setColor("#EEA147");
      }}
      onMouseLeave={() => {
        setColor("gray");
      }}
      className="w-full  py-4 hover:border-[#EEA147] cursor-pointer border-2 border-gray-300 border-dashed border-collapse rounded-xl"
    >
      {image ? (
        <>
          <label
            htmlFor={randomId}
            className="h-full flex flex-col items-center w-full   justify-center"
          >
            {/* <button
              onClick={() => {
                setImage(null);
                setImageFile(null);
              }}
              className="    "
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 "
              >
                <path
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M2.93008 17.07C1.97498 16.1475 1.21316 15.044 0.689065 13.824C0.164975 12.604 -0.110887 11.2918 -0.122425 9.96397C-0.133963 8.63618 0.119054 7.31938 0.621863 6.09042C1.12467 4.86145 1.8672 3.74493 2.80613 2.80601C3.74506 1.86708 4.86158 1.12455 6.09054 0.62174C7.3195 0.118932 8.6363 -0.134085 9.96409 -0.122547C11.2919 -0.111009 12.6041 0.164853 13.8241 0.688943C15.0442 1.21303 16.1476 1.97486 17.0701 2.92996C18.8917 4.81598 19.8996 7.342 19.8768 9.96397C19.854 12.5859 18.8023 15.0941 16.9483 16.9481C15.0942 18.8022 12.5861 19.8539 9.96409 19.8767C7.34212 19.8995 4.8161 18.8915 2.93008 17.07ZM11.4001 9.99996L14.2301 7.16996L12.8201 5.75996L10.0001 8.58996L7.17008 5.75996L5.76008 7.16996L8.59008 9.99996L5.76008 12.83L7.17008 14.24L10.0001 11.41L12.8301 14.24L14.2401 12.83L11.4101 9.99996H11.4001Z"
                  fill="gray"
                />
              </svg>
            </button> */}

            {/* <ImageDisplay
                path={path as string}
                imgStyle="object-cover border aspect-square w-3/6 rounded-2xl"
                defaultPath=""
              /> */}

            <Image
              src={URL.createObjectURL(image)}
              alt="Preview"
              width={300}
              height={300}
              className="object-cover border aspect-square w-3/6 rounded-2xl "
            />
          </label>
        </>
      ) : !isError ? (
        <>
          <label
            htmlFor={randomId}
            className="h-full flex  items-center w-full   justify-center"
          >
            <ImageDisplay
              path={path as string}
              setError={setIsError}
              imgStyle="object-cover border bg-black aspect-square w-3/6 rounded-2xl"
              defaultPath=""
            />
          </label>
        </>
      ) : (
        <label htmlFor={randomId} className="flex justify-center h-full">
          <div className="flex-col flex items-center justify-center space-y-2 ">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14  hover:stroke-[#EEA147]"
            >
              <path
                d="M18.927 7.99C12.317 7.082 6.617 11.99 7 18.5M4.5 6C4.5 6.53043 4.71071 7.03914 5.08579 7.41421C5.46086 7.78929 5.96957 8 6.5 8C7.03043 8 7.53914 7.78929 7.91421 7.41421C8.28929 7.03914 8.5 6.53043 8.5 6C8.5 5.46957 8.28929 4.96086 7.91421 4.58579C7.53914 4.21071 7.03043 4 6.5 4C5.96957 4 5.46086 4.21071 5.08579 4.58579C4.71071 4.96086 4.5 5.46957 4.5 6Z"
                stroke={color}
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 11.066C3.78 10.681 6.275 12.024 7.624 14.166"
                stroke={color}
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 7.4C1 5.16 1 4.04 1.436 3.184C1.81949 2.43139 2.43139 1.81949 3.184 1.436C4.04 1 5.16 1 7.4 1H12.6C14.84 1 15.96 1 16.816 1.436C17.5686 1.81949 18.1805 2.43139 18.564 3.184C19 4.04 19 5.16 19 7.4V12.6C19 14.84 19 15.96 18.564 16.816C18.1805 17.5686 17.5686 18.1805 16.816 18.564C15.96 19 14.84 19 12.6 19H7.4C5.16 19 4.04 19 3.184 18.564C2.43139 18.1805 1.81949 17.5686 1.436 16.816C1 15.96 1 14.84 1 12.6V7.4Z"
                stroke={color}
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p
              className={`text-sm  ${
                color === "gray"
                  ? "text-gray-400 "
                  : color === "#EEA147"
                  ? "text-[#EEA147]"
                  : ""
              } `}
            >
              {`Unggah Gambar dengan ukuran maksimal ${maxSize} KB`}
            </p>
          </div>
        </label>
      )}

      <input
        id={randomId}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      ></input>

      {/* <img src={} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} /> */}
    </div>
  );
};

export default ImageUpload;
