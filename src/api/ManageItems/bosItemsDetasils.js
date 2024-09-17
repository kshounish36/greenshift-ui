import { toast } from "react-toastify";
import api from "../api";

export const createBOSItemDetails = async (payload) => {
  let url = "/createbositem";
  try {
    const response = await api.post(url, payload);
    const { message } = response.data;
    toast.success(message);
    return response.data;
  } catch (error) {
    console.error("Error submitting form data:", error);
    toast.error(
      `Error in creating BOS item details. Please contact administrator.`
    );
  }
};

export const fetchBosItemsDetails = async () => {
  let url = "/bositems";

  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching BOS items details:", error);
    toast.error(
      `Error in fetching BOS items informations. Please try again or reachout to support.`
    );
  }
};

export const updateBOSItemDetails = async (payload) => {
  let url = "/updatebositem";
  try {
    const response = await api.put(url, payload);
    const { message } = response.data;
    toast.success(message);
    return response.data;
  } catch (error) {
    console.error("Error submitting form data:", error);
    toast.error(
      `Error in updating BOS item details. Please contact administrator.`
    );
  }
};
