const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')
const accountDetails = document.querySelector('.account-details');


const setupUI = (user) => {
    if (user) {
        //account info
        const html = `
            <div>Logged in as ${user.email}</div> 
        `;
        accountDetails.innerHTML = html;

        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        //hide account info
        accountDetails.innerHTML = '';
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}
//setup Guides
const setupGuides = (data) => {
    if (data) {
        let html = '';
        data.forEach(doc => {
            const guide = doc.data();
            const li = `
            <li>
                <div class="collapsible-header grey lighten-4">${guide.title}</div>
                <div class="collapsible-body white">${guide.content} (by: ${guide.by})</div>
            </li>
            `;
            html += li
        });
        guideList.innerHTML = html

    } else {
        guideList.innerHTML = '<h4 class="center-align">Bitch log in</h4>'
    } 
}




// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
});