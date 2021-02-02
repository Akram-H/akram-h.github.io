auth.onAuthStateChanged(user => {
    if (user){
        window.location.href="/"
    }
})


function validate(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
        return true
    } else {
        return false
    }
}


const submit = document.querySelector('.submit')
submit.addEventListener('click', (e) => {
    e.preventDefault()
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    if (validate(email)){
        auth.signInWithEmailAndPassword(email, password).then(()=>{
            window.location.href="/"
        })
    }else{
        console.log('Email not Valid')
    }
})