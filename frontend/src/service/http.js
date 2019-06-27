
const fixed_url = 'https://hypechatgrupo2-app-server-stag.herokuapp.com/'
export const OK = 200
export const UNAUTHORIZED = 401
export const BAD_REQUEST = 400

class Http {
  get (url, callback) {
    let response = fetch(fixed_url + url, {
      method: 'GET',
      headers: this.getHeaders()
    })
    return response
  }

  delete (url, payload, callback) {
    let response = fetch(fixed_url + url, {
      method: 'DELETE',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    })
    return response
  }

  post (url, payload, callback) {
    let response = fetch(fixed_url + url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    })
    return response
  }

  put (url, payload, callback) {
    let response = fetch(fixed_url + url, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    })
    return response
  }

  getHeaders () {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if (sessionStorage.getItem('token')){
      headers.Authorization = 'Bearer ' + sessionStorage.getItem('token')
    }
    return headers
  }
}
const instance = new Http()
export default instance