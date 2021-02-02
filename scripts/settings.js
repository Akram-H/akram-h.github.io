const hidden = document.querySelectorAll('.load');
var currentdata = {
    id: "",
    username: ""
}


auth.onAuthStateChanged(user => {
    if (user){
        setup(user)
    } else {
        window.location.href="/"
    }
})

const setup = (user) => {
    db.collection("User").where("email", "==", user.email).get().then(snapshot => {
        snapshot.forEach(doc => {
            currentdata.id = doc.id
            currentdata.username = doc.data().username

            document.getElementById("username").value = doc.data().username;
            document.getElementById("email").innerHTML = "Email: " + user.email;
            document.getElementById("joined").innerHTML = "Joined at: " + doc.data().joined;

            hidden.forEach(item => item.style.display = 'block');
        })
        
    })
}

const back = document.querySelector("#back");
back.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href="/"
})

const update = document.querySelector('#update');
update.addEventListener("click", (e)=>{
    e.preventDefault()

    if (currentdata.username != document.getElementById("username").value) {
        db.collection('User').doc(currentdata.id).update({
            username: document.getElementById("username").value
        })
    }
})