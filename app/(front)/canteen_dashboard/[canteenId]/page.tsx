import CanteenBeranda from "@/components/canteen/canteen_home";

export default async function CanteenDashboard({
  params,
}: {
  params: { canteenId: string };
}) {
  return (
    <>
      <CanteenBeranda props={params.canteenId} />
    </>
  );
}
