(function () {
  var defaultTitle = 'Doge | V4';
  var defaultIcon = '/assets/img/doge.jpg';

  var storedTitle = localStorage.getItem('tabTitle');
  var storedIcon = localStorage.getItem('tabIcon');

  var newTitle = storedTitle || defaultTitle;
  var newIcon = storedIcon || defaultIcon;

  var icon = document.querySelector('link[rel="icon"]');
  if (icon) {
    icon.setAttribute('href', newIcon);
  } else {
    console.log('Tab Cloak Disabled');
    document.title = defaultTitle;
  }

  if (storedTitle) {
    document.title = newTitle;
  }
})();

// Check for Clickoff Cloaking
var defaultTitle = 'Doge | V4';
var defaultIcon = '/assets/img/doge.jpg';
var storedTitle = localStorage.getItem('tabTitle');
var storedIcon = localStorage.getItem('tabIcon');
var icon = document.querySelector('link[rel="icon"]');
var newTitle = storedTitle || defaultTitle;
var newIcon = storedIcon || defaultIcon;
  var clickoff = localStorage.getItem('clickoffCloak');
  if (clickoff === 'enabled') {
    document.addEventListener("visibilitychange", function() {
  if (document.hidden) {
    // Tab is hidden
    document.title = "Google Docs";
    icon.setAttribute('href', '/assets/img/docs.ico');
  } else {
    // Tab is visible
    document.title = newTitle;
    icon.setAttribute('href', storedIcon);
  }
});
  } else {
    console.log('clickoff off');
  }