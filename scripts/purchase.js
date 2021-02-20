var Product = null
var CurrentUser = null

auth.onAuthStateChanged(user => {
    CurrentUser = user
    if (user) {} else {
        window.location.href="/"
    }
})

const Setup = () => {
    Parameters = new URLSearchParams(window.location.search)
    Product = Parameters.get('product')

    document.querySelector('#title').innerHTML = Product
}

const GetDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today;
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


var ThumbnailUrl = null

const getSetupTiktokVideoData = (videoID) => {
    TiktokVideoData = null
    const Http = new XMLHttpRequest();
    const url=`https://www.tiktok.com/oembed?url=https://www.tiktok.com/video/${videoID}`
    Http.open("GET", url)
    Http.send()


    Http.onreadystatechange = (e) => {

            var response = JSON.parse(Http.responseText.toString())

            if (response.version == "1.0") {
                document.querySelector('.information').style.display = 'block'
                document.querySelector('#tiktok-title').innerHTML = `Title: ${response.title}`
                document.querySelector('#author_name').innerHTML = `Author Name: ${response.author_name} `
                document.querySelector('#thumbnail-img').src = response.thumbnail_url
                ThumbnailUrl = response.thumbnail_url
                tik
            }else{
                PopupOpen('Url invalid')
            }

    }
}



const CheckVideo = document.querySelector('#Check-Video')
CheckVideo.addEventListener('click', (e) => {
    e.preventDefault()
    
    getSetupTiktokVideoData(document.querySelector('#videourl').value)
})
const Buy = document.querySelector('#buy')
Buy.addEventListener('click', (e) => {
    e.preventDefault()



    if (document.querySelector('#videourl').value == "") {
        PopupOpen('Url field empty')
    } else {
        db.collection('User').doc(CurrentUser.uid).update({
            ['purchases.' + Math.round((new Date()).getTime()/1000)] : {
                product: Product,
                time: (new Date()).getTime() / 1000,
                date: GetDate(),
                url: document.querySelector('#videourl').value,
                thumbnail_url: ThumbnailUrl,
                status: {
                    status: "waiting",
                }
            }
        })
    }
})