let devToolsLoaded = 0;
const searchBar = document.querySelector(".input");
const urlBar = document.querySelector('#urlBar');
const sideBar = document.getElementById("sidebar");
const menu = document.getElementById('menu');
const frame = document.getElementById('siteurl');
var selectedTheme = localStorage.getItem('selectedOption');
searchBar.value = Ultraviolet.codec.xor.decode(localStorage.getItem('encodedUrl'));
lucide.createIcons();
if (selectedTheme === 'deepsea') {
  searchBar.style.background = "rgb(6, 22, 35)";
}
else if (selectedTheme === 'equinox') {
  urlBar.style.backgroundImage = "url('/assets/img/topographic_splash.webp')";
}
else if (selectedTheme === 'swamp') {
  searchBar.style.background = "rgb(12, 43, 22)";
}
else if (selectedTheme === 'ocean') {
  searchBar.style.background = "rgb(2, 59, 57)";;
}
else if (selectedTheme === 'starry') {
  searchBar.style.background = "rgb(63, 3, 53)";
}
else if (selectedTheme === 'magma') {
  searchBar.style.background = "rgb(31, 26, 26)";
}
else if (selectedTheme === 'sunset') {
  searchBar.style.background = "rgb(29, 21, 27)";
}
else if (selectedTheme === 'midnight') {
  searchBar.style.background = "rgb(27, 27, 27)";
}
else if (selectedTheme === null) {
  searchBar.style.background = "rgb(6, 22, 35)";
}
else {
  searchBar.style.background = "rgb(6, 22, 35)";
}
document.getElementById('tabs').addEventListener('click', function() {
  sidebar.style.display = sidebar.style.display === "block" ? "none" : "block";
  if (sidebar.style.display === 'block') {
    menu.style.display = 'none';
  }
});
document.getElementById('more').addEventListener('click', function() {
  menu.style.display = menu.style.display === "block" ? "none" : "block";
  if (menu.style.display === 'block') {
    document.getElementById('sidebar').style.display = 'none';
  }
});
searchBar.addEventListener("keydown", function() {
  if (event.key === 'Enter') {
    var inputUrl = searchBar.value.trim();
    searchBar.blur();
    if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(inputUrl)) {
      document.getElementById('siteurl').src = '/sv/' + Ultraviolet.codec.xor.encode(inputUrl);
    }
    else {
      document.getElementById('siteurl').src = '/sv/' + Ultraviolet.codec.xor.encode(inputUrl.includes('.') ? 'https://' + inputUrl : 'https://www.google.com/search?q=' + encodeURIComponent(inputUrl));
    }
  }
});
setTimeout(function() {
  var searchBarValue = document.getElementById('searchBar').value;
  if (searchBarValue.startsWith('https://')) {
    localStorage.setItem('encodedUrl', Ultraviolet.codec.xor.encode(searchBarValue));
  }
  else {
    console.log('Blank URL, not saving');
  }
}, 60000);
// Save URL every 60 seconds
function forward() {
  frame.contentWindow.history.go(1);
}

function back() {
  frame.contentWindow.history.go(-1);
  setTimeout(() => {
    const currentSrc = frame.contentWindow.location.pathname;
    if (currentSrc === '/loading.html') {
      forward();
    }
  }, 500);
}

function reload() {
  frame.contentWindow.location.reload();
}

function devTools() {
  var siteIframe = document.getElementById('siteurl');
  if (siteIframe) {
    var innerDoc = siteIframe.contentDocument || siteIframe.contentWindow.document;
    var eruda = innerDoc.getElementById('eruda');
    if (!devToolsLoaded) {
      if (!eruda) {
        var erudaScript = document.createElement('script');
        erudaScript.src = "//cdn.jsdelivr.net/npm/eruda";
        erudaScript.onload = function() {
          var initScript = document.createElement('script');
          initScript.innerHTML = "eruda.init();eruda.show();";
          innerDoc.head.appendChild(initScript);
        };
        innerDoc.head.appendChild(erudaScript);
      }
    }
    else {
      if (eruda) {
        eruda.remove();
      }
    }
    devToolsLoaded = !devToolsLoaded;
  }
}

function openWindow() {
  var win = window.open();
  win.document.body.style.margin = "0";
  win.document.body.style.height = "100vh";
  var iframe = win.document.createElement("iframe");
  iframe.style.border = "none";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.margin = "0";
  iframe.src = 'https://' + window.location.hostname + __uv$config.prefix + Ultraviolet.codec.xor.encode(document.getElementById('searchBar').value);
  win.document.body.appendChild(iframe);
}

function exit() {
  location.href = '/'
}

function hideBar() {
  var elements = ["menu", "sideBar", "urlBar"];
  elements.forEach(elementId => {
    var element = document.getElementById(elementId);
    if (element) {
      element.style.display = 'none';
      var allFrames = document.querySelectorAll('iframe');
      allFrames.forEach(iframe => {
        iframe.style.height = 'calc(100vh)';
      });
    }
  });
}

function decode(url) {
  if (url === 'about:blank' || url === 'welcome.html') {
    return ''
  }
  else if (url === 'welcome.html' || url === 'https://beta.derpman.lol/welcome.html') {
    return ''
  }
  var uvPrefix = '/sv/';
  const uvIndex = url.indexOf(uvPrefix);
  const encodedPart = uvIndex !== -1 ? url.substring(uvIndex + uvPrefix.length) : url;
  try {
    const decodedPart = Ultraviolet.codec.xor.decode(encodedPart);
    return decodedPart;
  }
  catch (error) {
    console.error('Error decoding the URL part:', error);
    return null;
  }
}

function updateSearch() {
  var url = decode(document.getElementById('siteurl').src);
  document.querySelector('.searchBar').value = url;
}

function startInterval() {
  let intervalId;

  function startLoop() {
    intervalId = setInterval(() => {
      searchBar.value = decode(document.getElementById("siteurl").contentWindow.location.href);
    }, 1000);
  }

  function stopLoop() {
    clearInterval(intervalId);
  }
  searchBar.addEventListener('focus', stopLoop);
  searchBar.addEventListener('blur', startLoop);
  startLoop();
}

function onFrameClick() {
  if (document.getElementById('siteurl').contentWindow) {
    document.getElementById('siteurl').contentWindow.addEventListener('click', frameClicked);
    document.getElementById('siteurl').contentWindow.addEventListener('touchend', frameClicked);
  }
}

function frameClicked() {
  sideBar.style.display = 'none';
  menu.style.display = 'none';
}

function home() {
  location.href = '/';
}

function toggleFs() {
  if (!document.fullscreenElement) {
    document.getElementById('siteurl').requestFullscreen();
    menu.style.display = 'none';
  }
}
document.addEventListener('DOMContentLoaded', function() {
  onFrameClick();
  setInterval(onFrameClick, 1000);
});