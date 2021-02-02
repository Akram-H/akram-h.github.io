
function validate(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
        return true
    } else {
        return false
    }
}


const submit = document.querySelector('.submit');
submit.addEventListener('click', (e) => {
    e.preventDefault()

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const username = document.querySelector('#username').value;

    if (password.length>6){
        if (validate(email)){
            auth.createUserWithEmailAndPassword(email, password).then((res) => {
                var today = new Date();
                today = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
                db.collection('User').add({
                    email: email,
                    joined: today,
                    username: username
                }).then(() => {
                    window.location.href="/"
                })
            })
        } else {
            console.log('Email not valid')
        }
    } else {
        console.log('Password needs longer then 6')
    }
})

