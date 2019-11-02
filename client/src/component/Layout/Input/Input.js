/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import'./Input.css';

const input = props => {
  const { invalid, shouldValidate, elementType, elementConfig, touched, selectClickHandler, checkbox, value, changed, formColor, showColorList } = props;
  let inputElement = null;
  let inputClasses = "InputElement";
  if (invalid && shouldValidate && touched) {
    inputClasses = inputClasses + " Invalid";
  }
  switch (elementType) {
    case 'input':
      inputElement = (
        <input
          onChange={changed}
          className={inputClasses}
          {...elementConfig}
          value={value}
        />
      );
      break;

    case 'textarea':
      inputElement = (
        <textarea
          onChange={changed}
          className={inputClasses}
          {...elementConfig}
          value={value}
        />
      );
      break;

    case 'select':
      inputElement = (
        <select
          onChange={changed}
          className={inputClasses}
          value={value}
        >
          {elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    case 'checkbox':
      inputElement = (
        <React.Fragment>
          <div className="selectbox" onClick = {selectClickHandler}>
           <input
          onChange={changed}
          className={inputClasses}
          {...elementConfig}
          value={value}
        />
            <div className="overSelect">{formColor.map(i => (
              <label className = "colorSelectStyle">{i.colorName}</label>
            ))}</div>
          </div>
       <div className= {showColorList ? "checkboxs" : "hideCheckboxs"}>
            <label className = "closeColor" htmlFor="close" onClick = {selectClickHandler}>בחר</label>
            {elementConfig.options.map(option =>  (
              <label key={option.displayValue} htmlFor={option.value} className="optionName">{option.displayValue}
                <input
                  onChange={checkbox}
                  style={{ border: '2px solid ' + option.value }}
                  className="checksbox" type="checkbox"
                  key={option.value}
                  name={option.displayValue}
                  value={option.value} />
              </label>
            ))}
            </div> 
          </React.Fragment>
          )
        break;
      default:
        inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
        />
      );
      break;
  }

  return (
    <React.Fragment>   
      {inputElement}
      </React.Fragment>

  );
};

export default input;
