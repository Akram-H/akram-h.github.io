var CurrentUser = null

auth.onAuthStateChanged(user => {
    CurrentUser = user
    if (user) {
        db.collection('User').doc(CurrentUser.uid).get().then((doc) => {
            SetupUI(doc)
        })
    } else {
        window.location.href="/"
    }
})


const SetupUI = (doc) => {
    let html = ''


    for (var purchase in doc.data().purchases) {

        data = doc.data().purchases[purchase]

        const div = `
        <div class="product" id="product-1">
            <div class="content">
                <ul class="text">
                    <li><h1>${data.product}</h1></li>
                    <li>
                        <div class="info">
                            <h4>Status: ${data.status.status}</h4>
                            <h4>Date: ${data.date}</h4>
                        </div>
                    </li>
                </ul>
                <div class="thumbnail">
                    <img
                        id="thumbnail-img"
                        src="${data.thumbnail_url}"
                        alt=""
                    >
                </div>
            </div>
        </div>
        `
        html += div
    }

    document.querySelector('.purchases').innerHTML = html
}