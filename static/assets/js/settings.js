document.addEventListener("DOMContentLoaded", function () {
    const settingsContainers = document.querySelectorAll('.settingscontainer');
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadSettingsContainer(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });
  
    settingsContainers.forEach(container => {
      observer.observe(container);
    });
  });
  
  function loadSettingsContainer(container) {

    container.classList.add('loaded');
}

// FOR PARTICLES, DISABLING PARTICLES IS ENABLING. THE BUTTONS ARE OPPISITE.
var particlesEnabledButton = document.getElementById('enabledParticles');
var particlesDisabledButton = document.getElementById('disabledParticles');

var particless = localStorage.getItem('particles');

if (particless === 'disabled' || particless === '' || particless === null) {
    particlesDisabledButton.disabled = true;
    particlesEnabledButton.disabled = false;
} else {
    particlesDisabledButton = false;
    particlesEnabledButton.disabled = true;
}

// custom bg

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


// panic key
function showPK() {
    document.getElementById("panicPopup").style.display = "block";
}

function closePK() {
    const pkErrorMessageDiv = document.getElementById("pkErrorMessage");
    document.getElementById("panicPopup").style.display = "none";
    pkErrorMessageDiv.style.display = "none";

}
function detectKey() {
    document.getElementById('panicPopup-input').readOnly = false;

    document.addEventListener('keydown', function(event) {
      const pressedKey = event.key;
      document.getElementById('panicPopup-input').value = pressedKey;
      document.getElementById('panicPopup-input').readOnly = true;
      document.removeEventListener('keydown', arguments.callee);
    }, { once: false });
}

function savePK() {
    const pkKey = document.getElementById("panicPopup-input").value;
    const pkErrorMessageDiv = document.getElementById("pkErrorMessage");
    localStorage.setItem('pkKey', pkKey);
    if (pkKey.trim() === "") {
        pkErrorMessageDiv.style.display = "block";
    } else {
        closePK();
        window.location.reload();
    }
}

function removePK() {
    localStorage.removeItem("pkKey");
    window.location.reload();
}

function leaveConf() {
    var confCheck = localStorage.getItem('leaveConfirmation');
    if (confCheck !== 'enabled') {
    localStorage.setItem('leaveConfirmation', 'enabled');
    } else {
        localStorage.setItem('leaveConfirmation', 'disabled');
    }
    window.location.reload();
}


// leaveconf button check

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
    localStorage.setItem('cloakedIcon', '/assets/img/docs.webp');
    tabCloak();
}

function googleCloak() {
    localStorage.setItem('cloakedTitle', 'Google');
    localStorage.setItem('cloakedIcon', '/assets/img/google.webp');
    tabCloak();
}

function classroomCloak() {
    localStorage.setItem('cloakedTitle', 'Classes');
    localStorage.setItem('cloakedIcon', '/assets/img/classroom-icon.webp');
    tabCloak();
}

function enableClickoffCloak() {
    localStorage.setItem('clickoffCloak', 'enabled');
    window.location.reload();
}

function disableClickoffCloak() {
    localStorage.setItem('clickoffCloak', 'disabled');
    window.location.reload();
}


// FOR PARTICLES, ENABLING IT WILL BE DISABLING IT. IT'S THE OPPOSITE.  
function enableParticles() {
    localStorage.setItem('particles', 'enabled')
    window.location.reload();
}

function disableParticles() {
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

// On Theme change
const dropdown = document.getElementById('dropdown');
dropdown.addEventListener('change', function () {
    const selectedOptionValue = dropdown.value;     
    localStorage.setItem('selectedOption', selectedOptionValue);
    live();particles();
    console.log('[✔️] Theme Updated');
});
const storedOptionValue = localStorage.getItem('selectedOption');
if (storedOptionValue) {
    dropdown.value = storedOptionValue;
}