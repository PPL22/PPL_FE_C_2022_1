const months = [
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

export const convertTimestampToDDMonthYYYY = (timestamp) => {
  const date = new Date(timestamp);
  //   convert dd + ' ' + month + ' ' + yyyy;
  const dd = date.getDate();
  const mm = date.getMonth();
  const yyyy = date.getFullYear();
  return dd + " " + months[mm] + " " + yyyy;
};

export const convertTimestampToYYYYMMDD = (timestamp) => {
  const date = new Date(timestamp);
  return date.toISOString().split("T")[0];
};

export const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear();
};
