import api from "./api";
import { toast } from "react-toastify";

export const fetchSearchResults = async (payload) => {
  let url = "/grid-tied/search";
  try {
    const response = await api.post(url, payload);
    if (response.data.length === 0) {
      toast.warn(
        "No result found for this system configuration. Please provide correct search parameters."
      );
    }
    return response.data;
  } catch (e) {
    if (e.response.data.error === "Access denied") {
      toast.error(
        `Error fetching BOS Items for this search. ${e.response.data.error}`
      );
    } else {
      toast.error(
        "Error fetching BOS Items for this search. Please provide correct system configuration."
      );
    }
    console.error("Error fetching data:", e);
    return [];
  }
};

export const fetchUpdatedSearchResults = async (payload) => {
  let url = "/grid-tied/update";
  try {
    const response = await api.post(url, payload);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const fetchSysCapacities = async (payload) => {
  let url = "/grid-tied/getsyscapacity";
  try {
    const response = await api.post(url, payload);
    return response.data;
  } catch (error) {
    console.error("Error fetching system capacities:", error);
    return [];
  }
};
