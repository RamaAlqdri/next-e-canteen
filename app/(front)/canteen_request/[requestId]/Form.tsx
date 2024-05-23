"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import canteenService from "@/lib/services/canteenService";
import { CanteenRequest } from "@/lib/models/RequestModel";

const Form = ({ requestId }: { requestId: string }) => {
  const router = useRouter();
  const [requestCanteen, setRequestCanteen] = useState<CanteenRequest | null>();
  const [isSubmit, setIsSubmit] = useState(false);

  function updateRequestCanteen(status: string) {
    canteenService.updateCanteenRequestStatus(requestId, status);
  }
  async function handleApprove() {
    setIsSubmit(true);
    try {
      const res = await fetch("/api/canteen/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: requestCanteen?.canteenName,
          location: requestCanteen?.canteenLocation,
          description: requestCanteen?.canteenDescription,
          email: requestCanteen?.user.email,
          phone: requestCanteen?.canteenPhone,
        }),
      });
      if (res.ok) {
        updateRequestCanteen("Diterima");
        setIsSubmit(false);
        return router.back();
      }
    } catch (error) {
      console.error("Gagal membuat kantin", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const request = await canteenService.getRequestCanteenData(requestId);
      setRequestCanteen(request);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!requestCanteen) return <></>;

  return (
    <div className="">
      <h1 className="card-title mt-8 mb-4">Detail Permintaan</h1>
      <div className="grid lg:grid-cols-5 gap-4 ">
        <div className="lg:col-span-3">
          <div className="bg-white py-6 space-y-4 px-8  rounded-2xl shadow-md  lg:col-span-3">
            <div className="flex flex-col space-y-1 ">
              <p className="text-md font-medium">Data Pengguna</p>
              <div className="flex space-x-2 text-sm font-light">
                <div className="">
                  <p>{`Email`}</p>
                  <p>{`Nama`}</p>
                </div>
                <div className="">
                  <p>: {requestCanteen.user.email}</p>
                  <p>: {requestCanteen.user.name}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-md font-medium">Data Kantin</p>
              <div className="flex space-x-2 text-sm font-light mt-2">
                <div className="text-md space-y-1">
                  <p>{`Nama Kantin`}</p>
                  <p>{`Telepon`}</p>
                  <p>{`Lokasi`}</p>
                  <p>{`Deskripsi`}</p>
                </div>
                <div className="font-light space-y-1 ">
                  <p>: {requestCanteen.canteenName}</p>
                  <p>: {requestCanteen.canteenPhone}</p>
                  <p>: {requestCanteen.canteenLocation}</p>
                  <p>: {requestCanteen.canteenDescription}</p>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center pt-4">
              {requestCanteen.status === "Permintaan" && (
                <button
                  onClick={handleApprove}
                  disabled={isSubmit}
                  className="btn-ePrimary px-4 py-2 rounded-xl"
                >
                  {isSubmit && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Terima Permintaan
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Form;
