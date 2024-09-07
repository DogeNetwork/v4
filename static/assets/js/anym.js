(function() {
    var defaultTitle = '(1) SalyteLearn';
    var defaultIcon = '/assets/img/salyte.jpg';
    var storedTitle = localStorage.getItem('tabTitle') || defaultTitle;
    var storedIcon = localStorage.getItem('tabIcon') || defaultIcon;
    var icon = document.querySelector('link[rel="icon"]');
    if (icon) {
      icon.setAttribute('href', storedIcon);
    }
    else {
      console.log('[❌] Tab Cloak');
    }
    document.title = storedTitle;
    // Clickoff Check
    var clickoff = localStorage.getItem('clickoffCloak');
    if (clickoff === 'enabled') {
      document.addEventListener("visibilitychange", function() {
        if (document.hidden) {
          document.title = "Google Docs";
          icon.setAttribute('href', '/assets/img/docs.webp');
        }
        else {
          document.title = storedTitle;
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
  })();