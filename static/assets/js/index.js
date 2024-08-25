const form = document.querySelector("form");
const input = document.querySelector("input");
const remove = document.querySelectorAll('body > :not(#particles-js)');
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  window.navigator.serviceWorker.register("/oldsw.js", {
    scope: '/sv/',
  }).then(() => {
    let url = input.value.trim();
    if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
    else if (!(url.startsWith("https://") || url.startsWith("http://"))) url = "http://" + url;
    localStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
    remove.forEach(element => {
      element.remove();
    });
    location.href = "/portal";
  });
});

function isUrl(val = "") {
  if (/^http(s?):\/\//.test(val) || (val.includes(".") && val.substr(0, 1) !== " ")) return true;
  return false;
}