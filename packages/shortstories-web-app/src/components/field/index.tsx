import * as React from 'react'
import { Field as FormikField } from 'formik'
import Input from '../input'

const error = (field: string, errors: any, touched: any) =>
  errors[field] && touched[field] && errors[field]

const Field = ({ name, label, type = 'text', validate }: any) => (
  <FormikField
    name={name}
    validate={validate}
    render={({ field, form }) => {
      return (
        <Input
          id={name}
          type={type}
          label={label}
          name={name}
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          error={error(name, form.errors, form.touched)}
        />
      )
    }}
  />
)

export default Field
