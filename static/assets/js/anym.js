(function() {
  var defaultTitle = 'saif | V4';
  var defaultIcon = '/assets/img/saif.jpg';

  var storedTitle = localStorage.getItem('tabTitle');
  var storedIcon = localStorage.getItem('tabIcon');

  var newTitle = storedTitle || defaultTitle;
  var newIcon = storedIcon || defaultIcon;

  var icon = document.querySelector('link[rel="icon"]');
  if (icon) {
      icon.setAttribute('href', newIcon);
  } else {
      console.log('[❌] Tab Cloak');
      document.title = defaultTitle;
  }

  if (storedTitle) {
      document.title = newTitle;
  }
})();

// Clickoff Check
var defaultTitle = 'saif | V4';
var defaultIcon = '/assets/img/saif.jpg';
var storedTitle = localStorage.getItem('tabTitle');
var storedIcon = localStorage.getItem('tabIcon');
var icon = document.querySelector('link[rel="icon"]');
var newTitle = storedTitle || defaultTitle;
var newIcon = storedIcon || defaultIcon;
var clickoff = localStorage.getItem('clickoffCloak');

if (storedIcon === '/assets/img/saif.jpg' || storedIcon === null || storedIcon === '') {
    localStorage.setItem('tabIcon', '/assets/img/saif.jpg');
}

var storedIcon = localStorage.getItem('tabIcon');

if (clickoff === 'enabled') {
  document.addEventListener("visibilitychange", function() {
      if (document.hidden) {
          document.title = "Google Docs";
          icon.setAttribute('href', '/assets/img/docs.webp');
      } else {
          document.title = newTitle;
          icon.setAttribute('href', storedIcon);
      }
  });
}

// Panic Key
var storedKey = localStorage.getItem('pkKey');

if (storedKey) {
  document.addEventListener('keydown', function(event) {
    if (event.key === storedKey) {
        function redirect() {
        document.write(`<script>window.location.href = 'https://www.google.com';</script>`);
    }
        setInterval(redirect, 200);
    }
  });
}
