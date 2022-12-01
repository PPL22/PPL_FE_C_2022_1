import Khs from "./Khs";
import Irs from "./Irs";
import Pkl from "./Pkl";
import Skripsi from "./Skripsi";

function EntryDataMhs({
  setModal,
  refreshData,
  entryState,
  setEntryState,
  currentSemester,
  currentData,
}) {
  function closeModal(isRefresh) {
    setModal(false);
    setEntryState("none");
    if (isRefresh) {
      refreshData();
    }
  }
  if (entryState === "irs") {
    return (
      <Irs
        currentSemester={currentSemester}
        closeModal={closeModal}
        currentData={currentData}
      />
    );
  } else if (entryState === "khs") {
    return (
      <Khs
        currentSemester={currentSemester}
        closeModal={closeModal}
        currentData={currentData}
      />
    );
  } else if (entryState === "skripsi") {
    return (
      <Skripsi
        currentSemester={currentSemester}
        closeModal={closeModal}
        currentData={currentData}
      />
    );
  } else if (entryState === "pkl") {
    return (
      <Pkl
        currentSemester={currentSemester}
        closeModal={closeModal}
        currentData={currentData}
      />
    );
  }
}

export default EntryDataMhs;
