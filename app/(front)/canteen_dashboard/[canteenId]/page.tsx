import CanteenBeranda from "@/components/canteen/canteen_home";

export default async function CanteenDashboard({
  params,
}: {
  params: { canteenId: string };
}) {
  // const [product1, setProduct1] = useState(products[0]);

  // const [productList, setProductList] = useState(products);

  // console.log(canteen);
  // console.log(canteenId);
  // console.log(products);

  return (
    <>
      <CanteenBeranda props={params.canteenId} />
    </>
  );
}
