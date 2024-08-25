let scope;
const searchBar = document.querySelector(".input");
const urlBar = document.querySelector('#urlBar');
const sideBar = document.getElementById("sidebar");
const menu = document.getElementById('menu');
const frame = document.getElementById('siteurl');
const selectedTheme = localStorage.getItem('selectedOption');
const vercelCheck = localStorage.getItem('isVercel');

searchBar.value = Ultraviolet.codec.xor.decode(localStorage.getItem('encodedUrl'));
lucide.createIcons();

const themeStyles = {
  deepsea: { background: "rgb(6, 22, 35)" },
  equinox: { backgroundImage: "url('/assets/img/topographic_splash.webp')" },
  swamp: { background: "rgb(12, 43, 22)" },
  ocean: { background: "rgb(2, 59, 57)" },
  starry: { background: "rgb(63, 3, 53)" },
  magma: { background: "rgb(31, 26, 26)" },
  sunset: { background: "rgb(29, 21, 27)" },
  midnight: { background: "rgb(27, 27, 27)" },
  default: { background: "rgb(6, 22, 35)" }
};

const selectedStyle = themeStyles[selectedTheme] || themeStyles.default;
if (selectedStyle.background) {
  searchBar.style.background = selectedStyle.background;
}
if (selectedStyle.backgroundImage) {
  urlBar.style.backgroundImage = selectedStyle.backgroundImage;
}

document.getElementById('tabs').addEventListener('click', function() {
  sideBar.style.display = sideBar.style.display === "block" ? "none" : "block";
  if (sideBar.style.display === 'block') {
    menu.style.display = 'none';
  }
});
document.getElementById('more').addEventListener('click', function() {
	menu.style.display = menu.style.display === "block" ? "none" : "block";
	if (menu.style.display === 'block') {
		sideBar.style.display = 'none';
	}
});

function fetchDomains() {
	return fetch('/data/b-list.json').then(response => response.json()).then(data => data.domains).catch(error => {
		console.error('Error fetching domains:', error);
		return []; // ADds a promise so scope can work
	});
}

function createDomainRegex(domains) {
	const escapedDomains = domains.map(domain => domain.replace(/\./g, '\\.'));
	return new RegExp(escapedDomains.join('|') + '(?=[/\\s]|$)', 'i');
}

searchBar.addEventListener("keydown", function(event) {
	if (event.key === 'Enter') {
		var inputUrl = searchBar.value.trim();
		searchBar.blur();
		fetchDomains().then(domains => {
			const domainRegex = createDomainRegex(domains);
			const searchValue = searchBar.value.trim();
			if (vercelCheck !== 'true') {
				if (domainRegex.test(searchValue)) {
					scope = '/sv/';
				} else {
					scope = '/service/';
				}
			} else {
				scope = '/sv/';
				// serverless = no websocket support
			}
			if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(inputUrl)) {
				document.getElementById('siteurl').src = scope + Ultraviolet.codec.xor.encode(inputUrl);
			} else {
				document.getElementById('siteurl').src = scope + Ultraviolet.codec.xor.encode(inputUrl.includes('.') ? 'https://' + inputUrl : 'https://www.google.com/search?q=' + encodeURIComponent(inputUrl));
			}
		});
	}
});
setTimeout(function() {
	var searchBarValue = document.getElementById('searchBar').value;
	if (searchBarValue.startsWith('https://')) {
		localStorage.setItem('encodedUrl', Ultraviolet.codec.xor.encode(searchBarValue));
	} else {
		// Blank URL, not saving
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
  iframe.src = 'https://' + window.location.hostname + '/service/' + Ultraviolet.codec.xor.encode(document.getElementById('searchBar').value);
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
    return '';
  }
  else if (url === 'welcome.html' || url === 'https://' + location.hostname + '/welcome.html') {
    return '';
  }

  var prefixes = ['/service/', '/sv/'];
  let decodedPart = null;

  for (let prefix of prefixes) {
    const uvIndex = url.indexOf(prefix);
    if (uvIndex !== -1) {
      const encodedPart = url.substring(uvIndex + prefix.length);
      try {
        decodedPart = Ultraviolet.codec.xor.decode(encodedPart);
        break; // Exit the loop once we find a valid prefix
      } catch (error) {
        console.error('Error decoding the URL part:', error);
        return null;
      }
    }
  }

  return decodedPart;
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