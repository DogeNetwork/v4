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
    Discord: { imageUrl: "/assets/img/discord.webp", onClick: discord },
    'CoolMath': { imageUrl: "/assets/img/coolmathgames.webp", onClick: cmg },
    CrazyGames: { imageUrl: "/assets/img/crazygames.webp", onClick: crazygms },
    YouTube: { imageUrl: "/assets/img/youtube.webp", onClick: yt },
    Spotify: { imageUrl: "/assets/img/spotify.webp", onClick: spotify },
    TikTok: { imageUrl: "/assets/img/tiktok.webp", onClick: tt },
    Twitter: { imageUrl: "/assets/img/twitter-x.webp", onClick: twitter },
    Reddit: { imageUrl: "/assets/img/reddit.webp", onClick: reddit },
    Pinterest: { imageUrl: "/assets/img/pinterest.webp", onClick: pin },
    Twitch: { imageUrl: "/assets/img/twitch.webp", onClick: twitch },
    'GeForce Now': { imageUrl: "/assets/img/geforcenow.webp", onClick: geforce },
    GitHub: { imageUrl: "/assets/img/github.webp", onClick: github },
    SFlix: { imageUrl: "/assets/img/sflix.webp", onClick: sFlix },
    'Now.GG': { imageUrl: "/assets/img/nowgg.webp", onClick: ng },
    'Chess.com': { imageUrl: "/assets/img/chess.webp", onClick: chess },
    'Visual Studio Code': { imageUrl: "/assets/img/vscode.webp", onClick: vscode, height: 130 },
    'Y8 Games': { imageUrl: "/assets/img/y8.webp", onClick: y8 },
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

/* ads 
atOptions = {
    'key': 'f1818624979d7b153c0194b4c3ce4d7e',
    'format': 'iframe',
    'height': 60,
    'width': 468,
    'params': {}
};
document.write('<scr' + 'ipt type="text/javascript" src="//www.topcreativeformat.com/f1818624979d7b153c0194b4c3ce4d7e/invoke.js"></scr' + 'ipt>');

function centerIframe() {
  var adFrame = document.querySelector('iframe');
  var containerWidth = adFrame.parentElement.clientWidth;
  var adFrameWidth = adFrame.clientWidth;
  var marginLeft = (containerWidth - adFrameWidth) / 2 + 'px';
  adFrame.style.marginLeft = marginLeft;
  adFrame.style.borderRadius = '10px';
}

setInterval(centerIframe, 900);
*/