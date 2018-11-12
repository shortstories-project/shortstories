import React from 'react'
import { Field } from 'formik'
import PropTypes from 'prop-types'
import InputStyles from './styles/InputStyles'

const getError = (field, errors, touched) =>
  errors[field] && touched[field] && errors[field]

const Input = ({ label, type, name, validate }) => (
  <Field
    validate={validate}
    name={name}
    render={({ field, form }) => (
      <InputStyles isEmpty={field.value.length === 0}>
        <div className="input-container">
          <input
            id={name}
            name={name}
            type={type}
            autoComplete="off"
            aria-autocomplete="list"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
          <label htmlFor={name}>
            <span>{label}</span>
          </label>
          <svg
            width="300%"
            height="100%"
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
          >
            <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0" />
          </svg>
        </div>
        <span className="error-message">
          {getError(name, form.errors, form.touched)}
        </span>
      </InputStyles>
    )}
  />
)

Input.defaultProps = {
  type: 'text',
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  validate: PropTypes.func.isRequired,
}

export default Input
