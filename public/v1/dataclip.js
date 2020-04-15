const myform = document.querySelector('.dataclip-form');

const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.responseType = 'json';

        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.onload = () => {

            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.onerror = () => {
            reject('Something went wrong!');
        };

        xhr.send(JSON.stringify(data));
    });
    return promise;
};

myform.addEventListener("submit", (e) => {
    e.preventDefault();


    var elements = document.querySelector(".dataclip-form").elements;
    var obj = {};
    for (var i = 0; i < elements.length - 1; i++) {
        var item = elements.item(i);
        if (item.type === 'checkbox') {
            obj[item.name] = item.checked
        } else if (item.type === 'radio' && item.checked === true) {
            obj[item.name] = item.value;
        } else if (item.type !== 'radio') {
            obj[item.name] = item.value;
        }

    }


    var url = document.querySelector(".dataclip-form").action;
    sendHttpRequest('POST', url, obj)
        .then(responseData => {
            console.log(responseData);

            document.querySelector(".dataclip-form").reset();
            var para = document.createElement("p");
            para.setAttribute("id", "thank-you");
            para.setAttribute("class", "dataclip-form__success__message");
            var node = document.createTextNode("Thank you.");
            para.appendChild(node);
            var element = document.querySelector(".dataclip-form");
            element.appendChild(para);

            setTimeout(function () {
                document.getElementById("thank-you").style.display = "none";
            }, 5000); // 1000ms = 1 second
        })
        .catch(err => {
            console.log(err);
            window.alert('Something went wrong. Please try again!');
        });


});
