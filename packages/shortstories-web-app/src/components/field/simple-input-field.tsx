import * as React from 'react'
import styled from 'styled-components'
import { Field as FormikField } from 'formik'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  input {
    border: 1px solid #ccc;
    padding: 16px;
    font-family: var(--main-font);
    font-size: 18px;
    color: var(--black);
    background-color: #fff;
  }
`

const Error = styled.div`
  font-size: var(--description-font-size);
  font-family: var(--main-font);
  color: red;
`

const error = (field: string, errors: any, touched: any) =>
  errors[field] && touched[field] && errors[field]

const SimpleInputField = ({ name, type = 'text', validate, ...rest }: any) => (
  <FormikField
    name={name}
    validate={validate}
    render={({ field, form }) => (
      <Wrapper>
        <input
          autoFocus={rest.autoFocus}
          id={name}
          disabled={rest.disabled}
          name={name}
          placeholder={rest.placeholder}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
        <Error>{error(name, form.errors, form.touched)}</Error>
      </Wrapper>
    )}
  />
)

export default SimpleInputField
