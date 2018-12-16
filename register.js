const creat = document.querySelector('#creatuser');
const form = document.querySelector('#register');
const successRegister = document.querySelector('.register-success');

creat.addEventListener('click', register);
axios({
    method: 'post',
    url: 'http://localhost/new/form.php?action=check',
}).then(data => check(data));

function check(x) {
    if (x.data.login == true) {
        window.location.href = "http://localhost/new/index.html";
    }
}

function register() {

    axios({
        method: 'post',
        url: 'http://localhost/new/form.php?action=register',
        data: new FormData(form),
    }).then(data => registerCheck(data.data));


    function registerCheck(data) {
        if (data.length > 0) {
            const error = document.querySelector('.error');
            error.innerHTML = '';
            error.style.display='block';
            console.log(data.length);
            for (let i = 0; i < data.length; i++) {
            const p = document.createElement('p');
            const error = document.querySelector('.error'); 
            error.appendChild(p);
            p.appendChild(document.createTextNode(data[i]));    
            }
        }else{
            successRegister.style.display = 'block';
        }

    }
}