import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Select, Input, Banner, Button } from "../CommonStyles";
import {
  createUserDetails,
  updateUserDetails,
} from "../../api/ManageUsers/userDetails";
import { toast } from "react-toastify";

// Styled components
const FormWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Field = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: #008cba;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005f6a;
  }
`;

const initialState = {
  user_name: "",
  password: "",
  role: "",
};

const validatePassword = (password) => {
  const pattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return pattern.test(password);
};

const AddUsersForm = ({ initialValues, onSubmit }) => {
  const [formState, setFormState] = useState(initialValues || initialState);

  useEffect(() => {
    if (initialValues) {
      setFormState(initialValues);
    }
  }, [initialValues]);

  const handleInputChange = (e) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [e.target.name]: e.target.value,
    }));
    console.log(formState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (initialValues) {
        const payload = {
          id: formState.id,
          user_name: formState.user_name,
          role: formState.role,
        };
        await updateUserDetails(payload);
        onSubmit(payload);
      } else {
        const validPassword = validatePassword(formState.password);
        if (!validPassword) {
          toast.error(
            "Password must be at least 8 characters long, contain at least one number, one uppercase letter, one lowercase letter, and one special character."
          );
        } else {
          await createUserDetails(formState);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const resetForm = () => {
    setFormState(initialState);
  };

  return (
    <div>
      <Banner>Add User Details</Banner>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <Field>
            <Label>User Name</Label>
            <Input
              required
              type="text"
              name="user_name"
              value={formState.user_name}
              onChange={handleInputChange}
            />
          </Field>
          {!initialValues && (
            <Field>
              <Label>Password</Label>
              <Input
                required
                type="password"
                name="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
                value={formState.password}
                onChange={handleInputChange}
              />
            </Field>
          )}
          <Field>
            <Label>Role</Label>
            <Select
              required
              name="role"
              onChange={handleInputChange}
              value={formState.role}
            >
              <option value="" disabled selected hidden>
                Select User Role
              </option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="subdlr">Sub Dealer</option>
            </Select>
          </Field>
          <SubmitButton type="submit">
            {initialValues ? "Submit" : "Update"}
          </SubmitButton>
        </form>
      </FormWrapper>
    </div>
  );
};

export default AddUsersForm;
