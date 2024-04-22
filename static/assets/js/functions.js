// openUrl function
function openUrl(url) {
  location.href = "https://" + url;
}

function send(url) {
  location.href = window.location.origin + url;
}

// about:blank cloaking
var blankerCheck = localStorage.getItem("aboutBlank");
if (blankerCheck === "enabled") {
  let inFrame;
  try {
    inFrame = window !== top;
  } catch (e) {
    inFrame = true;
  }
  if (!inFrame && !navigator.userAgent.includes("Firefox")) {
    const popup = open("about:blank", "_blank");
    if (!popup || popup.closed) {
      alert("Please allow popups and redirects for about:blank cloak to work.");
    } else {
      const doc = popup.document;
      const iframe = doc.createElement("iframe");
      const style = iframe.style;
      const link = doc.createElement("link");
      const name = localStorage.getItem("name") || "My Drive - Google Drive";
      const icon =
        localStorage.getItem("icon") ||
        "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png";
      doc.title = name;
      link.rel = "icon";
      link.href = icon;
      iframe.src = location.href;
      style.position = "fixed";
      style.top = style.bottom = style.left = style.right = 0;
      style.border = style.outline = "none";
      style.width = style.height = "100%";
      doc.head.appendChild(link);
      doc.body.appendChild(iframe);
      location.replace("https://classroom.google.com");
    }
  }
}

var leaveConf = localStorage.getItem("leaveConfirmation");

if (leaveConf === "enabled") {
  window.onbeforeunload = function () {
    return "";
  };
  function conf2() {
    return "";
  }
  conf2();
}

var submenuOpen = false;
var submenu2Open = false;

function toggleSubmenu(event) {
  var submenu = document.querySelector(".context-submenu");
  var submenuParent = document.querySelector(".with-submenu");

  if (submenuOpen) {
    submenu.style.display = "none";
    submenuParent.classList.remove("open");
  } else {
    submenu.style.display = "block";
    submenu.style.top = submenuParent.offsetTop + "px";
    submenu.style.left =
      submenuParent.offsetLeft + submenuParent.offsetWidth + "px";
    submenuParent.classList.add("open");
    event.stopPropagation(); // Prevent the click event from closing the right-click menu
  }

  submenuOpen = !submenuOpen;
}

function handleSubmenuClick() {
  // Perform action when submenu option is clicked
  alert("hi");
  hideSubmenu();
}

function toggleSubmenu2(event) {
  var submenu2 = document.querySelectorAll(".context-submenu")[1];
  var submenuParent2 = document.querySelectorAll(".with-submenu")[1];

  if (submenu2Open) {
    submenu2.style.display = "none";
    submenuParent2.classList.remove("open");
  } else {
    submenu2.style.display = "block";
    submenu2.style.top = submenuParent2.offsetTop + "px";
    submenu2.style.left =
      submenuParent2.offsetLeft + submenuParent2.offsetWidth + "px";
    submenuParent2.classList.add("open");
    event.stopPropagation(); // Prevent the click event from closing the right-click menu
  }

  submenu2Open = !submenu2Open;
}

function tabCloak() {
  var newTitle = localStorage.getItem("cloakedTitle");
  var newIcon = localStorage.getItem("cloakedIcon");

  if (newTitle === null || newTitle === "") {
    alert("No Cloak Detected. Please select one in settings.");
  } else {
    localStorage.setItem("tabTitle", newTitle);
    localStorage.setItem("tabIcon", newIcon);
    document.title = newTitle;
    var icon = document.querySelector('link[rel="icon"]');
    icon.setAttribute("href", newIcon);
  }
}

function disableTabCloak() {
  var newTitle = "Doge | V4";
  var newIcon = "/assets/img/doge.jpg";

  localStorage.setItem("tabTitle", newTitle);
  localStorage.setItem("tabIcon", newIcon);

  document.title = newTitle;
  var icon = document.querySelector('link[rel="icon"]');
  icon.setAttribute("href", newIcon);
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
  iframe.src = window.location.href;
  win.document.body.appendChild(iframe);
}

function visitLastSite() {
  location.href = "/~";
}

function showContextMenu(event) {
  event.preventDefault();
  var contextMenu = document.getElementById("contextMenu");
  contextMenu.style.left = event.clientX + "px";
  contextMenu.style.top = event.clientY + "px";
  contextMenu.style.display = "block";
}

function hideContextMenu() {
  var contextMenu = document.getElementById("contextMenu");
  contextMenu.style.display = "none";
  hideSubmenu();
  hideSubmenu2();
}

function hideSubmenu() {
  var submenu = document.querySelector(".context-submenu");
  submenu.style.display = "none";
  submenuOpen = false;
}

function hideSubmenu2() {
  var submenu2 = document.querySelectorAll(".context-submenu")[1];
  submenu2.style.display = "none";
  submenu2Open = false;
}

function openSettings() {
  location.href = "/settings.html";
}

function youtube() {
  let URL = "https://www.youtube.com/";
  let urlToInject =
    window.location.origin + __uv$config.prefix + __uv$config.encodeUrl(URL);
  const newWindow = window.open();
  const iframe = newWindow.document.createElement("iframe");
  newWindow.document.body.style.margin = "0";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.position = "fixed";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.zIndex = "99999";
  iframe.style.border = "none";
  newWindow.document.body.style.overflow = "hidden";
  newWindow.document.body.appendChild(iframe);
  iframe.src = urlToInject;
}

function enableAboutBlank() {
  localStorage.setItem("aboutBlank", "enabled");
  window.location.reload();
}

function disableAboutBlank() {
  localStorage.setItem("aboutBlank", "disabled");
  window.location.reload();
}

// Add event listeners to show/hide the context menu
document.addEventListener("contextmenu", showContextMenu);
document.addEventListener("click", hideContextMenu);

// Add event listener to hide the context menu and submenu when clicking outside of them
document.addEventListener("click", function (event) {
  var contextMenu = document.getElementById("contextMenu");
  var submenu = document.querySelector(".context-submenu");

  if (!contextMenu.contains(event.target)) {
    hideContextMenu();
  } else if (!submenu.contains(event.target)) {
    hideSubmenu();
  }
});

function vSite() {
  var checkHistory = localStorage.getItem("encodedUrl");
  if (checkHistory !== null) {
    location.href = "/student";
  } else {
    alert("Could not find a previously proxified site, visit a site first!");
  }
}

function vAG() {
  var checkHistory = localStorage.getItem("agUrl");
  if (checkHistory !== null) {
    location.href = "/lessons";
  } else {
    alert("Could not find a previously visited app/game, visit one first!");
  }
}

if (window.location.protocol === "http:") {
  window.location.href = window.location.href.replace("http:", "https:");
}

console.log(
  "%cJoin our Discord! discord.gg/unblocking",
  "color: cyan; font-size: 20px"
);
