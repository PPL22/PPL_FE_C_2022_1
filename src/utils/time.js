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
  //   convert dd + ' ' + month + ' ' + yyyy;
  const dd = date.getDate();
  let mm = date.getMonth();
  if (mm < 10) {
    mm = "0" + mm;
  }
  const yyyy = date.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
};

export const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear();
};
