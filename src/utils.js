export function validation(value, name) {
  switch (name) {
    case 'username':
      let re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (re.test(value)) {
        return {
          username: null,
        }
      } else {
        return {
          username: 'Invalid email',
        }
      }
    case 'password':
      if (value.length > 5) {
        return {
          password: null,
        }
      } else {
        return {
          password: 'Invalid password, might be > 5',
        }
      }
    default:
      break
  }
}
