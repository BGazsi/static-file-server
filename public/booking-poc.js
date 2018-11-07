document.querySelector('.trackAddToCartEventOnClick').addEventListener('click', function () {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
        console.log('success', arguments)
    })

    xhr.addEventListener('error', function () {
        console.log(arguments)
    })

    xhr.open("POST", 'http://convkit.local', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        console.log(arguments)
    }

    xhr.send("foo=bar&lorem=ipsum");
})
