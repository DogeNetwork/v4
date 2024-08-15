const icon = document.querySelector('link[rel="icon"]');
const storedKey = localStorage.getItem('pkKey');
const defaultTitle = 'Doge | V4';
const defaultIcon = '/assets/img/doge.jpg';
const storedTitle = localStorage.getItem('tabTitle');
const storedIcon = localStorage.getItem('tabIcon');
const newTitle = storedTitle || defaultTitle;
const newIcon = storedIcon || defaultIcon;

function injection() {
    function ck() {
    if (icon) {
        icon.setAttribute('href', newIcon);
    } else {
        document.title = newTitle;
    }
    if (storedTitle) {
        document.title = newTitle;
    }
    }
    ck();
    setInterval(ck, 500);
    
    // Panic Key  
    if (storedKey) {
      document.addEventListener('keydown', function(event) {
        if (event.key === storedKey) {
            function redirect() {
            document.write(`<script>window.location.href = 'https://www.google.com';</script>`);
        }
        setInterval(redirect, 200);
    }});
    }
}

function ck() {
    if (icon) {
        icon.setAttribute('href', newIcon);
    } else {
        document.title = newTitle;
    }
    if (storedTitle) {
        document.title = newTitle;
    }
}

(function() {
    injection();
})();