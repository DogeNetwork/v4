/*function youtube() {
  let URL = 'https://www.youtube.com/';
  let urlToInject = window.location.origin + __uv$config.prefix + __uv$config.encodeUrl(URL);
  const newWindow = window.open();
  const iframe = newWindow.document.createElement('iframe');
  newWindow.document.body.style.margin = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.position = 'fixed';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.zIndex = '99999';
  iframe.style.border = 'none';
  newWindow.document.body.style.overflow = 'hidden';
  newWindow.document.body.appendChild(iframe);
  iframe.src = urlToInject;
}*/

function openAg(url, ag) {
  localStorage.setItem("currentAg", ag)
  
  agU = Ultraviolet.codec.xor.encode(url);
  localStorage.setItem('agUrl', agU);
  location.href = '/lessons';
}

window.navigator.serviceWorker.register("/sw.js", {
  scope: __uv$config.prefix,
});

/*apps*/
function gpt() {
  openAg('https://ub7.org', "GPT");
}

function nf() {
  alert('This app is still in development.\nCheck discord.gg/unblocking for details.');
  /*  document.title = 'Doge | V4';
  var cloakcheckScript = document.createElement("script");
  cloakcheckScript.src = "/assets/js/cloak.js";
  document.head.appendChild(cloakcheckScript);

  var functionsScript = document.createElement("script");
  functionsScript.src = "/assets/js/functions.js";
  document.head.appendChild(functionsScript);

  document.body.innerHTML = `
<script src="/assets/js/index.js"></script>
<script src="/uv/uv.bundle.js"></script>
<script src="/uv/uv.bundle.js"></script>
<script src="/uv/uv.config.js"></script>
<script src="/assets/js/ag.js"></script>
<script>
window.navigator.serviceWorker
  .register("/sw.js", {
    scope: __uv$config.prefix,
  });
</script>
<iframe src="/assets/nf/index.html" style="position: fixed; inset: 0px; outline: none; border: none; height: 100%; width: 100%; overflow: hidden;"></iframe>

`
  var nealFunHandler = document.createElement("script");
  nealFunHandler.src = "/assets/js/nealFun.js"
  function getRandomThreeDigitNumber() {
    return Math.floor(Math.random() * 900) + 100;
  }

  function getRandomAlphanumericString(length) {
    const characters = 'abcdefghijklmnopqrstuvw0123456789012345';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  var randomAlphanumericString = getRandomAlphanumericString(15);
  var url = '/temp?draft=' + randomAlphanumericString;
  var title = 'Google Docs';

  history.pushState({}, title, url);
  */
}

function gemini() {
  openAg('https://gemini.google.com', "Gemini");
}

function chess() {
  openAg('https://chess.com', "Chess");
}

function discord() {
  openAg('https://discord.com', "Discord");
}

function github() {
  openAg('https://github.com', "Github");
}

function google() {
  openAg('https://google.com', "Google");
}

function ng() {
  openAg('https://nowgg.me', "Now.GG");
}

function pin() {
  openAg('https://pinterest.com', "Pinterest");
}

function reddit() {
  openAg('https://reddit.com', "Reddit");
}

function spotify() {
  openAg('https://spotify.com', "Spotify");
}

function tt() {
  openAg('https://tiktok.com', "TikTok");
}

function twitter() {
  openAg('https://twitter.com', "Twitter");
}

function twitch() {
  openAg('https://twitch.tv', "Twitch");
}

function yt() {
  openAg('https://youtube.com', "YouTube");
}

function y8() {
  openAg('https://y8.com', "Y8");
}

function vscode() {
  openAg('https://vscode.dev', "VSCode");
}

function sFlix() {
  openAg('https://sflix.se', "sFlix");
}

function netflix() {
  openAg('https://netflix.com', "Netflix");
}

function symbolab() {
  openAg('https://www.symbolab.com', "Symbolab");
}

/*games*/
function onevone() {
  openAg('https://1v1.lol', "1v1");
}

function basketBros() {
  openAg('https://derpman.codeberg.page/echo/@main/basketbros-io/', "BasketBros");
}

function bitlife() {
  openAg('https://derpman.codeberg.page/echo/@main/bitlife/index.html', "Bitlife");
}

function brebound() {
  openAg('https://trinculo54.github.io/Boxel-rebound-hope/Newer/index.html', "BoxelRebound");
}

function cmg() {
  openAg('https://coolmathgames.com', "CoolMath");
}

function crazygms() {
  openAg('https://crazygames.com', "CrazyGames");
}

function geforce() {
  openAg('https://play.geforcenow.com', "GeForceNOW");
}

function holeio() {
  openAg('https://hole-io.com', "HoleIO");
}

function jstris() {
  openAg('https://jstris.jezevec10.com/', "JSTris");
}

function twoZeroFourEight() {
  openAg('https://derpmandev.github.io/unblocked-games/2048', "2048");
}

function p2048() {
  openAg('https://filipekiss.github.io/2048', "Poke2048");
}

function rbx() {
  alert(`Warning: In order to access the site, you will have to bypass their proxy detection. You can do this by continuously refreshing the page until it loads. (Don't reload too quickly)\n\nThis can take from 1-10 tries to 30-50 tries.`);
  openAg('https://now.derpman.lol', "Roblox");
}

function slope() {
  openAg('https://derpmandev.github.io/unblocked-games/slope', "Slope");
}

