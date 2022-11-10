import React from "react";
import Select from "react-select";
function DropdownSearch({
  id,
  label,
  options,
  innerRef,
  onChange,
  onSelect,
  placeholder,
}) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #e2e8f0",
      borderRadius: "0.375rem",
      boxShadow: "none",
      backgroundColor: "#eff6ff",
      padding: "0.5rem",
      "&:hover": {
        borderColor: "#cbd5e0",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: "text-gray-900",
      backgroundColor: "#fff",
      "&:hover": {
        backgroundColor: "#ebf8ff",
      },
    }),
  };

  return (
    <div className="w-full h-24">
      <label htmlFor={id} className="text-sm font-medium text-gray-900">
        {label}
      </label>
      <Select
        options={options}
        ref={innerRef}
        styles={customStyles}
        onInputChange={onChange}
        maxMenuHeight={200}
        onChange={onSelect}
        placeholder={placeholder}
        noOptionsMessage={() => "Tidak ada data"}
      />
    </div>
  );
}

export default DropdownSearch;
