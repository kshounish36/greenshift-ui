import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Select, Input, Banner, Button } from "../CommonStyles";
import {
  createBOSItemDetails,
  updateBOSItemDetails,
} from "../../api/ManageItems/bosItemsDetasils";

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
  item_nm: "",
  item_rate: "",
  item_uom: "",
};

const AddBOSItemsForm = ({ initialValues, onSubmit }) => {
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
        // Update mode
        await updateBOSItemDetails(formState);
        onSubmit(formState);
      } else {
        // Add new record
        await createBOSItemDetails(formState);
      }
    } catch (error) {
      console.error("Error submitting BOS item details form:", error);
    }
  };

  const resetForm = () => {
    setFormState(initialState);
  };

  return (
    <div>
      <Banner>Add BOS Items Details</Banner>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <Field>
            <Label>Item Name</Label>
            <Input
              required
              type="text"
              name="item_nm"
              value={formState.item_nm}
              onChange={handleInputChange}
            />
          </Field>
          <Field>
            <Label>Item Rate</Label>
            <Input
              required
              type="number"
              name="item_rate"
              value={formState.item_rate}
              onChange={handleInputChange}
            />
          </Field>
          <Field>
            <Label>Unit Of Measuremet</Label>
            <Input
              type="text"
              name="item_uom"
              value={formState.item_uom}
              onChange={handleInputChange}
            />
          </Field>
          <SubmitButton type="submit">
            {initialValues ? "Update" : "Add"}
          </SubmitButton>
        </form>
      </FormWrapper>
    </div>
  );
};

export default AddBOSItemsForm;
