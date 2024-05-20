import { OrderDetail } from "./models/OrderModel";


function getDataTahun(
  orders: OrderDetail[],
  year: number
): { Bulan: string; Pendapatan: number }[] {
  // Inisialisasi array untuk menyimpan data per bulan
  const dataBulan: { Bulan: string; Pendapatan: number }[] = [];

  // Iterasi untuk setiap bulan dalam satu tahun
  for (let month = 0; month < 12; month++) {
    // Filter pesanan berdasarkan bulan dan tahun
    const ordersBulan = orders.filter(
      (order) =>
        new Date(order.createdAt).getFullYear() === year &&
        new Date(order.createdAt).getUTCMonth() === month
    );

    // Hitung total harga dari pesanan-pesanan pada bulan tersebut
    const totalHargaBulan = ordersBulan.reduce(
      (total, order) => total + order.itemsPrice,
      0
    );

    // Simpan data bulan dan total harga ke dalam array
    dataBulan.push({ Bulan: getMonthName(month), Pendapatan: totalHargaBulan });
  }

  return dataBulan;
}
function getDataHarian(
  orders: OrderDetail[],
  year: number,
  month: number,
  day: number
): { Jam: string; Pendapatan: number }[] {
  month = month - 1;
  // Inisialisasi array untuk menyimpan data per 2 jam
  const dataHarian: { Jam: string; Pendapatan: number }[] = [];

  // const date = "2024-01-31T14:34:33.949Z"
  // const date2 = new Date(date)
  // console.log(date2.getUTCDate())
  // console.log(date2.getUTCMonth())
  // console.log(date2.getUTCHours())

  // Filter pesanan berdasarkan tahun, bulan, dan hari
  const ordersHarian = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const orderYear = orderDate.getFullYear();
    const orderMonth = orderDate.getUTCMonth();
    // console.log(orderMonth);
    const orderDay = orderDate.getUTCDate();
    // console.log(orderDay);

    return orderYear === year && orderMonth === month && orderDay === day;
  });
//   console.log(ordersHarian);

  // Iterasi setiap 2 jam dari 00:00 hingga 22:00
  for (let hour = 0; hour < 24; hour += 1) {
    const startHour = hour.toString().padStart(2, "0");
    const ordersPerJam = ordersHarian.filter((order) => {
      const orderHour = new Date(order.createdAt).getUTCHours();
      return orderHour >= hour && orderHour < hour + 1;
    });

    // Hitung total pendapatan dari pesanan-pesanan pada interval waktu tersebut
    const totalPendapatanPerJam = ordersPerJam.reduce(
      (total, order) => total + order.itemsPrice,
      0
    );

    // Simpan data waktu dan total pendapatan ke dalam array
    dataHarian.push({ Jam: `${startHour}`, Pendapatan: totalPendapatanPerJam });
  }

  return dataHarian;
}
function getDataBulanan(
  orders: OrderDetail[],
  year: number,
  month: number
): { Minggu: string; Pendapatan: number }[] {
  month = month - 1;
  // Inisialisasi array untuk menyimpan data per minggu
  const dataBulanan: { Minggu: string; Pendapatan: number }[] = [];

//   orders.map((order) => {
//     console.log(new Date(order.createdAt).getMonth());
//   });
//   console.log(year);
//   console.log(month);

  // Filter pesanan berdasarkan tahun dan bulan
  const ordersBulanan = orders.filter(
    (order) =>
      new Date(order.createdAt).getFullYear() === year &&
      new Date(order.createdAt).getUTCMonth() === month
  );
//   console.log(ordersBulanan);

  // Iterasi setiap minggu dalam bulan
  let currentDate = new Date(year, month, 1);
  while (currentDate.getMonth() === month) {
    const startOfWeek = currentDate.getDate();
    const endOfWeek = Math.min(
      startOfWeek + 6,
      new Date(year, month + 1, 0).getDate()
    );

    const ordersPerMinggu = ordersBulanan.filter((order) => {
      const orderDate = new Date(order.createdAt).getDate();
      return orderDate >= startOfWeek && orderDate <= endOfWeek;
    });

    // Hitung total pendapatan dari pesanan-pesanan pada minggu tersebut
    const totalPendapatanPerMinggu = ordersPerMinggu.reduce(
      (total, order) => total + order.itemsPrice,
      0
    );

    // Simpan data minggu dan total pendapatan ke dalam array
    dataBulanan.push({
      Minggu: `${startOfWeek} - ${endOfWeek}`,
      Pendapatan: totalPendapatanPerMinggu,
    });

    // Pindah ke minggu berikutnya
    currentDate.setDate(currentDate.getDate() + 7);
  }

  return dataBulanan;
}