function subway() {
  openAg('https://derpman.codeberg.page/echo/@main/subway-surfers/index.html', "Subway Surfers");
}

function territorial() {
  openAg('https://territorial.io', "Territorial");
}

function florr() {
  openAg('https://florr.io' `Florrio`);
}

function cookieClicker() {
  openAg('https://orteil.dashnet.org/cookieclicker', "CookieClicker");
}

function rBowl() {
  document.title = 'Doge | V4';
  var cloakcheckScript = document.createElement("script");
  cloakcheckScript.src = "/assets/js/cloak.js";
  document.head.appendChild(cloakcheckScript);

  var functionsScript = document.createElement("script");
  functionsScript.src = "/assets/js/functions.js";
  document.head.appendChild(functionsScript);

  document.body.innerHTML = `
  <script src="/assets/js/index.js"></script>
  <script src="/uv/uv.bundle.js"></script>
  <script src="/uv/uv.bundle.js"></script>
  <script src="/uv/uv.config.js"></script>
  <script src="/assets/js/ag.js"></script>
  <script>
    window.navigator.serviceWorker
      .register("/sw.js", {
        scope: __uv$config.prefix,
      });
  </script>
  <iframe src="/assets/rb/index.html" style="position: fixed; inset: 0px; outline: none; border: none; height: 100%; width: 100%; overflow: hidden;"></iframe>
`;

  function getRandomThreeDigitNumber() {
    return Math.floor(Math.random() * 900) + 100;
  }

  function getRandomAlphanumericString(length) {
    const characters = 'abcdefghijklmnopqrstuvw0123456789012345';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  var randomAlphanumericString = getRandomAlphanumericString(15);

  var url = '/temp?draft=' + randomAlphanumericString;
  var title = 'Google Docs';

  history.pushState({}, title, url);
}

function krunker() {
  openAg('https://krunker.io');
}

function paperIo() {
  openAg('https://paper-io.com');
}

function run3() {
  openAg('https://bonbang.github.io/store99/run-3');
}

function eaglerCraft18() {
  openAg('https://derpmandev.github.io/unblocked-games/eaglercraft-1-8');
}

function eaglerCraft15() {
  openAg('https://derpmandev.github.io/unblocked-games/eaglercraft-1-5');
}

function monkeyMart() {
  openAg('https://www.getgames.io/games/gm/MonkeyMart/index.html');
}

function idleBreakout() {
  openAg('https://html-classic.itch.zone/html/9150519/index.html');
}

function motoX3M() {
  openAg('https://www.coolmathgames.com/0-moto-x3m/play');
}

function basketRandom() {
  openAg('https://files.twoplayergames.org/files/games/other/Basket_Random/index.html');
}

function suikaWatermelon() {
  openAg('https://watermelongame.com');
}

function timeShooter3() {
  openAg('https://www.twoplayergames.org/embed/time-shooter-2');
}

function thereIsNoGame() {
  openAg('https://23azostore.github.io/s/there-is-no-game/');
}

function ovo() {
  openAg('https://ovo.onrender.com/versions/1.4.4b/index.html');
}

function awesomeTanksTwo() {
  openAg('https://just-fall.github.io/j4/awesome-tanks-2/');
}

function templeRun() {
  openAg('https://burgerbounty.github.io/s8/temple-run-2/');
}

function driveMad() {
  openAg('https://drivemad.me/iframe/index.html');
}

function stickManHook() {
  openAg('https://stickman-hook.io/iframe/index.html');
}

function kickTheBuddy() {
  openAg('https://html5.gamedistribution.com/rvvASMiM/09399bfcb6e8462b873a6154b506ea99/index.html?gdpr-targeting=1&gd_sdk_referrer_url=https%3A%2F%2Fwww.silvergames.com%2Fen%2Fsuper-buddy-kick&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL3d3dy5zaWx2ZXJnYW1lcy5jb20vZW4vc3VwZXItYnVkZHkta2ljayIsInBhcmVudERvbWFpbiI6InNpbHZlcmdhbWVzLmNvbSIsInRvcERvbWFpbiI6InNpbHZlcmdhbWVzLmNvbSIsImhhc0ltcHJlc3Npb24iOmZhbHNlLCJsb2FkZXJFbmFibGVkIjp0cnVlLCJob3N0IjoiaHRtbDUuZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ2ZXJzaW9uIjoiMS41LjE3In0%253D')
}

function driftHunters() {
  openAg('https://webglmath.github.io/drift-hunters/index.html');
}

function fBwG1() {
  openAg('https://ubg100.github.io/games/fbwg1/index.html');
}

function vex8() {
  openAg('https://html5.gamedistribution.com/rvvASMiM/949009d40a2846f89f887de2285d6c28/index.html');
}

function tallManRun() {
  openAg('https://html5.gamedistribution.com/rvvASMiM/7980c23fbbae4af6851e01052fce3cce/index.html');
}

function crowdRun3d() {
  openAg('https://games.cdn.famobi.com/html5games/c/crowd-run-3d/v040/?fg_domain=play.famobi.com&fg_aid=A-SILVERGAMES&fg_uid=28ab613b-9f40-4ab7-8f09-aa19f32e3660&fg_pid=8a24e5f2-94a8-4593-b4e5-81cc68f524c8&fg_beat=093&original_ref=https%3A%2F%2Fwww.silvergames.com%2F');
}

function dogeMiner2() {
  openAg('https://dogeminer2.com');
}