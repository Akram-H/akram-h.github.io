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
                            <h4>Status: In Work</h4>
                            <h4>Date: 2/15/2021</h4>
                        </div>
                    </li>
                </ul>
                <div class="button">
                    <button id="buy1">Report</button>
                </div>
            </div>
        </div>
        `
        html += div
    }

    document.querySelector('.purchases').innerHTML = html
}