import { useState } from 'react'
import Modal from './Modal'
import validation from '../utils'
import './Login.css'

function Login() {
  const [data, setData] = useState({ username: '', password: '' })
  const [resultData, setResultData] = useState(null)
  const [isModal, setIsModal] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [varification, setVarification] = useState({
    username: null,
    password: null,
  })

  function handleFromSubmit(event) {
    event.preventDefault()

    fetch('http://localhost:3000/ylab', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((result) => result.json())
      .then((result) => {
        setResultData({ ...resultData, message: result })
        setIsModal(true)
      })
      .catch((error) => {
        setResultData({ ...resultData, error })
        setIsModal(true)
      })
  }

  function handleInputChange(e, name) {
    setData({ ...data, [name]: e.target.value })

    const validData = validation(e.target.value, name)
    setVarification({ ...varification, [name]: validData[name] })

    Object.values(varification).filter((n) => n).length
      ? setIsValid(false)
      : setIsValid(true)
  }

  function handleCloseModal() {
    setIsModal(false)
  }

  return (
    <div className='login'>
      <h1>Please login</h1>
      <form onSubmit={handleFromSubmit}>
        <input
          type='email'
          value={data.username}
          onChange={(e) => handleInputChange(e, 'username')}
          placeholder='Enter email'
        />
        {varification.username ? (
          <span className='login_field-errors'>{varification.username}</span>
        ) : null}
        <input
          type='password'
          value={data.password}
          onChange={(e) => handleInputChange(e, 'password')}
          placeholder='Enter password'
        />
        {varification.password ? (
          <span className='login_field-errors'>{varification.password}</span>
        ) : null}
        <button
          type='submit'
          disabled={!isValid}
          className={!isValid ? 'login_btn-disabled' : ''}
        >
          Submit
        </button>
      </form>
      {!resultData ? null : (
        <Modal
          data={resultData}
          onClose={handleCloseModal}
          isVisible={isModal}
        />
      )}
    </div>
  )
}

export default Login
