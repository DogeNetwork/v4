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
      popup.document.title = "My Drive - Google Drive";
      const link = popup.document.createElement("link");
      link.rel = "icon";
      link.href = "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png";
      popup.document.head.appendChild(link);
      const iframe = popup.document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.top = iframe.style.bottom = iframe.style.left = iframe.style.right = "0";
      iframe.style.width = iframe.style.height = "100%";
      iframe.style.margin = "0";
      iframe.style.border = iframe.style.outline = "none";
      iframe.src = location.href;
      popup.document.body.appendChild(iframe);
      location.replace("https://www.google.com");
    }
  }
}

var leaveConf = localStorage.getItem("leaveConfirmation");

if (leaveConf === "enabled") {
  window.onbeforeunload = function (e) {
    const confirmationMessage = "Are you sure you want to leave this page?";
    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
};
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
    event.stopPropagation(); // prevent the click from closing the right-click menu
  }

  submenuOpen = !submenuOpen;
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
  var newTitle = "(1) SalyteLearn";
  var newIcon = "/assets/img/salyte.jpg";

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
  submenu2Open = false;
}

function openSettings() {
  location.href = "/settings.html";
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

function visitSite() {
  var checkHistory = localStorage.getItem("encodedUrl");
  if (checkHistory) {
    location.href = "/go?url=" + checkHistory;
  } else {
    alert("Could not find a previously saved site, visit a site first!");
  }
}

var domain = window.location.hostname;
if (domain.endsWith('vercel.app')) {
    localStorage.setItem('isVercel', 'true');
}

console.log(
  "%cCyborgEDU (Student Pack) v32.537.2.11",
  "color: yellow; font-size: 16px"
);
