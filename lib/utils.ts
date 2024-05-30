import { getSession } from "next-auth/react";
// import { CSVLink } from "react-csv";

export const orderDesc = [
  "Menunggu Konfirmasi Kantin",
  "Membayar Pesanan",
  "Memeriksa Pembayaran",
  "Menyiapkan Pesanan",
  "Pesanan Siap Diambil",
  "Pesanan Selesai",
  "Pesanan Selesai",
  "Pesanan Dibatalkan",
];

export function getOrderDescription(status: number) {
  return orderDesc[status];
}

export const round2 = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;

export function convertDocToObj(doc: any) {
  doc.id = doc.id.toString();
  return doc;
}
export function formatRupiah(nominal: number): string {
  const rupiah = nominal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  return rupiah;
}
export const slugify = (text: any) => {
  return text.toLowerCase().replace(/\s+/g, "-");
};
// export const getUserSession = async () => {
//   const session = await getSession();
//   return session;
// }
export function capitalizeText(text: string): string {
  // Pisahkan kata berdasarkan tanda hubung
  const words = text.split("-");

  // Ubah setiap kata menjadi kapital
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Gabungkan kembali kata-kata tersebut dengan spasi di antara
  const capitalizedText = capitalizedWords.join(" ");

  return capitalizedText;
}
export function ubahFormatTanggal(tanggalISO: string): string {
  const tanggal = new Date(tanggalISO);

  const bulan: string[] = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const tanggalString = tanggal.getDate().toString();
  const bulanString = bulan[tanggal.getMonth()];
  const tahunString = tanggal.getFullYear().toString();

  return `${tanggalString} ${bulanString} ${tahunString}`;
}
export function dapatkanWaktu(tanggalISO: string): string {
  const tanggal = new Date(tanggalISO);

  const jamString = padZero(tanggal.getUTCHours());
  const menitString = padZero(tanggal.getUTCMinutes());
  const detikString = padZero(tanggal.getUTCSeconds());

  return `${jamString}:${menitString}:${detikString}`;
}

function padZero(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}
export const getBase64ImageTes = (imgUrl: string, callback: (base64data: string, width: number, height: number) => void) => {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    callback(dataURL, img.width, img.height);
  };
  img.src = imgUrl;
};
