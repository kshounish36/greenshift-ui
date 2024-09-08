import { toast } from "react-toastify";
import api from "./api";

export const sendLeadDetails = async (payload) => {
  let url = "/leads";
  try {
    const response = await api.post(url, payload);
    const { message } = response.data;
    toast.success(message, { autoClose: false });
    return response.data;
  } catch (error) {
    console.error("Error submitting form data:", error);
    toast.error(
      `Error in submitting your query. Please try again or reachout to our phone directly.`
    );
  }
};

export const fetchLeads = async () => {
  let url = "/leads";
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching leads:", error);
    toast.error(
      `Error in fetching lead informations. Please try again or reachout to support.`
    );
  }
};
