auth.onAuthStateChanged(user => {
    text = document.querySelector('.lol')
    if (user){
        console.log('logged in as', user.displayName)
        text.style.display = 'block'
        db.collection("User").where("email", "==", user.email).get().then(snapshot => {
            snapshot.forEach(doc => {
                document.querySelector('#title').innerHTML = `Lol, ${doc.data().username} is kinda ugly`
            })
            
        })
        
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