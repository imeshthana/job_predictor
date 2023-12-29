import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const CountryInput = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data.map((country) => ({
          label: country.name.common,
          value: country.cca2,
        }));
        setOptions(countries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
    }, []);

    const handleInputChange = (newValue) => {
        setInputValue(newValue);
    };

    const handleSelectChange = (selectedOption) => {
        onSelect(selectedOption ? selectedOption.value : '');
    };

    const customStyles = {
        display: 'flex',
        control: (provided, state) => ({
          ...provided,
          display:'flex',
          margin: '0.75rem 0 0.75rem 1rem',
          background: 'white',
          color: '#51ada8',
          textTransform: 'none',
          fontSize: '1.25rem',
          textAlign: 'left',
          width: '25rem',
          borderRadius: '0.5rem',
          borderWidth: '1px',
          borderColor: state.isFocused ? 'black' : 'black',
          boxShadow: state.isFocused ? 'none' : 'none',
          '&:hover': null,
        }),
        menu: (provided, state) => ({
            ...provided,
            width: '25rem',
            background: '#023540',
            borderRadius: '0.5rem',
            color: '#5AC2BC'
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: '#51ada8', 
            textAlign: 'left', 
            padding: '5px',
            fontSize: '1.25rem',
          }),
          dropdownIndicator: (provided, state) => ({
            ...provided,
            color: '#5AC2BC', 
          }),
          indicatorSeparator: (provided, state) => ({
            ...provided,
            display: 'none', 
          }),
          option: (provided, state) => ({
            ...provided,
            textAlign: 'left',
          }),
      };

    return (
        <Select
        value={options.find((option) => option.value === inputValue)}
        options={options}
        onInputChange={handleInputChange}
        onChange={handleSelectChange}
        placeholder="Country"
        isClearable
        isSearchable
        styles={customStyles}
        />
    );
};

export default CountryInput;
