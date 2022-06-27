import React from 'react';
import Select from 'react-select';
// import { FieldProps } from 'formik'


const SearchSelect = ({
    options,
    field,
    form,
    handleIdChange,
  }) => {

    return (
      <Select        
        options={options}
        name={field.name}
        value={options ? options.find(option => option.value === field.value) : ''}
        // onChange={(option: Option) => form.setFieldValue(field.name, option.value)}
        onChange={(option: Option) => {
          form.setFieldValue(field.name, option.value);
          handleIdChange({"field":field.name, "value":option.value});
          // console.log(option.value);
          }}
        onBlur={field.onBlur}
        className="form-input"
      />
    );
//   }
};

export default SearchSelect;
