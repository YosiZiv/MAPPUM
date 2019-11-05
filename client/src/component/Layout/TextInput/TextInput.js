import React from 'react';
import './TextInput.css';
const textInput = props => {
  const {
    id,
    type,
    name,
    required,
    defaultValue,
    disabled,
    error,
    showTitle,
    className,
    validation,
    inputChange,

    isValid,
  } = props;
  const isValidClass = !isValid ? ' invalid' : '';
  const handleKeyDown = event => {
    // Preventing from invalid characters to be inserted in the number input.
    if (type === 'number' && ['-', '+', 'e'].includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleChange = event => {
    event.preventDefault();
    const { value } = event.currentTarget;
    const formattedValue = type === 'number' ? Number(value) : value;
    inputChange({ id, value: formattedValue, validation });
  };

  return (
    <div className="text-input-container">
      {showTitle && (
        <h6>
          <strong>
            {name} {required && <span className="text-danger">*</span>}
          </strong>
        </h6>
      )}
      <input
        id={id}
        type={type}
        value={defaultValue}
        disabled={disabled}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={`Enter ${name}`}
        autoComplete="off"
        className={className + isValidClass}
      />
      <div className="text-input-error-message">
        {error && <small className="text-danger">{error}</small>}
      </div>
    </div>
  );
};

textInput.defaultProps = {
  type: 'text',
  error: null,
  required: false,
  disabled: false,
  showTitle: true,
  className: '',
  defaultValue: '',
};

export default textInput;
