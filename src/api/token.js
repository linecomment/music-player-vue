export function getToken() {
    return localStorage.token || null
}

// export function setToken(token) {
//     return localStorage.token = token
// }
export function setToken(token) {
    localStorage.token = token
    return localStorage
  }

export function removeToken() {
    return localStorage.removeItem('token')
}