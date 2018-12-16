const log = document.querySelector('#login');
const getLogin = document.querySelector('#getLogin');
getLogin.addEventListener('click', login);


function login(){
    
axios({
        method: 'post',
        url: 'http://localhost/new/form.php?action=login',
        data: new FormData(log),
    }).then(data => open(data));
}

axios({
        method: 'post',
        url: 'http://localhost/new/form.php?action=check',
    }).then(data => check(data));

function check(x){
      if(x.data.login==true){
        window.location.href= "http://localhost/new/index.html";   
      }
}


function open(x){
    console.log(x.data.login);
    if(x.data.login==true){
        window.location.href= "http://localhost/new/index.html";   
    }else{
         document.querySelector('.error').style.display='block';
    }
}

