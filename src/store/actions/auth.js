import axios from 'axios'
import {AUTH_SUCCES, AUTH_LOGOUT} from './actionTypes'

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCn2NM9nJXRH9UY-RWz7VAPI1QUAFm9Ru4'

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCn2NM9nJXRH9UY-RWz7VAPI1QUAFm9Ru4'
    }

    const respons = await axios.post(url, authData)
    const data = respons.data
    const expirationDate = new Date(new Date().getTime() + 360000)

    localStorage.setItem('token', data.idToken)
    localStorage.setItem('userId', data.localId)
    localStorage.setItem('expirationDate', expirationDate)

    dispatch(authSucces(data.idToken))
    dispatch(autoLogout(360000))
  }
}
export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time)
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}


export function authSucces(token) {
  return {
    type: AUTH_SUCCES,
    token
  }
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSucces(token))
        dispatch(autoLogout(360000))
      }
    }
  }
}