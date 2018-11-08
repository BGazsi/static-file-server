if (typeof Convkit !== 'object') {
  var Convkit = {}
  Convkit.init = function () {
    this.options = JSON.parse('__config__')
    this.attachEventListeners()
  }
  Convkit.attachEventListeners = function () {
    document.querySelectorAll('[data-convkit-id]').forEach(function (element) {
      element.addEventListener('click', this.addToCart.bind(this, element))
    }.bind(this))
  }
  Convkit.addToCart = function () {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', this.options.urls.addToCart, true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send('product-id=' + element.getAttribute('data-convkit-id') + '&eventType=addToCart')
  }
}
document.querySelectorAll('[data-convkit-id]').forEach(function (element) {
  element.addEventListener('click',)
})
