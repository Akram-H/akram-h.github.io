auth.onAuthStateChanged(user => {
    if (user){
        console.log('logged in as', user.displayName)
    } else {
        console.log('Not logged in')
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