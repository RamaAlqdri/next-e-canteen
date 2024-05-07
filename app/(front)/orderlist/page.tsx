import ordersService from "@/lib/services/orderService";
import Detail from "./Detail";
export function generateMetadata() {
  return {
    title: `Daftar Pesanan `,
  };
}
export default async function OrderDetailsPage(
  
) {
  return (
    <Detail/>
  );
}
