 // Function to handle button clicks and toggle between functions
 document.getElementById('cloak').addEventListener('click', function () {
    // Check which function to call and then toggle
    if (this.getAttribute('data-current-function') === 'tabCloak') {
        disableTabCloak();
        this.setAttribute('data-current-function', 'disableTC');
    } else {
        tabCloak();
        this.setAttribute('data-current-function', 'tabCloak');
    }
});

function showLoginPopup() {
    document.getElementById("loginPopup").style.display = "block";
}

function closeLoginPopup() {
    document.getElementById("loginPopup").style.display = "none";
}

function saveLogin() {
    const userpass = document.getElementById("loginPopup-input").value;
    localStorage.setItem("wordpass", userpass);
    localStorage.setItem('login', 'enablelogin');
    closeLoginPopup(); // Close the popup after saving to localStorage
    location.href = '/';
}
// login button check

 // Get the button elements
 var enableButton = document.getElementById('enabledLogin');
var disableButton = document.getElementById('disabledLogin');

// Get the value from localStorage
var loginButtonState = localStorage.getItem('login');

// Set the initial disabled states based on localStorage
if (loginButtonState === 'disablelogin') {
    disableButton.disabled = true;
    enableButton.disabled = false;
} else {
    disableButton.disabled = false;
    enableButton.disabled = true;
}

// custom backgrund

function showBackgroundPopup() {
    document.getElementById("backgroundPopup").style.display = "block";
}

function closeBackgroundPopup() {
    document.getElementById("backgroundPopup").style.display = "none";
}

function saveBackground() {
    const backgroundUrl = document.getElementById("backgroundPopup-input").value;
    localStorage.setItem("bgUrl", backgroundUrl);
    closeBackgroundPopup(); // Close the popup after saving to localStorage
   window.location.reload();
}

function resetBackground() {
    localStorage.setItem("bgUrl", "/assets/img/background.png");
    window.location.reload();
}