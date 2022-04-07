// config

import { clone, copies } from 'bellajs'

const requestOptions = {
  headers: {
    accept: 'application/json; charset=utf-8'
  },
  responseType: 'json',
  responseEncoding: 'utf8',
  timeout: 6e4, // 1 minute
  maxRedirects: 3
}

export const getRequestOptions = () => {
  return clone(requestOptions)
}

export const setRequestOptions = (opts) => {
  copies(opts, requestOptions)
}
