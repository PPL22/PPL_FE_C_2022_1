import Khs from "./Khs";
import Irs from "./Irs";
import Pkl from "./Pkl";
import Skripsi from "./Skripsi";

function EntryDataMhs({
  modal,
  setModal,
  refreshData,
  entryState,
  setEntryState,
  currentSemester,
}) {
  function closeModal() {
    setModal(false);
    setEntryState("none");
    refreshData();
  }
  if (entryState === "irs") {
    return <Irs currentSemester={currentSemester} closeModal={closeModal} />;
  } else if (entryState === "khs") {
    return <Khs currentSemester={currentSemester} closeModal={closeModal} />;
  } else if (entryState === "skripsi") {
    return (
      <Skripsi currentSemester={currentSemester} closeModal={closeModal} />
    );
  } else if (entryState === "pkl") {
    return <Pkl currentSemester={currentSemester} closeModal={closeModal} />;
  }
}

export default EntryDataMhs;
