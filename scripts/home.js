var CurrentUser = null

auth.onAuthStateChanged(user => {
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


//const submit =document.querySelector('#submit')
//submit.addEventListener('click', (e) => {
//    e.preventDefault();
//    db.collection('User').doc(CurrentUser.uid).update({
//        events: {
//            firstN: parseInt(document.querySelector("#fn").value),
//            secondN: parseInt(document.querySelector("#sn").value), 
//            result: 0,
//            done: false
//        }
//    }).then(()=> {
//        document.querySelector('#results').innerHTML = 'Results: Waiting'
//        db.collection("User").doc(CurrentUser.uid).onSnapshot((doc) => {
//            if (doc.data().events.done) {
//                document.querySelector('#results').innerHTML = 'Results: ' + doc.data().events.result.toString()
//            }
//        });
//    })
//})


const SendRequest = (id, product, time) => {
    const address = "purchases." + id
    db.collection('User').doc(CurrentUser.uid).update({
        [address] : {
            product: product,
            time: time,
        }
    })
}

const buy1 = document.querySelector('#buy1')
.addEventListener('click', (e) => {
    SendRequest(Math.round((new Date()).getTime()/1000), "views", (new Date()).getTime() / 1000)
})
const buy2 = document.querySelector('#buy2')
buy2.addEventListener('click', (e) => {
    SendRequest(Math.round((new Date()).getTime()/1000), "commentlikes", (new Date()).getTime() / 1000)
})
const buy3 = document.querySelector('#buy3')
buy3.addEventListener('click', (e) => {
    SendRequest(Math.round((new Date()).getTime()/1000), "likes", (new Date()).getTime() / 1000)
})
const buy4 = document.querySelector('#buy4')
buy4.addEventListener('click', (e) => {
    SendRequest(Math.round((new Date()).getTime()/1000), "follower", (new Date()).getTime() / 1000)
})