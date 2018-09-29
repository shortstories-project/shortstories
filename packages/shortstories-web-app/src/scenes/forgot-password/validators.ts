interface IMutation {
  variables: {
    login: string
  }
}

const checkUnique = (
  login: string,
  check: (vars: IMutation) => Promise<void>
) => new Promise(resolve => resolve(check({ variables: { login } })))

export const login = (
  value: string,
  check: (vars: IMutation) => Promise<void>
) =>
  checkUnique(value, check).then(({ data }) => {
    if (!value) throw 'Login is required.'
    else if (value.length < 3)
      throw 'Login field must be at least 3 characters.'
    else if (!data.checkUserExist) {
      throw 'We couldn’t find an account.'
    }
  })
