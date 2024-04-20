import { useEffect, useState } from "react";

const useSnap = () => {
  const [snap, setSnap] = useState(null);
  useEffect(() => {
    const myMidtransClientKey = process.env.NEXT_PUBLIC_MITRANS_CLIENT_KEY;
    const script = document.createElement("script");
    console.log(myMidtransClientKey);
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", myMidtransClientKey);
    script.onload = () => {
      setSnap(window.snap);
    };
    console.log('tes');
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapEmbed = (snap_token:any, embedId:any, action:any) => {
    if (snap) {
      snap.embed(snap_token, {
        embedId,
        onSuccess: function (result:any) {
          console.log("success", result);
          action.onSuccess(result);
        },
        onPending: function (result:any) {
          console.log("pending", result);
          action.onPending(result);
        },
        onClose: function () {
          action.onClose();
        },
      });
    }
  };
  return { snapEmbed };
};
export default useSnap;
