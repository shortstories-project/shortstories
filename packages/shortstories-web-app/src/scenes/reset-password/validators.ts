export const password = value => {
  if (!value) throw 'Password is required.'
  else if (value.length < 6)
    throw 'The Password field must be at least 6 characters.'
}

export const confirmationPassword = (value, password) => {
  if (!value) throw 'Confirm password is required.'
  else if (value !== password)
    throw 'The confirm password confirmation does not match.'
}
