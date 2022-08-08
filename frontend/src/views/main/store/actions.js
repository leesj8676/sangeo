// API
import axios from 'axios'
import $axios from 'axios'

export function requestLogin ({ state }, payload) {
  console.log('requestLogin', state, payload)
  const url = '/auth/user/login'
  let body = payload
  return $axios.post(url, body)
}

export function requestUserInfo ({ state }, payload) {
  console.log('requestUserInfo', state, payload)
  const url = '/users/me'
  let body = payload
  axios.defaults.headers["Authorization"] = "Bearer "+sessionStorage.getItem("Authorization")
  console.log(axios.defaults.headers["Authorization"]);
  return $axios.get(url, body)
}
