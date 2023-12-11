 // Function to handle button clicks and toggle between functions
 /*document.getElementById('cloak').addEventListener('click', function () {
    // Check which function to call and then toggle
    if (this.getAttribute('data-current-function') === 'tabCloak') {
        disableTabCloak();
        this.setAttribute('data-current-function', 'disableTC');
    } else {
        tabCloak();
        this.setAttribute('data-current-function', 'tabCloak');
    }
});*/
function showLoginPopup() {
    document.getElementById("loginPopup").style.display = "block";
}

function closeLoginPopup() {
    const errorMessageDiv = document.getElementById("errorMessage");
    document.getElementById("loginPopup").style.display = "none";
    errorMessageDiv.style.display = "none";
}

function saveLogin() {
    const userpass = document.getElementById("loginPopup-input").value;
    const errorMessageDiv = document.getElementById("errorMessage");

    if (userpass.trim() === "") {
        errorMessageDiv.style.display = "block"; // Make the error message div visible
    } else {
        localStorage.setItem("wordpass", userpass);
        localStorage.setItem('login', 'enablelogin');
        closeLoginPopup(); // Close the popup after saving to localStorage
        location.href = '/';
    }
}

// login button check

 // Get the button elements
 var enableButton = document.getElementById('enabledLogin');
var disableButton = document.getElementById('disabledLogin');

// Get the value from localStorage
var loginButtonState = localStorage.getItem('login');

// Set the initial disabled states based on localStorage
if (loginButtonState === 'disablelogin' || loginButtonState === '' || loginButtonState === null) {
    disableButton.disabled = true;
    enableButton.disabled = false;
} else {
    disableButton.disabled = false;
    enableButton.disabled = true;
}


// FOR PARTICLES, DISABLING PARTICLES IS ENABLING. THE BUTTONS ARE OPPISITE.
var particlesEnabledButton = document.getElementById('enabledParticles');
var particlesDisabledButton = document.getElementById('disabledParticles');

// Get the value from localStorage
var particless = localStorage.getItem('particles');

// Set the initial disabled states based on localStorage
if (particless === 'disabled' || particless === '' || particless === null) {
    particlesDisabledButton.disabled = true;
    particlesEnabledButton.disabled = false;
} else {
    particlesDisabledButton = false;
    particlesEnabledButton.disabled = true;
}

// custom backgrund

function showBackgroundPopup() {
    document.getElementById("backgroundPopup").style.display = "block";
}

function closeBackgroundPopup() {
    const bgErrorMessageDiv = document.getElementById("bgErrorMessage");
    document.getElementById("backgroundPopup").style.display = "none";
    bgErrorMessageDiv.style.display = "none";
    
}

function saveBackground() {
    const backgroundUrl = document.getElementById("backgroundPopup-input").value;
    const bgErrorMessageDiv = document.getElementById("bgErrorMessage");
    localStorage.setItem('bgsUrl', backgroundUrl);
    if (backgroundUrl.trim() === "") {
        bgErrorMessageDiv.style.display = "block"; // Make the error message div visible
    } else {
        localStorage.setItem("bgUrl", backgroundUrl);
        localStorage.setItem('bgCheck', 'on');
        closeBackgroundPopup(); // Close the popup after saving to localStorage
        window.location.reload();
    }
}


function resetBackground() {
    localStorage.setItem("bgUrl", 'none');
    localStorage.setItem('bgCheck', 'off');
    window.location.reload();
}

/*function enableLeaveConfirmation() {
    localStorage.setItem('leaveConfirmation', 'enabled');
    window.location.reload();
}

function disableLeaveConfirmation() {
    localStorage.setItem('leaveConfirmation', 'disabled');
    window.location.reload();
}

// leaveconf button check
*/
var eBlank = document.getElementById('enableCloak');
var dBlank = document.getElementById('disableCloak');

// Get the value from localStorage
var blankState = localStorage.getItem('aboutBlank');

// Set the initial disabled states based on localStorage
if (blankState === 'disabled' || blankState === '' || blankState === null) {
    dBlank.disabled = true;
    eBlank.disabled = false;
} else {
    dBlank.disabled = false;
    eBlank.disabled = true;
}

function driveCloak() {
    localStorage.setItem('cloakedTitle', 'My Drive - Google Drive');
    localStorage.setItem('cloakedIcon', 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png');
    tabCloak();
}

function docsCloak() {
    localStorage.setItem('cloakedTitle', 'Google Docs');
    localStorage.setItem('cloakedIcon', '/assets/img/docs.ico');
    tabCloak();
}
function googleCloak() {
    localStorage.setItem('cloakedTitle', 'Google');
    localStorage.setItem('cloakedIcon', '/assets/img/google.ico');
    tabCloak();
}
function classroomCloak() {
    localStorage.setItem('cloakedTitle', 'Classes');
    localStorage.setItem('cloakedIcon', '/assets/img/classroom-icon.png');
    tabCloak();
}

function enableClickoffCloak() {
    localStorage.setItem('clickoffCloak', 'enabled');
    window.location.reload();
}

function disableClickoffCloak () {
    localStorage.setItem('clickoffCloak', 'disabled');
    window.location.reload();
}


// FOR PARTICLES, ENABLING IT WILL BE DISABLING IT. IT'S THE OPPOSITE.  
function enableParticles () {
    localStorage.setItem('particles', 'enabled')
    window.location.reload();
}

function disableParticles () {
    localStorage.setItem('particles', 'disabled');
    window.location.reload();
}

var enableccButton = document.getElementById('ecc');
var disableccButton = document.getElementById('dcc');
var clickoffButtonCheck = localStorage.getItem('clickoffCloak')
if (clickoffButtonCheck === 'disabled' || clickoffButtonCheck === '' || clickoffButtonCheck === null) {
    disableccButton.disabled = true;
    enableccButton.disabled = false;
} else {
    disableccButton.disabled = false;
    enableccButton.disabled = true;
}