import React from 'react'
import styled from 'styled-components'

import Input from '../Commons/Input'
import Button from '../Commons/Button'

const H1 = styled.h1`
  margin: 24px 0;
`

const Wrapper = styled.main`
  padding: 0 5%;
`

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
`

type Props = {
  users?: Array,
}

const Profile = ({ users }: Props) => {
  const hasUser = Boolean(users[0])
  const avatar = hasUser ? users[0].avatar : ''
  const name = hasUser ? users[0].name : ''
  return (
    <Wrapper>
      <H1>Profile</H1>
      <Input
        label="Name"
        value={name}
        type="text"
      />
      <AvatarWrapper>
        <Avatar src={avatar} alt="userpic" />
        <Button>Change</Button>
      </AvatarWrapper>
    </Wrapper>
  )
}

export default Profile
