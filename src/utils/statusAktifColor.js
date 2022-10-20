export const statusAktifColor = (status) => {
  switch (status) {
    case 'Aktif':
      return 'max-w-[100px] text-sm mx-auto rounded-xl bg-green-300 text-green-800 font-semibold';
    case 'Mangkir':
      return 'max-w-[100px] text-sm mx-auto rounded-xl bg-red-300 text-red-800';
    case 'Cuti':
      return 'max-w-[100px] text-sm mx-auto rounded-xl bg-yellow-300 text-yellow-800 font-semibold';
    case 'Dropout':
      return 'max-w-[100px] text-sm mx-auto rounded-xl bg-gray-300 text-gray-800 font-semibold';
    case 'Undur Diri':
      return 'max-w-[100px] text-sm mx-auto rounded-xl bg-purple-300 text-purple-800 font-semibold';
    case 'Lulus':
      return 'max-w-[100px] text-sm mx-auto rounded-xl bg-blue-300 text-blue-800 font-semibold';
    default:
      return 'max-w-[100px] text-sm mx-auto rounded-xl bg-neutral-800 text-neutral-200 font-semibold';
  }
};
