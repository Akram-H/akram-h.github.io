// Update Logged in Status
var CurrentUser = ''


auth.onAuthStateChanged(user => {
    if (user) {
        console.log('User logged in: ', user.email);
        db.collection('guides').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
            setupUI(user);
        });
    } else {
        console.log('Not logged in');
        setupGuides(null);
        setupUI();
    }
    console.log(user)
    CurrentUser = user;
})

//SignUp
const signupForm = document.querySelector('#signup-form')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get User info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // Sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        const model = document.querySelector('#modal-signup');
        M.Modal.getInstance(model).close();
        signupForm.reset();
    })
})

//LogIn
const loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get Info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    //Log in the User
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        const model = document.querySelector('#modal-login');
        M.Modal.getInstance(model).close();
        loginForm.reset();
    })
})

//Logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {})
})


//Create new Guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('guides').add({
        title: createForm['title'].value,
        content: createForm['content'].value,
        by: CurrentUser.email
    }).then(() => {
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    })
    
})