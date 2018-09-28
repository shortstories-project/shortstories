export const login = value => {
  if (!value) throw 'Login is required.'
}

export const password = value => {
  if (!value) throw 'Password is required.'
}
