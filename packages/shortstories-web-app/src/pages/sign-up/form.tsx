import * as React from 'react'
import styled from 'styled-components'
import { graphql, compose } from 'react-apollo'
import { withState, withHandlers } from 'recompose'
import { Formik } from 'formik'
import { Button, Field } from 'components'
import history from '../../constants/history'
import * as routes from '../../constants/routes'
import * as validators from './validators'
import { SIGN_UP, CHECK_USER_EXIST } from '../../mutations/user'

interface IProps {
  refetch: () => void
  signUp: (obj: object) => any
  checkUserExist: (obj: object) => void
  loading?: boolean
  toggleLoader?: any
}

const AuthContainer = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 2px 10px;
  padding: 36px;
`

const StyledForm = styled.form`
  height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const INITIAL_VALUES = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
}

const Form = ({
  refetch,
  signUp,
  checkUserExist,
  loading,
  toggleLoader,
}: IProps) => (
  <Formik
    isInitialValid={false}
    initialValues={INITIAL_VALUES}
    onSubmit={values => {
      toggleLoader()
      signUp({ variables: { ...values } }).then(async () => {
        toggleLoader()
        await refetch()
        history.push(routes.STORIES)
      })
    }}
  >
    {({ handleSubmit, values }) => (
      <AuthContainer>
        <StyledForm onSubmit={handleSubmit}>
          <Field
            name="username"
            label="Username"
            validate={value => validators.username(value, checkUserExist)}
          />
          <Field
            name="email"
            type="email"
            label="Email"
            validate={value => validators.email(value, checkUserExist)}
          />
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
          <Button loading={loading} type="submit">
            Register
          </Button>
        </StyledForm>
      </AuthContainer>
    )}
  </Formik>
)

export default compose(
  graphql(SIGN_UP, { name: 'signUp' }),
  graphql(CHECK_USER_EXIST, { name: 'checkUserExist' }),
  withState('loading', 'toggleLoading', false),
  withHandlers({
    toggleLoader: (props: any) => () => {
      props.toggleLoading(!props.loading)
    },
  })
)(Form)
