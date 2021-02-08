var CurrentUser = null

auth.onAuthStateChanged(user => {
    if (user){
        db.collection("User").doc(user.uid.toString()).get().then(doc => {
            document.querySelector('#title').innerHTML = `Lol, ${doc.data().username} is kinda ugly`
        })
    }
    setupUI(user)
    CurrentUser = user
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

const submit =document.querySelector('#submit')
submit.addEventListener('click', (e) => {
    e.preventDefault();
    db.collection('User').doc(CurrentUser.uid).update({
        events: {
            firstN: parseInt(document.querySelector("#fn").value),
            secondN: parseInt(document.querySelector("#sn").value), 
            result: 0,
            done: false
        }
    }).then(()=> {
        document.querySelector('#results').innerHTML = 'Results: Waiting'
        db.collection("User").doc(CurrentUser.uid).onSnapshot((doc) => {
            if (doc.data().events.done) {
                document.querySelector('#results').innerHTML = 'Results: ' + doc.data().events.result.toString()
            }
        });
    })
})