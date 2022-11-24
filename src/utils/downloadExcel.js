import axios from "axios";
import secureLocalStorage from "react-secure-storage";

export const downloadExcel = async (path, filename) => {
  try {
    const token = secureLocalStorage.getItem("accessToken");
    const response = await axios.get(path, {
      headers: {
        "x-access-token": token,
      },
      responseType: "blob",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(response.data);
    link.download = filename + ".xlsx";
    link.click();
    window.URL.revokeObjectURL(link.href);
    if (response.data) {
      return "success";
    } else {
      return "error";
    }
  } catch (error) {
    return "error";
  }
};
