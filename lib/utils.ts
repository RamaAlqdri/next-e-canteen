import { getSession } from "next-auth/react";

export const round2 = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;

export function convertDocToObj(doc: any) {
  doc._id = doc._id.toString();
  return doc;
}
export function formatRupiah(nominal: number): string {
  const rupiah = nominal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  return rupiah;
}
export const slugify = (text:any) => {
  return text.toLowerCase().replace(/\s+/g, '-');
};
// export const getUserSession = async () => {
//   const session = await getSession();
//   return session;
// }
export function capitalizeText(text: string): string {
  // Pisahkan kata berdasarkan tanda hubung
  const words = text.split('-');

  // Ubah setiap kata menjadi kapital
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

  // Gabungkan kembali kata-kata tersebut dengan spasi di antara
  const capitalizedText = capitalizedWords.join(' ');

  return capitalizedText;
}
