auth.onAuthStateChanged(user => {
    if (user){
        window.location.href="/"
    }
})


const submit = document.querySelector('.submit')
submit.addEventListener('click', (e) => {
    e.preventDefault()
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const Error = document.querySelector('#Error')

    if (email!="" && password!="") {    
        auth.signInWithEmailAndPassword(email, password).then(()=>{
            window.location.href="/"
        }).catch(err => {
            if (err.code=="auth/invalid-email") {
                Error.innerHTML = "Invalid Email."
            } else if (err.code=="auth/wrong-password") {
                Error.innerHTML = "Wrong Password or Email."
            } else if (err.code=="auth/user-not-found") {
                Error.innerHTML = "There is no account associated with this email."
            }
        })
    } else {
        Error.innerHTML = "Please fill in all fields."
    }
})