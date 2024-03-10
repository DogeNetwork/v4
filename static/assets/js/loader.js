const urlBar = document.querySelector("#urlBar")
const siteUrl = document.querySelector("#siteurl");
const urlInput = document.querySelector("#urlInput");
let encodedUrl = localStorage.getItem("encodedUrl");
var selectedTheme = localStorage.getItem('selectedOption');
var bgUrl = localStorage.getItem('bgUrl');
siteUrl.addEventListener("load", handleLoadEvent);
siteUrl.addEventListener("srcchange", handleSrcChangeEvent);
document.querySelector("#urlInput").addEventListener("keypress", handleEnterKeyPress);

Object.defineProperty(siteUrl, 'src', {
    set: function(value) {
        this.setAttribute('src', value);
        this.dispatchEvent(new Event('srcchange'));
    }
});

urlInput.value = Ultraviolet.codec.xor.decode(encodedUrl);

if (selectedTheme === 'deepsea') {
    urlBar.style.background = "rgb(6, 22, 35)";
} else if (selectedTheme === 'equinox') {
    urlBar.style.backgroundImage = "url('/assets/img/topographic_splash.webp')";
} else if (selectedTheme === 'swamp') {
    urlBar.style.background = "rgb(12, 43, 22)";
} else if (selectedTheme === 'ocean') {
    urlBar.style.background = "rgb(2, 59, 57)";;
} else if (selectedTheme === 'starry') {
    urlBar.style.background = "rgb(63, 3, 53)";
} else if (selectedTheme === 'magma') {
    urlBar.style.background = "rgb(53, 1, 1)";
} else if (selectedTheme === 'sunset') {
    urlBar.style.background = "rgb(53, 52, 1)";
} else if (selectedTheme === 'midnight') {
    urlBar.style.background = "rgb(27, 27, 27)";
} else if (selectedTheme === null) {
    urlBar.style.background = "rgb(6, 22, 35)";
} else {
    urlBar.style.background = "rgb(6, 22, 35)";
}

function handleLoadEvent() {
    const decodedPart = getUrlDecodedPart(this.contentWindow.location.href);
    urlInput.value = decodedPart || '';
}

function handleSrcChangeEvent() {
    urlInput.value = getUrlDecodedPart(this.contentWindow.location.href) || '';
}

function updateIframeUrl() {
    var inputUrl = document.querySelector("#urlInput").value.trim();
    var iframe = document.querySelector("#siteurl");
    if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(inputUrl)) {
        iframe.src = '/service/' + Ultraviolet.codec.xor.encode(inputUrl);
    } else {
        iframe.src = '/service/' + Ultraviolet.codec.xor.encode(inputUrl.includes('.') ? 'https://' + inputUrl : 'https://www.google.com/search?q=' + encodeURIComponent(inputUrl));
    }
}

function handleEnterKeyPress(event) {
    if (event.key === "Enter") {
        updateIframeUrl();
    }
}

function getUrlDecodedPart(url) {
    const decodedPart = url.split("/service/")[1];
    return decodedPart ? Ultraviolet.codec.xor.decode(decodedPart.replace(/\?/g, '=')) : null;
}

function isSearchQuery(val = "") {
    return (!/\./.test(val) && !val.startsWith("http://") && !val.startsWith("https://")) ||
        /^\S+$/.test(val);
}

var devToolsLoaded = false;

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
    } else {
      if (eruda) {
        eruda.remove();
      }
    }
    devToolsLoaded = !devToolsLoaded;
  } else {
    console.error('Failed to load DevTools!');
  }
}



/* url bar functions */
function openWindow() {
    function openTabWithIframe(url) {
        const newTab = window.open('about:blank', '_blank');
        if (newTab) {
            const iframe = document.createElement('iframe');
            iframe.id = 'siteurl';
            iframe.src = url;
            iframe.style.position = 'fixed';
            iframe.style.inset = '0px';
            iframe.style.outline = 'none';
            iframe.style.border = 'none';
            iframe.style.height = '100%';
            iframe.style.width = '100%';
            iframe.style.overflow = 'hidden';
            newTab.document.body.appendChild(iframe);
        } else {
            console.error('Failed to open a new tab.');
        }
    }
    const abFrame = document.getElementById('siteurl');
    const currentSrc = abFrame.contentWindow.location.href;
    const targetUrl = currentSrc;
    openTabWithIframe(targetUrl);
    location.href = 'https://google.com';
}

var iframe = siteUrl;

function toggleFs() {
    if (!document.fullscreenElement) {
        iframe.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

function hideBar() {
    urlBar.style.display = 'none';
    siteUrl.style.height = '100vh';
}

function reload() {
    iframe.contentWindow.location.reload();
}

function forward() {
    iframe.contentWindow.history.go(1);
}

function back() {
    iframe.contentWindow.history.go(-1);
}

function exit() {
    location.href = '/';
}