export function valueFormatter(quantity: number): string {
  return `${quantity} produk`;
}

function getMonthName(month: number): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ];
  return months[month];
}

function getDataMakananTahunan(
  orders: OrderDetail[],
  year: number
): { name: string; value: number }[] {
  // Inisialisasi objek untuk menyimpan jumlah makanan yang dibeli
  const dataMakanan: { [key: string]: number } = {};

  // Filter pesanan berdasarkan tahun
  const ordersTahun = orders.filter(
    (order) => new Date(order.createdAt).getFullYear() === year
  );

  // Iterasi setiap pesanan
  for (const order of ordersTahun) {
    // Iterasi setiap item dalam pesanan
    for (const item of order.items) {
      const { name, qty } = item;
      // Jika nama makanan sudah ada dalam objek dataMakanan, tambahkan jumlahnya
      if (dataMakanan[name]) {
        dataMakanan[name] += qty;
      } else {
        // Jika nama makanan belum ada dalam objek dataMakanan, inisialisasi jumlahnya
        dataMakanan[name] = qty;
      }
    }
  }

  // Konversi objek dataMakanan ke dalam array objek
  const result = Object.entries(dataMakanan).map(([name, value]) => ({
    name,
    value,
  }));

  return result;
}
function getDataMakananHarian(
  orders: OrderDetail[],
  year: number,
  month: number,
  day: number
): { name: string; value: number }[] {
  // Inisialisasi objek untuk menyimpan jumlah makanan yang dibeli
  month = month - 1;
  const dataMakanan: { [key: string]: number } = {};

  // Filter pesanan berdasarkan tahun, bulan, dan hari
  const ordersHarian = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return (
      orderDate.getFullYear() === year &&
      orderDate.getUTCMonth() === month &&
      orderDate.getUTCDate() === day
    );
  });

  // Iterasi setiap pesanan harian
  for (const order of ordersHarian) {
    // Iterasi setiap item dalam pesanan
    for (const item of order.items) {
      const { name, qty } = item;
      // Jika nama makanan sudah ada dalam objek dataMakanan, tambahkan jumlahnya
      if (dataMakanan[name]) {
        dataMakanan[name] += qty;
      } else {
        // Jika nama makanan belum ada dalam objek dataMakanan, inisialisasi jumlahnya
        dataMakanan[name] = qty;
      }
    }
  }

  // Konversi objek dataMakanan ke dalam array objek
  const result = Object.entries(dataMakanan).map(([name, value]) => ({
    name,
    value,
  }));

  return result;
}
function getDataMakananBulanan(
  orders: OrderDetail[],
  year: number,
  month: number
): { name: string; value: number }[] {
  // Inisialisasi objek untuk menyimpan jumlah makanan yang dibeli
  month = month - 1;
  const dataMakanan: { [key: string]: number } = {};

  // Filter pesanan berdasarkan tahun dan bulan
  const ordersBulanan = orders.filter(
    (order) =>
      new Date(order.createdAt).getFullYear() === year &&
      new Date(order.createdAt).getUTCMonth() === month
  );

  // Iterasi setiap pesanan bulanan
  for (const order of ordersBulanan) {
    // Iterasi setiap item dalam pesanan
    for (const item of order.items) {
      const { name, qty } = item;
      // Jika nama makanan sudah ada dalam objek dataMakanan, tambahkan jumlahnya
      if (dataMakanan[name]) {
        dataMakanan[name] += qty;
      } else {
        // Jika nama makanan belum ada dalam objek dataMakanan, inisialisasi jumlahnya
        dataMakanan[name] = qty;
      }
    }
  }

  // Konversi objek dataMakanan ke dalam array objek
  const result = Object.entries(dataMakanan).map(([name, value]) => ({
    name,
    value,
  }));

  return result;
}

export const dataFormatter = (number: number) =>
  `${new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number)}`;

