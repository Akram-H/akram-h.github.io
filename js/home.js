auth.onAuthStateChanged(user => {
    document.querySelector('#bruh').innerHTML = user.email
})


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