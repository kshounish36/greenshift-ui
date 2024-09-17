import { toast } from "react-toastify";
import api from "../api";

export const createSolarItemDetails = async (payload) => {
  let url = "/createitem";
  try {
    const response = await api.post(url, payload);
    const { message } = response.data;
    toast.success(message);
    return response.data;
  } catch (error) {
    console.error("Error submitting form data:", error);
    toast.error(
      `Error in creating solar item details. Please contact administrator.`
    );
  }
};

export const fetchSolarModuleDetails = async (sysType) => {
  let url = "";
  if (sysType === "grid-tied") {
    url = "/gridtied";
  } else if (sysType === "offGridSys") {
    url = "/offgrid";
  } else if (sysType === "hybridSys") {
    url = "/hybrid";
  }
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching solar module details:", error);
    toast.error(
      `Error in fetching solar module informations. Please try again or reachout to support.`
    );
  }
};

export const updateSolarItemDetails = async (payload) => {
  let url = "/updateitem";
  try {
    const response = await api.put(url, payload);
    const { message } = response.data;
    toast.success(message);
    return response.data;
  } catch (error) {
    console.error("Error submitting form data:", error);
    toast.error(
      `Error in updating solar item details. Please contact administrator.`
    );
  }
};
