var ConvkitCookie = {
  _getCookie: function (name) {
    return document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); return match ? match[1] : null;
  },
  _setCookie: function (name,value) {
    document.cookie = name + "=" + (value || "") + "; path=/";
  }
}

if (typeof Convkit !== 'object') {
  var Convkit = {}
  Convkit.init = function () {
    this.options = JSON.parse(JSON.stringify(__config__))
    this.configureUserAgent()
    this.attachEventListeners()
    this.show()
  }
  Convkit.attachEventListeners = function () {
    document.querySelectorAll('[data-atc-convkit-id]').forEach(function (element) {
      element.addEventListener('click', this.addToCart.bind(this))
    }.bind(this))
    document.querySelectorAll('[data-fav-convkit-id]').forEach(function (element) {
      element.addEventListener('click', this.favorites.bind(this))
    }.bind(this))
  }
  Convkit.addToCart = function (e) {
    var id = e.currentTarget.getAttribute('data-atc-convkit-id')
    this.sendEvent(this.options.urls.addToCart, id, 'atc')
  }
  Convkit.favorites = function (e) {
    var id = e.currentTarget.getAttribute('data-fav-convkit-id')
    this.sendEvent(this.options.urls.addToCart, id, 'fav')
  }
  Convkit.show = function () {
    var element = document.querySelector('[data-convkit-product-page]')
    if (!element) {
      return
    }
    this.sendEvent(this.options.urls.show, element.getAttribute('data-convkit-product-page'), 'show')
  }
  Convkit.purchase = function (e) {

  }
  Convkit.sendEvent = function (url, id, eventType) {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send('pid=' + id + '&e=' + eventType)
  }
  Convkit.configureUserAgent = function () {
    if (ConvkitCookie._getCookie('__convID')) {
      return
    }
    ConvkitCookie._setCookie('__convID', 'conv' + (Math.random() * 999999999))
  }

  Convkit.init()
}
