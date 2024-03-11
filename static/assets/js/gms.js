function loadGms() {
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

function addGms(name, imageUrl, onClickFunction, width, height) {
    var gmsContainer = document.getElementById('gmsContainer');
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

    gmsContainer.appendChild(linkElement);
}

var gms = {
    'GeForce Now': { imageUrl: "/assets/img/geforcenow.webp", onClick: geforce },
    '1v1.lol': { imageUrl: "/assets/img/1v1.webp", onClick: onevone },
    'Slope': { imageUrl: "/assets/img/slope.webp", onClick: slope },
    'Jstris': { imageUrl: "/assets/img/jstris.webp", onClick: jstris },
    'Roblox': { imageUrl: "/assets/img/roblox.webp", onClick: rbx },
    'Bitlife': { imageUrl: "/assets/img/bitlife.webp", onClick: bitlife, height: 130 },
    '2048 ': { imageUrl: "/assets/img/2048.webp", onClick: twoZeroFourEight, height: 130 },
    'Pokemon 2048': { imageUrl: "/assets/img/p2048.webp", onClick: p2048, height: 130 },
    'Subway Surfers': { imageUrl: "/assets/img/subway.webp", onClick: subway, height: 130 },
    'Hole.io': { imageUrl: "/assets/img/hole-io.webp", onClick: holeio, height: 130 },
    'Florr.io': { imageUrl: "/assets/img/florr.webp", onClick: florr },
    'Boxel Rebound': { imageUrl: "/assets/img/boxelrebound.webp", onClick: brebound, height: 130 },
    'Chess.com': { imageUrl: "/assets/img/chess.webp", onClick: chess },
    'Cookie Clicker': { imageUrl: "/assets/img/cookieclicker.webp", onClick: cookieClicker },
    'Krunker.io': { imageUrl: "/assets/img/krunker.webp", onClick: krunker },
    'Paper.io': { imageUrl: "/assets/img/paperio.webp", onClick: paperIo },
    'Retro Bowl': { imageUrl: "/assets/img/retro.webp", onClick: rBowl },
    'Territorial.io': { imageUrl: "/assets/img/territorial.webp", onClick: territorial },
    'BasketBros.io': { imageUrl: "/assets/img/basketbros.webp", onClick: basketBros },
    'Basket Random': { imageUrl: "/assets/img/basketrandom.webp", onClick: basketRandom, height: 130 },
    'Eaglercraft (1.8)': { imageUrl: "/assets/img/eaglercraft.webp", onClick: eaglerCraft18, height: 130 },
    'Eaglercraft (1.5)': { imageUrl: "/assets/img/eaglercraft.webp", onClick: eaglerCraft15, height: 130 },
    'Run 3': { imageUrl: "/assets/img/run3.webp", onClick: run3 },
    'Monkey Mart': { imageUrl: "/assets/img/monkeymart.webp", onClick: monkeyMart },
    'Idle Breakout': { imageUrl: "/assets/img/idlebreakout.webp", onClick: idleBreakout },
    'Moto X3M': { imageUrl: "/assets/img/motox3m.webp", onClick: motoX3M },
    'Watermelon Game (Suika)': { imageUrl: "/assets/img/suika.webp", onClick: suikaWatermelon, height: 130 },
    'Time Shooter SWAT': { imageUrl: "/assets/img/time-shooter-3.webp", onClick: timeShooter3, height: 130 },
    'There is No Game': { imageUrl: "/assets/img/there-is-no-gms.webp", onClick: thereIsNoGame, height: 130 },
    'OvO': { imageUrl: "/assets/img/ovo.webp", onClick: ovo, height: 130 },
    'Awesome Tanks 2': { imageUrl: "/assets/img/atanks2.webp", onClick: awesomeTanksTwo, height: 130 },
    'Temple Run': { imageUrl: "/assets/img/temple-run.webp", onClick: templeRun },
    'Drift Hunters': { imageUrl: "/assets/img/drifthunters.webp", onClick: driftHunters },
    'Drive Mad': { imageUrl: "/assets/img/drive-mad.webp", onClick: driveMad },
    'Stickman Hook': { imageUrl: "/assets/img/stickmanhook.webp", onClick: stickManHook, height: 130 },
    'Kick The Buddy': { imageUrl: "/assets/img/super-buddy-kick.webp", onClick: kickTheBuddy, height: 130 },
    'Fireboy and Watergirl': { imageUrl: "/assets/img/fireboy-and-watergirl.webp", onClick: fBwG1, height: 130 },
}; 
for (var gmsName in gms) {
    if (gms.hasOwnProperty(gmsName)) {
      try {
        const { imageUrl, onClick, width, height } = gms[gmsName];
        addGms(gmsName, imageUrl, onClick, width, height);
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

loadGms();