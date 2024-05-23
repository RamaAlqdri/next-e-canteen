
import canteenService from "@/lib/services/canteenService";
import Detail from "./Detail";

export async function generateMetadata({
  params,
}: {
  params: { canteenId: string };
}) {
  const canteen = await canteenService.getCanteenData(params.canteenId);
  if (!canteen) {
    return { title: "Produk tidak ditemukan" };
  }
  return {
    title: canteen.name,
  };
}

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
