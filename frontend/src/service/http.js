
const fixed_url = 'https://hypechatgrupo2-app-server-stag.herokuapp.com/'
const OK = 200

class Http {
  async get (url, callback) {
    const rawResponse = await fetch(fixed_url + url, {
      method: 'GET',
      headers: this.getHeaders()
    })
    //this.checkIfUnauthorized(rawResponse.status, callback)
    const content = await rawResponse.json()
    return {
      content,
      status: rawResponse.status
    }
  }

  async delete (url, payload, callback) {
    const rawResponse = await fetch(fixed_url + url, {
      method: 'DELETE',
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

  post (url, payload, callback) {
    fetch(fixed_url + url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    })
    .then(response => {return response.json()})
    .catch(error => document.write(error))
    //this.checkIfUnauthorized(rawResponse.status, callback)
    // return {
    //   content,
    //   status: rawResponse.status
    // }
    


    //this.checkIfUnauthorized(rawResponse.status, callback)
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

  // checkIfUnauthorized (status, callback) {
  //   if (status === httpStatus.UNAUTHORIZED) {
  //     Auth.logout(callback)
  //   }
  // }

  getHeaders () {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    // if (Auth.isLogged()) {
    //   headers['Authorization'] = 'Bearer ' + Auth.getToken()
    // }
    return headers
  }
}
const instance = new Http()
export default instance