import * as React from 'react'
import styled from 'styled-components'
import { Field as FormikField } from 'formik'
import TextareaAutosize from 'react-autosize-textarea'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  textarea {
    border: 1px solid #ccc;
    resize: none;
    padding: 16px;
    font-family: var(--main-font);
    font-size: 18px;
    color: var(--black);
    background-color: #fff;
    min-height: 400px;
  }
`

const Error = styled.div`
  font-size: var(--description-font-size);
  font-family: var(--main-font);
  color: red;
`

const error = (field: string, errors: any, touched: any) =>
  errors[field] && touched[field] && errors[field]

const TextareaField = ({ name, type = 'text', validate, ...rest }: any) => (
  <FormikField
    name={name}
    validate={validate}
    render={({ field, form }) => (
      <Wrapper>
        <TextareaAutosize
          id={name}
          disabled={rest.disabled}
          name={name}
          maxLength={rest.maxLength}
          minLength={rest.minLength}
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

export default TextareaField
