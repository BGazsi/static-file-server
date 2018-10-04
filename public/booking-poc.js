document.querySelector('.trackAddToCartEventOnClick').addEventListener('click', function () {
    var oReq = new XMLHttpRequest();

    // oReq.addEventListener("progress", updateProgress);
    // oReq.addEventListener("load", transferComplete);
    // oReq.addEventListener("error", transferFailed);
    // oReq.addEventListener("abort", transferCanceled);


    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load error', function () {
        debugger
    })

    xhr.open("POST", 'http://example.com', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        debugger
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

        }
    }
    xhr.send("foo=bar&lorem=ipsum");
    // xhr.send(new Blob()); 
    // xhr.send(new Int8Array()); 
    // xhr.send(document);

})