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
