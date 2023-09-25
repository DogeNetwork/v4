var submenuOpen = false;
var submenu2Open = false;

function toggleSubmenu(event) {
  var submenu = document.querySelector('.context-submenu');
  var submenuParent = document.querySelector('.with-submenu');

  if (submenuOpen) {
    submenu.style.display = 'none';
    submenuParent.classList.remove('open');
  } else {
    submenu.style.display = 'block';
    submenu.style.top = submenuParent.offsetTop + "px";
    submenu.style.left = (submenuParent.offsetLeft + submenuParent.offsetWidth) + "px";
    submenuParent.classList.add('open');
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
  var submenu2 = document.querySelectorAll('.context-submenu')[1];
  var submenuParent2 = document.querySelectorAll('.with-submenu')[1];

  if (submenu2Open) {
    submenu2.style.display = 'none';
    submenuParent2.classList.remove('open');
  } else {
    submenu2.style.display = 'block';
    submenu2.style.top = submenuParent2.offsetTop + "px";
    submenu2.style.left = (submenuParent2.offsetLeft + submenuParent2.offsetWidth) + "px";
    submenuParent2.classList.add('open');
    event.stopPropagation(); // Prevent the click event from closing the right-click menu
  }

  submenu2Open = !submenu2Open;
}

function tabCloak() {
    var newTitle = 'My Drive - Google Drive';
    var newIcon = 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png';
  
    localStorage.setItem('tabTitle', newTitle);
    localStorage.setItem('tabIcon', newIcon);
  
    document.title = newTitle;
    var icon = document.querySelector('link[rel="icon"]');
    icon.setAttribute('href', newIcon);
  }
  
  function disableTabCloak() {
    var newTitle = pagetitle;
    var newIcon = '/assets/img/doge.jpg';
  
    localStorage.setItem('tabTitle', newTitle);
    localStorage.setItem('tabIcon', newIcon);
  
    document.title = newTitle;
    var icon = document.querySelector('link[rel="icon"]');
    icon.setAttribute('href', newIcon);
  }
  
  function openWindow() {
    let url = window.location.href;
    var w = window.open("about:blank", "_blank");
    w.document.write('<iframe style="position: absolute;top: 0px;bottom: 0px;right: 0px;width: 100%;border: none;margin: 0;padding: 0;overflow: hidden;z-index: 99999;height: 100%;" src="' + url + '"></iframe>');
    window.location.href = 'https://classroom.google.com';
  }
  
  function visitLastSite() {
  location.href = '/~';
  }

  function enableLogin() {
    localStorage.setItem('login', 'enablelogin');
    alert('You will now be required to sign-in to use Doge Unblocker. Your password is: "duontop". If you forget your password, you can clear your site cache or join our Discord.');
  location.href = "/";
  }

  // Function to disable login
  function disableLogin() {
    localStorage.setItem('login', 'disablelogin');
    alert('You will no longer be asked to sign-in. (Not Recommended)');
    location.href = "/";
  }

function handleSubmenuClick2() {
  // useless for testing
  alert("hi2");
  hideSubmenu2();
}

function doSomething() {
  // Perform action for context menu option
  console.log("deez nuts");
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
  var submenu = document.querySelector('.context-submenu');
  submenu.style.display = 'none';
  submenuOpen = false;
}

function hideSubmenu2() {
  var submenu2 = document.querySelectorAll('.context-submenu')[1];
  submenu2.style.display = 'none';
  submenu2Open = false;
}

// Add event listeners to show/hide the context menu
document.addEventListener("contextmenu", showContextMenu);
document.addEventListener("click", hideContextMenu);

// Add event listener to hide the context menu and submenu when clicking outside of them
document.addEventListener("click", function(event) {
  var contextMenu = document.getElementById("contextMenu");
  var submenu = document.querySelector('.context-submenu');

  if (!contextMenu.contains(event.target)) {
    hideContextMenu();
  } else if (!submenu.contains(event.target)) {
    hideSubmenu();
  }
});