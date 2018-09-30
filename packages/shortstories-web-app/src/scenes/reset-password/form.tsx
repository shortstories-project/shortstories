import * as React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { Formik } from 'formik'
import { Button, Field, ErrorMessage } from 'components'
import history from '../../constants/history'
import * as routes from '../../constants/routes'
import * as validators from './validators'
import { CHANGE_PASSWORD } from '../../mutations/user'

interface IProps {
  refetch: () => void
  match: {
    params: {
      token: string
    }
  }
}

const Container: any = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 2px 10px;
  padding: 36px;
`

const ResetPasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ResetPasswordButton = styled(Button)`
  margin-top: 16px;
`

const ButtonWithError = styled.div`
  height: 100%;
  margin: 12px 0;
  display: flex;
  flex-direction: column;
  > span {
    margin-top: 4px;
  }
`

const INITIAL_VALUES = {
  password: '',
  passwordConfirmation: '',
}

const Form = ({ match, refetch }: IProps) => (
  <Mutation mutation={CHANGE_PASSWORD}>
    {(changePassword, { error, loading }) => (
      <Formik
        isInitialValid={false}
        initialValues={INITIAL_VALUES}
        onSubmit={values => {
          changePassword({
            variables: {
              token: match.params.token,
              newPassword: values.password,
            },
          }).then(async () => {
            await refetch()
            history.push(routes.STORIES)
          })
        }}
      >
        {({ handleSubmit, errors, values }) => (
          <Container>
            <ResetPasswordForm onSubmit={handleSubmit}>
              <Field
                name="password"
                type="password"
                label="Password"
                validate={validators.password}
              />
              <Field
                name="passwordConfirmation"
                type="password"
                label="Password Confirm"
                validate={value =>
                  validators.confirmationPassword(value, values.password)
                }
              />
              <ButtonWithError>
                <ResetPasswordButton
                  disabled={Boolean(Object.keys(errors).length)}
                  loading={loading}
                  type="submit"
                >
                  Reset password
                </ResetPasswordButton>
                {error &&
                  error.graphQLErrors.map(err => (
                    <ErrorMessage error={err.message} />
                  ))}
              </ButtonWithError>
            </ResetPasswordForm>
          </Container>
        )}
      </Formik>
    )}
  </Mutation>
)

export default Form
