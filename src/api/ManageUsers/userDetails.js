import { toast } from "react-toastify";
import api from "../api";

export const createUserDetails = async (payload) => {
  let url = "/users/createuser";
  try {
    const response = await api.post(url, payload);
    const { message } = response.data;
    toast.success(message);
    return response.data;
  } catch (error) {
    console.error("Error submitting form data:", error);
    toast.error(`Error in creating user. Please try again.`);
  }
};

export const fetchUsersDetails = async () => {
  let url = "/users/getallusers";

  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching users details:", error);
    toast.error(
      `Error in fetching users informations. Please try again or reachout to support.`
    );
  }
};

export const updateUserDetails = async (payload) => {
  let url = "/users/updateuser";
  try {
    const response = await api.put(url, payload);
    const { message } = response.data;
    toast.success(message);
    return response.data;
  } catch (error) {
    console.error("Error submitting form data:", error);
    toast.error(
      `Error in updating user details. Please contact administrator.`
    );
  }
};

export const deleteUser = async (payload) => {
  let url = "/users/deleteuser";
  try {
    const response = await api.delete(url, { data: { id: payload } });
    const { message } = response.data;
    toast.success(message);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error(`Error in deleteing user. Please contact administrator.`);
  }
};
