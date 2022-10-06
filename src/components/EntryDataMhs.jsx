import Khs from './Khs';
import Irs from './Irs';
import Pkl from './Pkl';
import Skripsi from './Skripsi';

function EntryDataMhs({ modal, setModal, entryState, setEntryState }) {
  function closeModal() {
    setModal(false);
    setEntryState('none');
    console.log(modal);
  }
  if (entryState === 'irs') {
    return <Irs closeModal={closeModal} />;
  } else if (entryState === 'khs') {
    return <Khs closeModal={closeModal} />;
  } else if (entryState === 'skripsi') {
    return <Skripsi closeModal={closeModal} />;
  } else if (entryState === 'pkl') {
    return <Pkl closeModal={closeModal} />;
  }
}

export default EntryDataMhs;
