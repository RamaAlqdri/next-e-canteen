
import Form from "./Form";
import canteenService from "@/lib/services/canteenService";

export async function generateMetadata() {
  return {
    title: `Sunting Kantin`,
  };
}

export default async function EditCanteen({
  params,
}: {
  params: { canteenId: string };
}) {
  const canteen = await canteenService.getCanteenData(params.canteenId);
  return <Form canteen={canteen} />;
}
