let workerLoaded;

async function worker() {
  return await navigator.serviceWorker.register("/sw.js", {
    scope: "/service",
  });
}

document.addEventListener('DOMContentLoaded', async function(){
  await worker();
  workerLoaded = true;
})

function prependHttps(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'https://' + url;
  }
  return url;
}

function isUrl(val = "") {
  const urlPattern = /^(http(s)?:\/\/)?([\w-]+\.)+[\w]{2,}(\/.*)?$/;
  return urlPattern.test(val);
}

const inpbox = document.getElementById("uform");
inpbox.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("Connecting to service -> loading");
  if (typeof navigator.serviceWorker === "undefined") {
    alert(
      "An error occurred registering your service worker. Please contact support - discord.gg/unblocker"
    );
  }
  if (!workerLoaded) {
    await worker();
  }
  
  const form = document.querySelector("form");
  const formValue = document.querySelector("form input").value;
  const url = isUrl(formValue) ? prependHttps(formValue) : 'https://www.google.com/search?q=' + encodeURIComponent(formValue);
  localStorage.setItem("encodedUrl", form.action + "?url=" + encodeURIComponent(url))
  location.href = '/~';
});
