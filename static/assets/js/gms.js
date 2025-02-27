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

function addGms(name, imageUrl, gameUrl, width, height) {
  var gmsContainer = document.getElementById('gmsContainer');
  var linkElement = document.createElement('a');
  linkElement.href = "#";
  linkElement.className = "square_btn";
  linkElement.onclick = function() {
    function launch() {
      eval(gameUrl); // apps and gms use own function
    }
    launch();
  };
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

fetch('/data/g-list.json').then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}).then(data => {
  const fetchMessage = document.getElementById('fetchMessage');
  let totalGames = 0;

  for (let category in data) {
    if (data.hasOwnProperty(category)) {
      const games = data[category];
      totalGames += games.length;
      games.forEach(game => {
        const { name, imageUrl, url, width, height } = game;
        addGms(name, imageUrl, url, width, height);
      });
    }
  }

  const searchBar = document.querySelector('.searchbar');
  searchBar.placeholder = 'Search ' + totalGames + ' games';

  if (fetchMessage) {
    fetchMessage.style.display = 'none';
  }
  loadGms();
}).catch(error => {
  console.error('Failed to fetch g-list.json:', error);
  const fetchMessage = document.getElementById('fetchMessage');
  if (fetchMessage) {
    fetchMessage.innerText = 'Failed to load, please refresh.';
  }
});

document.getElementById('searchApps').addEventListener('input', function(event) {
  const query = this.value.toLowerCase();
  const links = document.getElementsByClassName('search-results')[0].getElementsByTagName('a');
  let foundResults = false;
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const linkText = link.innerText.toLowerCase();
    if (linkText.includes(query)) {
      link.style.display = 'block';
      foundResults = true;
    }
    else {
      link.style.display = 'none';
    }
  }
  const message = document.getElementById('searchMessage');
  if (!foundResults) {
    message.innerText = 'No Results Found.';
    message.style.display = 'block';
  }
  else {
    message.style.display = 'none';
  }
});

var searchBar = document.querySelector('.searchbar');
var searchIcon = document.getElementById('search');

const defaultPlaceholder = 'Search for games';

searchBar.addEventListener('focus', () => {
  searchIcon.style.marginLeft = '20px';
  searchBar.placeholder = '';
  searchBar.style.textAlign = 'left';
});

searchBar.addEventListener('blur', () => {
  searchIcon.style.marginLeft = '140px';
  searchBar.placeholder = defaultPlaceholder;
  searchBar.style.textAlign = 'center';
});
