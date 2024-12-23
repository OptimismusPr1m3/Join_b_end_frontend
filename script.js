/**
 * Includes HTML content from external files into HTML elements marked with the 'w3-include-html' attribute.
 * The content is fetched from the specified files and replaces the inner HTML of target elements.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/**
 * Marks a specific section as the active section by adding a CSS class and deactivating other active sections.
 *
 * @param {string} activeSection - The ID of the section to mark as the active section.
 */
function markActiveSection(activeSection) {
    deactivateAllActiveSections();
    let section = document.getElementById(activeSection);
    section.classList.add('active-section');
}

/**
 * Deactivates all active sections by removing the 'active-section' CSS class from their HTML elements.
 */
function deactivateAllActiveSections() {
    document.getElementById('summary').classList.remove('active-section');
    document.getElementById('tasks').classList.remove('active-section');
    document.getElementById('board').classList.remove('active-section');
    document.getElementById('contactsSection').classList.remove('active-section');
    document.getElementById('policy').classList.remove('active-section');
    document.getElementById('lNotice').classList.remove('active-section')
}

/**
 * Loads the logged-in user data from local storage and fills the 'logInUser' variable.
 *
 * @param {string} loadedContentKey - The key used to retrieve the user data from local storage.
 */
function loadLocalStorageLoggedInUser2(loadedContentKey) {
    if (localStorage.getItem(loadedContentKey)) {
        let loadedContentAsString = localStorage.getItem(loadedContentKey);
        logInUser = JSON.parse(loadedContentAsString);
    }
}

async function loadLocalStorageLoggedInUser() {
    if (localStorage.getItem('currentUser')) {
        let loadedContentAsString = localStorage.getItem('currentUser');
        logInUser = JSON.parse(loadedContentAsString);
        console.log(logInUser)
    }
}

/**
 * Sets the user's initials in the header based on the logged-in user's data.
 *
 * @param {object} logInUser - The user data object containing the first and last names of the logged-in user.
 */
function setHeaderInitials(logInUser) {
    let userInitialsCont = document.getElementById('loggedUserInitials');
    if (logInUser) {
        let initials = logInUser.first_name.charAt(0) + logInUser.last_name.charAt(0);
        userInitialsCont.innerHTML = /*html*/`
        <div class="icon-styling">${initials}</div>
    `
    }else{
        userInitialsCont.innerHTML = /*html*/`
        <div class="icon-styling">G</div>`
    }
}

/**
 * Toggles the visibility of the options popup by adding or removing the 'invis' CSS class.
 */
function toggleOptions() {
    let options = document.getElementById('optionsPopup');
    options.classList.toggle('invis');
}

/**
 * Logs out the user, clears user data from local storage, and redirects to the login page.
 */
function logOut() {
    localStorage.setItem('token', '');
    localStorage.setItem('currentUser', '');
    window.location.href = 'index.html?msg=Logout_successfull'
}

/**
 * Navigates to the specified HTML section or page by changing the current window location.
 *
 * @param {string} hmtlSection - The URL or path to the HTML section or page to navigate to.
 */
function goToHTML(hmtlSection){
    window.location.href = hmtlSection;
}

function checkLoginState() {
    const token = localStorage.getItem('token');
    if (token == '') {
        goToHTML('index.html?msg=Please_Login!')
    }
}