import React, { useState } from 'react';
import axios from 'axios';
import CountryInput from './countryInput';

const Input = () => {
    const [input, setInput] = useState({
        jobTitle: '',
        workYear: '',
        experienceLevel: '',
        employmentType: '',
        workingType: '',
        country: '',
        companySize: '',
        salaryCurrency: ''
    })
    const [predictedSalary,setPredictedSalary] = useState();
    const [title,setTitle] = useState('');

    const handleCountrySelect = (countryCode) => {
      setInput(prevInput => {
        return{...prevInput, country: countryCode};
      });
    };

    const handleChange = (event) => {
        const {name,value} = event.target;
        setInput(prevInput => {
          return{...prevInput, [name]: value};
        });
    }

    const handlePrediction =  async(event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/predict_salary/', input);
            if (response && response.data && response.data['prediction']) {
                const predictedSalaryValue = response.data['prediction'];
                const formattedSalary = parseFloat(predictedSalaryValue).toFixed(2);
                setTitle('Your Salary in USD');
                setPredictedSalary(formattedSalary); 
            }
        } catch (error) {
            console.error(error);
            alert("Failed!");
        }
    }

    const handleClear = (event) => {
        event.preventDefault()
        setInput({
            jobTitle: '',
            workYear: '',
            experienceLevel: '',
            employmentType: '',
            workingType: '',
            country: '',
            companySize: '',
            salaryCurrency: ''
        });
        setPredictedSalary();
        setTitle('');

    }
    
    return (
        <form className='input-form'>
            <div className='input-form-row'>
                <input onChange={handleChange} name='jobTitle' value={input.jobTitle} placeholder="Job Title" className="box"/>
                <select onChange={handleChange} name="companySize" value={input.companySize} className='box1'>
                    <option className='dropdownOption' value=''>Company Size</option>
                    <option value='S'>Small</option>
                    <option value='M'>Medium</option>
                    <option value="L">Large</option>
                </select>
            </div>
            <div className='input-form-row'>
                <select onChange={handleChange} name="workYear" value={input.workYear} className='box1'>
                    <option className='dropdownOption' value=''>Work Year</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                </select>
                <select onChange={handleChange} name="experienceLevel" value={input.experienceLevel} className='box1'>
                    <option className='dropdownOption' value=''>Experience Level</option>
                    <option value="EN">Entry Level</option>
                    <option value="MI">Mid Level</option>
                    <option value="SE">Senior Level</option>
                    <option value="EX">Executive Level</option>
                </select>
            </div>
            <div className='input-form-row'>
                <select onChange={handleChange} name="employmentType" value={input.employmentType} className='box1'>
                    <option className='dropdownOption' value=''>Employment Type</option>
                    <option value="FT">Full-time</option>
                    <option value="PT">Part-time</option>
                    <option value="CT">Contract</option>
                    <option value="FL">Freelance</option>
                </select>
                <select onChange={handleChange} name="workingType" value={input.workingType} className='box1'>
                    <option className='dropdownOption' value=''>Working Type</option>
                    <option value='0'>No Remote</option>
                    <option value='50'>Partially Remote</option>
                    <option value="100">Fully Remote</option>
                </select>
            </div>
            <div className='input-form-row'>
                <div className='country-input'>
                    <CountryInput onSelect={handleCountrySelect} />
                </div>
                <select onChange={handleChange} name="salaryCurrency" value={input.salaryCurrency} className='box1'>
                    <option className='dropdownOption' value=''>Salary Currency</option>
                    <option value='USD'>USD</option>
                    <option value='GBP'>GBP</option>
                    <option value='EUR'>EUR</option>
                    <option value='INR'>USD</option>
                    <option value='CAD'>GBP</option>
                    <option value='AUD'>EUR</option>
                    <option value='Other'>Other</option>
                </select>
            </div>
            <button onClick={handlePrediction} type="submit" className="btn">Predict</button>
            <p>{title}</p>
            <h1>{predictedSalary}</h1>
            <button onClick={handleClear} className="btn">Clear</button>
        </form>
    );
}

export default Input;
