// const signup = document.querySelector('.signup')
// signup.addEventListener('click', () => {
//     const email = document.querySelector('#email').value
//     const password = document.querySelector('#password').value
//     const username = document.querySelector('#username').value

//     auth.createUserWithEmailAndPassword(email, password).then((res) => {
//         db.collection('User').doc(res.user.uid).set({
//             username: username,
//         })
//     })
// })



const submit = document.querySelector('.submit')
submit.addEventListener('click', ()=>{
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const username = document.querySelector('#username').value

    const Error = document.querySelector('#error')

    if (email!="" && password!="" && username!="") {
        auth.createUserWithEmailAndPassword(email, password).then((res) => {
            db.collection('User').doc(res.user.uid).set({
                username: username,
            }).then(()=> {
                window.location.href = '/TestVersion';
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
    if (Error.innerHTML!="") {
        console.log(Error.innerHTML)
        Error.style.display = 'block';
    }
})