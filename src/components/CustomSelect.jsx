import React from "react";
import { createFilter } from "react-select";
import AsyncSelect from "react-select/async";
import { FixedSizeList as List } from "react-window";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "black",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "black", // Text color for the selected value
  }),
};

// Custom Menu List using react-window for virtualization
const MenuList = (props) => {
  const { options, children, getValue } = props;
  const height = 35; // item height
  const [value] = getValue();
  const initialOffset =
    options.findIndex((option) => option.value === value?.value) * height;

  return (
    <List
      height={
        options.length > 0 ? Math.min(300, options.length * height) : height
      } // maximum height of the list
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
      style={{ width: "100%" }}
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  );
};

const CustomSelect = ({
  component,
  data,
  defaultValue,
  onChange,
  placeholder,
}) => {
  const options = [{ value: null, label: null }];

  if (component === "pricedetails") {
    data &&
      data.map((option) => {
        options.push({
          value: option.id,
          label: option.name,
        });
      });
  } else if (component === "addsolaritems") {
    data &&
      data.map((option) => {
        options.push({
          value: option.item_id,
          label: option.item_nm,
        });
      });
  }

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(options);
    }, 1000);
  };

  return (
    <AsyncSelect
      placeholder={placeholder}
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      defaultValue={defaultValue}
      onChange={onChange}
      components={{ MenuList }}
      filterOption={createFilter({ ignoreAccents: false })}
      styles={customStyles}
    />
  );
};

export default CustomSelect;