export const dataFormatterSingkat = (number: number) => {
  // Format angka ke dalam mata uang Rupiah
  const formattedNumber = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);

  // Jika angka lebih besar atau sama dengan 1 triliun, tambahkan singkatan "tril"
  if (number >= 1e12) {
    const tril = number / 1e12;
    return `${tril % 1 === 0 ? tril : tril.toFixed(1)} tril`;
  }

  // Jika angka lebih besar atau sama dengan 1 milyar, tambahkan singkatan "mil"
  if (number >= 1e9) {
    const mil = number / 1e9;
    return `${mil % 1 === 0 ? mil : mil.toFixed(1)}mil`;
  }

  // Jika angka lebih besar atau sama dengan 1 juta, tambahkan singkatan "jt"
  if (number >= 1e6) {
    const jt = number / 1e6;
    return `${jt % 1 === 0 ? jt : jt.toFixed(1)}jt`;
  }

  // Jika angka lebih besar atau sama dengan 1 ribu, tambahkan singkatan "rb"
  if (number >= 1e3) {
    const rb = number / 1e3;
    return `${rb % 1 === 0 ? rb : rb.toFixed(1)}rb`;
  }

  // Kembalikan angka dalam format standar jika tidak melebihi 1 ribu
  return formattedNumber.replace(",00", "");
};

function getTotalPendapatanTahunan(orders: OrderDetail[], year: number): number {
  // Filter pesanan berdasarkan tahun
  const ordersTahun = orders.filter(
    (order) => new Date(order.createdAt).getFullYear() === year
  );

  // Hitung total pendapatan dari pesanan-pesanan dalam tahun tersebut
  const totalPendapatanTahunan = ordersTahun.reduce(
    (total, order) => total + order.itemsPrice,
    0
  );

  return totalPendapatanTahunan;
}
function getTotalPendapatanHarian(
  orders: OrderDetail[],
  year: number,
  month: number,
  day: number
): number {
  // Filter pesanan berdasarkan tahun, bulan, dan hari
  month = month - 1;

  const ordersHarian = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return (
      orderDate.getFullYear() === year &&
      orderDate.getUTCMonth() === month &&
      orderDate.getUTCDate() === day
    );
  });
//   console.log(ordersHarian.length);

  // Hitung total pendapatan dari pesanan-pesanan pada hari tersebut
  const totalPendapatanHarian = ordersHarian.reduce(
    (total, order) => total + order.itemsPrice,
    0
  );

  return totalPendapatanHarian;
}
function getTotalPendapatanBulanan(
  orders: OrderDetail[],
  year: number,
  month: number
): number {
  month = month - 1;
  // Filter pesanan berdasarkan tahun dan bulan
  const ordersBulanan = orders.filter(
    (order) =>
      new Date(order.createdAt).getFullYear() === year &&
      new Date(order.createdAt).getUTCMonth() === month
  );

  // Hitung total pendapatan dari pesanan-pesanan dalam bulan tersebut
  const totalPendapatanBulanan = ordersBulanan.reduce(
    (total, order) => total + order.itemsPrice,
    0
  );

  return totalPendapatanBulanan;
}

export function getStatisticCanteen(type: string, order: OrderDetail[], date:Date) {
  // const today = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Ingat bahwa bulan dimulai dari 0 (Januari) hingga 11 (Desember)
  const day = date.getDate();
  if (type === "tahunan") {
    const dataHasil = getDataTahun(order, year);
    const totalPendapatanHasil = getTotalPendapatanTahunan(order, year);
    const dataMakananHasil = getDataMakananTahunan(order, year);
    return { dataHasil, totalPendapatanHasil, dataMakananHasil };
  } else if (type === "harian") {
    const dataHasil = getDataHarian(order, year, month, day);
    const totalPendapatanHasil = getTotalPendapatanHarian(order, year, month, day);
    const dataMakananHasil = getDataMakananHarian(order, year, month, day);
    return { dataHasil, totalPendapatanHasil, dataMakananHasil };
  } else if (type === "bulanan") {
    const dataHasil = getDataBulanan(order, year, month);
    const totalPendapatanHasil = getTotalPendapatanBulanan(order, year, month);
    const dataMakananHasil = getDataMakananBulanan(order, year, month);
    return { dataHasil, totalPendapatanHasil, dataMakananHasil };
  } else {
    return { dataHasil: [], totalPendapatanHasil: 0, dataMakananHasil: [] };
  }
}
