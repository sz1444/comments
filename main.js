const form = document.querySelector('#form');
const btn = document.querySelector('#send');
const btnLogout = document.querySelector('#logout');
const promise = new Promise((resolve, reject) => {
    resolve("Wszystko ok");
    reject("Nie jest ok");
});
btnLogout.addEventListener('click', logout);

axios({
    method: 'post',
    url: 'http://localhost/new/form.php?action=check'
}).then(data => href(data));

function logout() {
    axios({
        method: 'post',
        url: 'http://localhost/new/form.php?action=logout'
    }).then(data => href(data));
}

function href(x) {
    const nameUser = x.data.name;
    const emailUser = x.data.email;
    if (x.data.login == true) {
        load();

        const user = document.querySelector('.user');
        user.innerHTML = x.data.name;

        function load() {
            axios.get('http://localhost/new/form.php?action=get')
                .then(data => {
                    loadComments(data.data);
                });
            btn.addEventListener('click', addComments);
        }


        function loadComments(comments) {
            if (Array.isArray(comments)) {
                for (let i = 0; i < comments.length; i++) {
                    createEl(comments, i);
                }

            } else {
                createEl(comments);
            }
            loveIt();
        }

        function addComments() {
            axios({
                method: 'post',
                url: 'http://localhost/new/form.php?action=post',
                data: new FormData(form),
            }).then(data => liveComment(data.data));
        }

        function liveComment(x) {
            if (x == true) {

                var arrr = [{
                    'comment': document.querySelector('#contetns').value,
                    'date': 'Przed chwilą',
                    'email': emailUser,
                    'id': ' ',
                    'login': nameUser,
                    'rating': 0
            }];
                createEl(arrr, 0);
            }
        }

        function createEl(comments, x) {
            const ul = document.querySelector('.comments');
            const span = document.createElement('span');
            const header = document.createElement('h3');
            const li = document.createElement('li');
            const p = document.createElement('p');
            const div = document.createElement('div');
            ul.appendChild(li);
            li.appendChild(header);
            header.appendChild(document.createTextNode(comments[x].login));
            creatP('Dodano:' + comments[x].date, 'data');
            creatP(comments[x].comment);
            creatP(comments[x].email, 'contakt');
            li.appendChild(div);
            li.id = comments[x].id;
            div.classList.add('rating');
            div.addEventListener('click', addRating);
            div.appendChild(document.createTextNode(comments[x].rating));
            if (user.innerHTML == comments[x].login) {
                creatBtn('Usuń', 'delete');
                creatBtn('Edytuj', 'edit');
            }




            function creatP(x, y) {
                const p = document.createElement('p');
                li.appendChild(p);
                p.classList.add(y);
                p.appendChild(document.createTextNode(x));
            }

            function creatBtn(x, y, z) {
                const btn = document.createElement('button');
                li.appendChild(btn);
                btn.classList.add(y);
                btn.addEventListener('click', modifications);
                btn.appendChild(document.createTextNode(x));
            }
            document.querySelector('#contetns').value = '';
        }

        function modifications() {

            if (this.classList.value == 'delete') {
                const idComment = this.parentElement.id
                console.log(this.parentElement.id);
                axios({
                    method: 'post',
                    url: 'http://localhost/new/form.php?action=delete',
                    data: idComment
                }).then(data => {
                    deleteSuccesed(this, data.data);
                });
            } else {
                edit(this.parentElement, this);
                this.style.display = 'none';
            }
        }

        function edit(x, btnEdit) {
            const p = x.childNodes[2];
            const contentP = x.childNodes[2].innerHTML;
            x.childNodes[2].innerHTML = " ";
            const area = document.createElement('textarea');
            x.childNodes[2].innerHTML = " ";
            p.appendChild(area);
            area.appendChild(document.createTextNode(contentP));
            modificationsBtn('noedit', 'Anuluj', noedit);
            modificationsBtn('edit', 'Zatwierdź', editOk);


            function modificationsBtn(x, y, z) {
                const btn = document.createElement('button');
                p.appendChild(btn);
                btn.classList.add(x);
                btn.addEventListener('click', z);
                btn.appendChild(document.createTextNode(y));
            }

            function noedit() {
                this.parentElement.innerHTML = contentP;
                btnEdit.style.display = 'inline-block';
            }

            function editOk() {
                const contentArea = this.parentElement.firstChild.nextElementSibling.value;
                const x = this.parentElement.parentElement.id;
                const y = this.parentElement.firstChild.nextElementSibling.value;

                axios({

                    method: 'post',
                    url: 'http://localhost/new/form.php?action=edit',
                    data: 'id=' + x + '&content=' + y + '',

                    headers: {

                        'Content-type': 'application/x-www-form-urlencoded'
                    }

                }).then(data => addSuccess(data.data));

                function addSuccess(x) {

                    if (x == true) {
                        p.innerHTML = contentArea;
                        btnEdit.style.display = 'inline-block';
                    }
                }
            }

        }


        function addRating() {

            axios({
                method: 'post',
                url: 'http://localhost/new/form.php?action=love',
                data: this.parentElement.id,

            }).then(data => liveLove(this));

            function liveLove(x) {
                if (x.classList.length == 1) {
                    x.classList.add('active');
                    x.innerHTML = parseInt(x.innerHTML) + 1;
                } else {
                    x.classList.remove('active');
                    x.innerHTML = parseInt(x.innerHTML) - 1;
                }
            }

        }

        function deleteSuccesed(z, data) {
            if (data == true) {
                z.parentElement.remove();
            }
        }


    } else {
        window.location.href = "http://localhost/new/logowanie.html";
    }


}

function loveIt() {
    axios({
        method: 'post',
        url: 'http://localhost/new/form.php?action=loadlove',
    }).then(data => activeLove(data.data));

    function activeLove(x) {
        if (x.length > 0) {
            for (let i = 0; i < x.length; i++) {
                document.querySelector(`#${CSS.escape(x[i])} .rating`).classList.add('active');
            }
        }
    }
}