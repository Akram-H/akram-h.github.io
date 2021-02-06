auth.onAuthStateChanged(user => {
    text = document.querySelector('.lol')
    if (user){
        db.collection("User").doc(user.uid.toString()).get().then(doc => {
            document.querySelector('#title').innerHTML = `Lol, ${doc.data().username} is kinda ugly`
        })
        text.style.display = 'block'
    } else {
        text.style.display = 'none'
    }
    setupUI(user)
})

const loggedInLinks = document.querySelectorAll('.logged-in')
const loggedOutLinks = document.querySelectorAll('.logged-out')


const setupUI = (user) => {
    if (user) {
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }else {
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}   

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {})
})