export const convertDataAkademik = (semester) => {
  if (semester.length > 2) {
    if (semester.find((item) => item.type === 'skripsi' && item.available)) {
      return 'skripsi';
    } else if (semester.find((item) => item.type === 'pkl' && item.available)) {
      return 'pkl';
    }
  } else {
    if (semester[0].available || semester[1].available) {
      return 'irskhs';
    } else {
      return 'cuti';
    }
  }
};
