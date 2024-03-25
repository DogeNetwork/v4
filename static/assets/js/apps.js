function loadApps() {
  const squareBtns = document.querySelectorAll('.square_btn');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadSquareBtn(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  squareBtns.forEach(btn => {
    observer.observe(btn);
  });
}

function loadSquareBtn(btn) {
  btn.classList.add('loaded');
}

function addApp(name, imageUrl, onClickFunction, width, height) {
  var appContainer = document.getElementById('appContainer');
  var linkElement = document.createElement('a');
  linkElement.href = "#";
  linkElement.className = "square_btn";
  linkElement.onclick = onClickFunction;

  if (width) {
      linkElement.style.width = width + 'px';
  }

  if (height) {
      linkElement.style.height = height + 'px';
  }

  var imageElement = document.createElement('img');
  imageElement.className = "rounded";
  imageElement.src = imageUrl;
  imageElement.alt = name;
  imageElement.draggable = false;

  var brElement = document.createElement('br');
  var textElement = document.createTextNode(name);

  linkElement.appendChild(imageElement);
  linkElement.appendChild(brElement);
  linkElement.appendChild(textElement);

  appContainer.appendChild(linkElement);
}

var apps = {
  Google: { imageUrl: "/assets/img/google-icon.webp", onClick: google },
  ChatGPT: { imageUrl: "/assets/img/gpt.webp", onClick: gpt },
  'Gemini': { imageUrl: "/assets/img/gemini.webp", onClick: gemini },
  Discord: { imageUrl: "/assets/img/discord.webp", onClick: discord },
  Twitter: { imageUrl: "/assets/img/twitter-x.webp", onClick: twitter },
  Reddit: { imageUrl: "/assets/img/reddit.webp", onClick: reddit },
  Pinterest: { imageUrl: "/assets/img/pinterest.webp", onClick: pin },
  'CoolMath': { imageUrl: "/assets/img/coolmathgames.webp", onClick: cmg },
  CrazyGames: { imageUrl: "/assets/img/crazygames.webp", onClick: crazygms },
  'Y8 Games': { imageUrl: "/assets/img/y8.webp", onClick: y8 },
  'Neal.fun': { imageUrl: "/assets/img/neal.webp", onClick: nf},
  'GeForce Now': { imageUrl: "/assets/img/geforcenow.webp", onClick: geforce },
  'Now.GG': { imageUrl: "/assets/img/nowgg.webp", onClick: ng },
  'Chess.com': { imageUrl: "/assets/img/chess.webp", onClick: chess },
  'Symbolab Math Solver': { imageUrl: "/assets/img/symbolab.webp", onClick: symbolab, height: 130 },
  YouTube: { imageUrl: "/assets/img/youtube.webp", onClick: yt },
  Netflix: { imageUrl: "/assets/img/netflix.webp", onClick: netflix },
  SFlix: { imageUrl: "/assets/img/sflix.webp", onClick: sFlix },
  Twitch: { imageUrl: "/assets/img/twitch.webp", onClick: twitch },
  TikTok: { imageUrl: "/assets/img/tiktok.webp", onClick: tt },
  Spotify: { imageUrl: "/assets/img/spotify.webp", onClick: spotify },
  GitHub: { imageUrl: "/assets/img/github.webp", onClick: github },
  'Visual Studio Code': { imageUrl: "/assets/img/vscode.webp", onClick: vscode, height: 130 },


};


for (var appName in apps) {
  if (apps.hasOwnProperty(appName)) {
    try {
      const { imageUrl, onClick, width, height } = apps[appName];
      addApp(appName, imageUrl, onClick, width, height);
      fetchMessage.style.display = 'none';
    } catch (error) {
      fetchMessage.innerText = 'Failed to load, please refresh.';
    }
  }
}

/* search bar */
document.getElementById('searchApps').addEventListener('input', function(event) {
  const query = this.value.toLowerCase();
  const links = document.getElementsByClassName('search-results')[0].getElementsByTagName('a');
  let foundResults = false;
  for(let i = 0; i < links.length; i++) {
      const link = links[i];
      const linkText = link.innerText.toLowerCase();
      if(linkText.includes(query)) {
          link.style.display = 'block';
          foundResults = true;
      } else {
          link.style.display = 'none';
      }
  }
  if(!foundResults) {
      const message = document.getElementById('searchMessage');
      message.innerText = 'No Results Found.';
      message.style.display = 'block';
  } else {
      const message = document.getElementById('searchMessage');
      message.style.display = 'none';
  }
});

loadApps();

var searchBar = document.querySelector('.searchbar');
var searchIcon = document.getElementById('search');
searchBar.addEventListener('focus', () => {
  searchIcon.style.marginLeft = '20px';
  searchBar.placeholder = '';
  searchBar.style.textAlign = 'left';
});

searchBar.addEventListener('blur', () => {
  searchIcon.style.marginLeft = '147px';
  searchBar.placeholder = 'Search for apps';
  searchBar.style.textAlign = 'center';
});

/*
var scriptElement = document.createElement('script');
scriptElement.type = 'text/javascript';
scriptElement.innerHTML = `atOptions = {
'key': 'f1818624979d7b153c0194b4c3ce4d7e',
'format': 'iframe',
'height': 60,
'width': 468,
'params': {}
};
document.write('<scr' + 'ipt type="text/javascript" src="//www.topcreativeformat.com/f1818624979d7b153c0194b4c3ce4d7e/invoke.js"></scr' + 'ipt>');
`;
document.body.appendChild(scriptElement);

window.onload = function() {
function centerIframe() {
  var adFrame = document.querySelector('iframe');
  var containerWidth = adFrame.parentElement.clientWidth;
  var adFrameWidth = adFrame.clientWidth;
  var marginLeft = (containerWidth - adFrameWidth) / 2 + 'px';
  adFrame.style.marginLeft = marginLeft;
}
setInterval(centerIframe, 900);
};
*/