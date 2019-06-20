
const fixed_url = 'https://hypechatgrupo2-app-server-stag.herokuapp.com/'
export const OK = 200

class Http {
  get (url, callback) {
    let response = fetch(fixed_url + url, {
      method: 'GET',
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')}
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
      'Content-Type': 'application/json'
    }
    return headers
  }
}
const instance = new Http()
export default instance