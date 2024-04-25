function loadScript(src, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
}

function loadCSS(href, callback) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  var supportsOnLoad = "onload" in link;
  if (supportsOnLoad) {
    link.onload = callback;
  } else {
    setTimeout(function () {
      callback();
    }, 1000);
  }
  document.head.appendChild(link);
}

loadScript("/uv/uv.handler.js", function () {
  loadScript("/uv/uv.bundle.js", function () {
    loadScript("/uv/uv.config.js", function () {
      window.navigator.serviceWorker.register("/sw.js", {
        scope: __uv$config.prefix,
    });
    console.log("[✔️] UV Loaded");
    });
  });
});

loadCSS('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css', function() {
    console.log('[✔️] Bootstrap icons');
});

if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
    console.log("[✔️] Index.html");
    function clock() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
    
      if (hours > 12) {
        hours -= 12;
      }
      if (hours === 0) {
        hours = 12;
      }
    
      const timeString = `${hours}:${minutes}:${seconds}`;
      document.getElementById("time").textContent = timeString;
    }
    
    clock();
    setInterval(clock, 1000);
    
    const options = [
      
      "Saif is king",
    ];
    
    function getRandomOption() {
      const randomNumber = Math.floor(Math.random() * options.length);
      return options[randomNumber];
    }
    
    function setRandomPlaceholder() {
      const placeholder = document.getElementById("placeholder");
      placeholder.textContent = getRandomOption();
    }

    setRandomPlaceholder();
    
    var proxybar = document.querySelector(".proxybar");
    var search = document.getElementById("search");
    proxybar.addEventListener("focus", () => {
      search.style.marginLeft = "-367px";
    });
    
    proxybar.addEventListener("blur", () => {
      search.style.marginLeft = "-150px";
    });
}

window.addEventListener("load", function () {
  loadScript("/worker.js");
  if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
    if (window.innerWidth < 676) {
      location.href = "/mobile.html";
    }
  }
  if (window.location.pathname === '/loading.html') {
    if (window.innerWidth < 676) {
      var rm = document.querySelector('.themesExcluded');
      rm.style.display = 'none';
    }
  }
});
