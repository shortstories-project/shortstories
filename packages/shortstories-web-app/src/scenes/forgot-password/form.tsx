import * as React from 'react'
import styled from 'styled-components'
import { graphql, compose } from 'react-apollo'
import { withState, withHandlers } from 'recompose'
import { Formik } from 'formik'
import { Button, Field } from 'components'
import Modal from './modal'
import history from '../../constants/history'
import * as validators from './validators'
import { FORGOT_PASSWORD, CHECK_USER_EXIST } from '../../mutations/user'

interface IMutation {
  variables: {
    login: string
  }
}

interface IProps {
  refetch: () => void
  forgotPassword: (vars: IMutation) => Promise<void>
  checkUserExist: (vars: IMutation) => Promise<void>
  loading?: boolean
  toggleLoader?: any
  mailSent?: boolean | undefined
  checkSending?: (state: boolean | undefined) => void
}

const Container: any = styled.div`
  display: ${(props: any) => (props.mailSent ? 'none' : 'block')};
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 2px 10px;
  padding: 36px;
`

const ForgotPasswordForm = styled.form`
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ForgotPasswordButton = styled(Button)`
  margin-top: 16px;
`

const BackButton = styled(Button)`
  margin-top: 16px;
`

const INITIAL_VALUES = {
  login: '',
}

const Form = ({
  forgotPassword,
  checkUserExist,
  loading,
  toggleLoader,
  mailSent,
  checkSending,
}: IProps) => (
  <Formik
    isInitialValid={false}
    initialValues={INITIAL_VALUES}
    onSubmit={values => {
      toggleLoader()
      forgotPassword({ variables: { ...values } })
        .then(async ({ data }: any) => {
          toggleLoader()
          checkSending(data.forgotPassword)
        })
        .catch(() => {
          toggleLoader()
          checkSending(false)
        })
    }}
  >
    {({ handleSubmit, errors }) => (
      <>
        <Container mailSent={mailSent}>
          <ForgotPasswordForm onSubmit={handleSubmit}>
            <Field
              name="login"
              label="Login"
              type="text"
              validate={value => validators.login(value, checkUserExist)}
            />
            <ForgotPasswordButton
              disabled={Boolean(Object.keys(errors).length)}
              loading={loading}
              type="submit"
            >
              Send a password reset email
            </ForgotPasswordButton>
            <BackButton type="button" onClick={history.goBack}>
              Back
            </BackButton>
          </ForgotPasswordForm>
        </Container>
        <Modal email={mailSent} />
      </>
    )}
  </Formik>
)

export default compose(
  graphql(FORGOT_PASSWORD, { name: 'forgotPassword' }),
  graphql(CHECK_USER_EXIST, { name: 'checkUserExist' }),
  withState('loading', 'toggleLoader', false),
  withState('mailSent', 'checkSending', false),
  withHandlers({
    toggleLoader: ({ toggleLoader, loading }: any) => () => {
      toggleLoader(!loading)
    },
    checkSending: ({ checkSending }: any) => (email?: string | boolean) => {
      checkSending(email)
    },
  })
)(Form)
