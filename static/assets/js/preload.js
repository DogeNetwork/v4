window.onload = function() {
    const stockSW = "/uv/sw.js";
    const swAllowedHostnames = ["localhost", "127.0.0.1"];
    const wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
    const connection = new BareMux.BareMuxConnection("/baremux/worker.js");
    async function registerSW() {
      if(!navigator.serviceWorker) {
        if(location.protocol !== "https:" && !swAllowedHostnames.includes(location.hostname)) throw new Error("Service workers cannot be registered without https.");
        throw new Error("Your browser doesn't support service workers.");
      }
      await connection.setTransport("/libcurl/index.mjs", [{
        wisp: wispUrl
      }]);
      await navigator.serviceWorker.register(stockSW);
      let encodedUrl = localStorage.getItem("encodedUrl");
      encodedUrl = "/service/" + encodedUrl;
      document.querySelector("#siteurl").src = encodedUrl;
    }
    /* CK */
    function rndNum() {
      return Math.floor(Math.random() * 900) + 100;
    }
  
    function rndAbcString(length) {
      const characters = "abcdefghijklmnopqrstuvw0123456789012345";
      let result = "";
      for(let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    }
    var randomAlphanumericString = rndAbcString(5);
    var url = "/student?auth=" + randomAlphanumericString;
    var title = "Google Docs";
    history.pushState({}, title, url);
    registerSW();
    live();
  };