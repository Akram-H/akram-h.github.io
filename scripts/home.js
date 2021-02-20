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
    auth.signOut().then(() => {})
})

const GetDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today;
}


const SendRequest = (id, product, time) => {
    const address = "purchases." + id
    db.collection('User').doc(CurrentUser.uid).update({
        [address] : {
            product: product,
            time: time,
            date: GetDate(),
            status: {
                status: "waiting",
            }
        }
    })
}

const PopupOpen = (message) => {
    document.querySelector('.msg').innerHTML = message
    document.querySelector('.popup').style.display = 'block'
}
const PopupClose = () => {
    document.querySelector('.popup').style.display = 'none'
}



const closePopup = document.querySelector('#Close-Popup')
closePopup.addEventListener('click', (e) => {
    e.preventDefault()
    PopupClose()
})

const buy1 = document.querySelector('#buy1')
buy1.addEventListener('click', (e) => {
    if (CurrentUser) {
        window.location.href="p/purchase.html?product=Views"
        SendRequest(Math.round((new Date()).getTime()/1000), "Views", (new Date()).getTime() / 1000)
    } else {
        PopupOpen('You need to be logged in')
    }
})
const buy2 = document.querySelector('#buy2')
buy2.addEventListener('click', (e) => {
    if (CurrentUser) {
        window.location.href="p/purchase.html?product=Comments Hearts"
        SendRequest(Math.round((new Date()).getTime()/1000), "Comments Hearts", (new Date()).getTime() / 1000)
    } else {
        PopupOpen('You need to be logged in')
    }
})
const buy3 = document.querySelector('#buy3')
buy3.addEventListener('click', (e) => {
    if (CurrentUser) {
        window.location.href="p/purchase.html?product=Hearts"
        SendRequest(Math.round((new Date()).getTime()/1000), "Hearts", (new Date()).getTime() / 1000)
    } else {
        PopupOpen('You need to be logged in')
    }
})
const buy4 = document.querySelector('#buy4')
buy4.addEventListener('click', (e) => {
    if (CurrentUser) {
        window.location.href="p/purchase.html?product=Follower"
        SendRequest(Math.round((new Date()).getTime()/1000), "Follower", (new Date()).getTime() / 1000)
    } else {
        PopupOpen('You need to be logged in')
    }
})