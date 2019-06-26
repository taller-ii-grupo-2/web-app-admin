
const fixed_url = 'http://localhost:5000/' // 'https://hypechatgrupo2-app-server-stag.herokuapp.com/'
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

  async delete (url, payload, callback) {
    const rawResponse = await fetch(fixed_url + url, {
      method: 'DELETE',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    })
    const content = await rawResponse.json()
    return {
      content,
      status: rawResponse.status
    }
  }

  post (url, payload, callback) {
    let response = fetch(fixed_url + url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    })
    return response
  }

  async put (url, payload, callback) {
    const rawResponse = await fetch(fixed_url + url, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    })
    //this.checkIfUnauthorized(rawResponse.status, callback)
    const content = await rawResponse.json()
    return {
      content,
      status: rawResponse.status
    }
  }

  getHeaders () {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, POST, GET, PUT',
      'Access-Control-Allow-Headers': "Content-Type, Access-Control-Allow-Headers, Authorization, Accept"
    }
    if (sessionStorage.getItem('token')){
      headers.Authorization = 'Bearer ' + sessionStorage.getItem('token')
    }

    return headers
  }
}
const instance = new Http()
export default instance