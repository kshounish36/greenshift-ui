import api from "./api";
import { toast } from "react-toastify";

export const loginAPI = async (payload) => {
  let url = "/users/login";
  try {
    const response = await api.post(url, payload);
    const { message } = response.data;
    toast.success(message);
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(
      `Error in logging in. ${error.response.data.error}. Please try again.`
    );
  }
};
