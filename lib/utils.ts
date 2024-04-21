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
