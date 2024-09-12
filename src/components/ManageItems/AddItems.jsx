import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CustomSelect from "../ManageItems/../CustomSelect"; // The CustomSelect component for the dropdown
import { Select, Input, Banner, Button } from "../CommonStyles";
import { useLocation } from "react-router-dom";

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

const NumberInput = styled.input`
  width: 70px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 10px;
`;

const AddButton = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const RemoveButton = styled.button`
  padding: 10px 15px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #e41f1f;
  }
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

const BosItemRow = styled.div`
  width: 100%;
  display: grid;
  //   grid-auto-flow: column;
  grid-template-columns: 3fr 1.5fr 0.5fr 0.5fr;
  justify-content: start;
  align-items: stretch;
  padding: 10px;
`;

const initialState = {
  noOfModules: "",
  dcCapacity: "",
  invCapacity: "",
  noOfPhase: "",
  roofTyp: "",
  solarModPrc: "",
  subdlrSolarModPrc: "",
  iAndCPrc: "",
  bosPrc: "",
  sysType: "",
  bosItems: [{ item_id: "", quantity: "" }],
};

const SolarItemInputForm = ({ initialValues, onSubmit }) => {
  const [formState, setFormState] = useState(initialValues || initialState);

  const { state } = useLocation();
  const editedData = state?.initialValues;

  useEffect(() => {
    if (editedData) {
      setFormState(editedData);
    }
  }, [initialValues]);

  const handleInputChange = (e) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [e.target.name]: e.target.value,
    }));
    console.log(formState);
  };

  const handleBosItemChange = (index, field, value) => {
    const bosItems = [...formState.bosItems];
    bosItems[index][field] = value;
    setFormState({ ...formState, bosItems });
  };

  const removeBosItemRow = (index) => {
    const bosItems = formState.bosItems.filter((_, i) => i !== index);
    setFormState({ ...formState, bosItems });
  };

  const addBosItemRow = () => {
    setFormState({
      ...formState,
      bosItems: [...formState.bosItems, { item_id: "", quantity: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bos_itm_qty = formState.bosItems.reduce((acc, item) => {
      if (item.item_id && item.quantity) {
        acc.push({ [item.item_id]: item.quantity });
      }
      return acc;
    }, []);

    const payload = {
      ...formState,
      bos_itm_qty,
    };

    try {
      const response = await fetch("http://your-api-url/gridtiedsys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
        alert("Form submission failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred during form submission.");
    }
  };

  const resetForm = () => {
    setFormState(initialState);
  };

  return (
    <div>
      <Banner>Solar Installation Items & Cost Details</Banner>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <Field>
            <Label>No of Modules</Label>
            <Input
              type="number"
              name="noOfModules"
              value={formState.noOfModules}
              onChange={handleInputChange}
            />
          </Field>
          <Field>
            <Label>DC Capacity</Label>
            <Input
              type="number"
              name="dcCapacity"
              value={formState.dcCapacity}
              onChange={handleInputChange}
            />
          </Field>
          <Label>Type of System:</Label>
          <Select
            required
            name="sysType"
            onChange={handleInputChange}
            //   value={systemType}
            //   onChange={(e) => setSystemType(e.target.value)}
          >
            <option value="" disabled selected hidden>
              Select Type of System
            </option>
            <option value="grid-tied">On Grid</option>
            <option value="off-grid">Off Grid</option>
            <option value="hybrid">Hybrid</option>
          </Select>
          <Label>Inverter Capacity</Label>
          <Input
            type="number"
            name="invCapacity"
            value={formState.invCapacity}
            onChange={handleInputChange}
          />
          <Label>No Of Phase</Label>
          <Input
            type="number"
            name="dc_capacity"
            //   value={formState.dc_capacity}
            //   onChange={handleInputChange}
          />
          <Label>Type of Roof:</Label>
          <Select
            required
            //   value={roofType}
            //   onChange={(e) => setRoofType(e.target.value)}
          >
            <option value="" disabled selected hidden>
              Select Type of Roof
            </option>
            <option value="rcc">RCC</option>
            <option value="sheet roof">Sheet Roof</option>
            <option value="w/o mms">Without MMS</option>
          </Select>
          <Label>Solar Module Price</Label>
          <Input
            type="number"
            name="dc_capacity"
            //   value={formState.dc_capacity}
            //   onChange={handleInputChange}
          />
          <Label>Sub Dealer Solar Module Price</Label>
          <Input
            type="number"
            name="dc_capacity"
            //   value={formState.dc_capacity}
            //   onChange={handleInputChange}
          />
          <Label>Installation Cost</Label>
          <Input
            type="number"
            name="dc_capacity"
            //   value={formState.dc_capacity}
            //   onChange={handleInputChange}
          />
          <Label>BOS Cost</Label>
          <Input
            type="number"
            name="dc_capacity"
            //   value={formState.dc_capacity}
            //   onChange={handleInputChange}
          />
          {/* Add the rest of your input fields similarly */}

          <Field>
            <Label>
              Select BOS Items and Qty. Required For This Configuration
            </Label>
            {formState.bosItems.map((item, index) => (
              <BosItemRow key={index}>
                <CustomSelect
                  // data={}
                  placeholder="Select BOS Item"
                  onChange={(selectedOption) =>
                    handleBosItemChange(index, "item_id", selectedOption.value)
                  }
                />
                <NumberInput
                  placeholder="Qty."
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleBosItemChange(index, "quantity", e.target.value)
                  }
                />
                <AddButton type="button" onClick={addBosItemRow}>
                  +
                </AddButton>
                {index === 0 && (
                  <RemoveButton
                    type="button"
                    onClick={() => removeBosItemRow(index)}
                    style={{ visibility: "hidden" }}
                  >
                    -
                  </RemoveButton>
                )}
                {index !== 0 && (
                  <RemoveButton
                    type="button"
                    onClick={() => removeBosItemRow(index)}
                  >
                    -
                  </RemoveButton>
                )}
              </BosItemRow>
            ))}
          </Field>

          <SubmitButton type="reset" onClick={resetForm}>
            Submit
          </SubmitButton>
        </form>
      </FormWrapper>
    </div>
  );
};

export default SolarItemInputForm;
