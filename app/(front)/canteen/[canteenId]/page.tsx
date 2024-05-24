
import canteenService from "@/lib/services/canteenService";
import Detail from "./Detail";


export default async function Canteen({
  params,
}: {
  params: { canteenId: string };
}) {
  
  return (
    <>
      <Detail canteenId={params.canteenId}  />
    </>
  );
}
