document.querySelectorAll('[data-convkit-id]').forEach(function (element) {
  element.addEventListener('click', function () {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://convkit.local:8080', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('product-id=' + element.getAttribute('data-convkit-id') + '&eventType=addToCart');
  })
})

alert('loaded')
