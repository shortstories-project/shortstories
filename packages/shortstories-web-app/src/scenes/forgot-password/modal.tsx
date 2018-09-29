import * as React from 'react'
import styled from 'styled-components'
import { defaultProps } from 'recompose'
import * as ReactModal from 'react-modal'

interface IProps {
  email: string | boolean
}

const StyledModal = styled(ReactModal)`
  position: absolute;
  height: 160px;
  width: 470px;
  top: calc((100vh - 160px) / 2);
  left: calc((100vw - 470px) / 2);
  border: none;
  background: rgb(255, 255, 255);
  overflow: auto;
  border-radius: 8px;
  outline: none;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 2px 10px;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  & > h2 {
    font-family: var(--main-font);
    font-weight: bold;
  }
  & > p {
    font-family: var(--main-font);
    margin: 0;
    & > span {
      color: var(--purple);
      font-weight: bold;
    }
  }
`

const Modal = defaultProps<IProps>({
  email: '',
})(({ email }) => (
  <StyledModal
    overlayClassName="forgot-modal-overlay"
    isOpen={Boolean(email)}
    ariaHideApp={false}
  >
    <ModalContent>
      <h2>Email sent!</h2>
      <p>
        We sent a message to <span>{email}</span> so you can pick your new
        password.
      </p>
      {/* TODO: Resend forgot email (for v2) */}
      {/* <p>
        Not your email address? <span>Try again</span>.
      </p> */}
    </ModalContent>
  </StyledModal>
))

export default Modal
