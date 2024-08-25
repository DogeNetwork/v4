function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  window.onload = function() {
    let goParam = getQueryParam('login');
    if (goParam) {
      let url = Ultraviolet.codec.base64.decode(goParam);
      if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
      else if (!(url.startsWith("https://") || url.startsWith("http://"))) url = "http://" + url;
      localStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
      window.navigator.serviceWorker.register("/sw.js", {
        scope: "/service/",
      });
      window.navigator.serviceWorker.register("/oldsw.js", {
        scope: '/sv/',
      });
      location.href = '/portal';
    }
  }
  
  function isUrl(val = "") {
    if (/^http(s?):\/\//.test(val) || (val.includes(".") && val.substr(0, 1) !== " ")) return true;
    return false;
  }