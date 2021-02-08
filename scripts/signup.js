

const submit = document.querySelector('.submit');
submit.addEventListener('click', (e) => {
    e.preventDefault()

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const username = document.querySelector('#username').value;

    const Error = document.querySelector('#Error')

    if (email!="" && password!="" && username!="") {
        auth.createUserWithEmailAndPassword(email, password).then((res) => {
            var today = new Date();
            today = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
    
            console.log(res.user)
            db.collection('User').doc(res.user.uid).set({
                email: email,
                joined: today,
                username: username,
                events: []
            }).then(()=>{
                window.location.href="/"
            })
        }).catch(err => {
            if (err.code=="auth/invalid-email") {
                Error.innerHTML = "Invalid Email."
            } else if (err.code=="auth/weak-password") {
                Error.innerHTML = "Your password must be longer than 6 characters."
            } else if (err.code=="auth/email-already-in-use") {
                Error.innerHTML = "Email already in use."
            }
        })   
    }else{
        Error.innerHTML = "Please fill in all fields."
    }
})

