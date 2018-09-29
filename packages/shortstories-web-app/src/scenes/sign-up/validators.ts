const checkUnique = (login, check) =>
  new Promise(resolve => resolve(check({ variables: { login } })))

export const username = (value, check) =>
  checkUnique(value, check).then(({ data }) => {
    if (!value) throw 'Username is required.'
    else if (value.length < 3)
      throw 'Username field must be at least 3 characters.'
    else if (value.length > 50) throw 'Username too long.'
    else if (data.checkUserExist) {
      throw 'Username is already taken.'
    }
  })

export const email = (value, check) =>
  checkUnique(value, check).then(({ data }) => {
    if (!value) throw 'Email is required.'
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
      throw 'Invalid email address.'
    else if (data.checkUserExist) {
      throw 'Email is already taken.'
    }
  })

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
