export default class LoginValidate {
  constructor (to, from, token) {
    this.from = from
    this.to = to
    this.token = token
    this.needToAuthorize = to.meta.requiresAuth
    this.isAnonymous = this.token === null
  }

  // eslint-disable-next-line class-methods-use-this
  getPageToGo (page) {
    return { name: page }
  }

  validateToken () {
    console.log(this.token)
    if (this.getAnonymousRoutes()) return true

    if (this.needToAuthorize && this.token) return true

    if (this.needToAuthorize && !this.token) return this.getPageToGo('login')

    return this.eraseToken()
  }

  getAnonymousRoutes () {
    const openRoutes = ['login', 'error']
    const search = openRoutes.filter(isOpen => this.to.name === isOpen)
    const routeEnabled = search.length > 0
    return routeEnabled
  }

  eraseToken () {
    localStorage.removeItem('TOKEN')
    this.getPageToGo(this.to.name)
  }
}
