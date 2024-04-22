function openAg(url, ag) {
  localStorage.setItem("currentAg", ag)
  
  agU = Ultraviolet.codec.xor.encode(url);
  localStorage.setItem('agUrl', agU);
  location.href = '/lessons';
}

/*apps*/
function gpt() {
  openAg('https://ub7.org');
}

function nf() {
  alert('This app is still in development.\nCheck discord.gg/unblocking for details.');
}

function gemini() {
  openAg('https://gemini.google.com');
}

function chess() {
  openAg('https://chess.com');
}

function discord() {
  openAg('https://discord.com');
}

function github() {
  openAg('https://github.com');
}

function google() {
  openAg('https://google.com');
}

function ng() {
  openAg('https://nowgg.me');
}

function pin() {
  openAg('https://pinterest.com');
}

function reddit() {
  openAg('https://reddit.com');
}

function spotify() {
  openAg('https://spotify.com');
}

function tt() {
  openAg('https://tiktok.com');
}

function twitter() {
  openAg('https://twitter.com');
}

function twitch() {
  openAg('https://twitch.tv');
}

function yt() {
  openAg('https://youtube.com');
}

function y8() {
  openAg('https://y8.com');
}

function vscode() {
  openAg('https://vscode.dev');
}

function sFlix() {
  openAg('https://sflix.se');
}

function netflix() {
  openAg('https://netflix.com');
}

function symbolab() {
  openAg('https://www.symbolab.com');
}

/*games*/
function onevone() {
  openAg('https://1v1.lol');
}

function basketBros() {
  openAg('https://basketbros.io');
}

function bitlife() {
  openAg('https://derpman.codeberg.page/echo/@main/bitlife/index.html');
}

function brebound() {
  openAg('https://trinculo54.github.io/Boxel-rebound-hope/Newer/index.html');
}

function cmg() {
  openAg('https://coolmathgames.com', "CoolMath");
}

function crazygms() {
  openAg('https://crazygames.com');
}

function geforce() {
  openAg('https://play.geforcenow.com');
}

function holeio() {
  openAg('https://hole-io.com');
}

function jstris() {
  openAg('https://jstris.jezevec10.com');
}

function twoZeroFourEight() {
  openAg('https://derpmandev.github.io/unblocked-games/2048');
}

function p2048() {
  openAg('https://filipekiss.github.io/2048');
}

function rbx() {
  alert(`Note: Roblox should be working now, but if it still gives you an VPN/Proxy detection message, refresh it.`);
  openAg('https://now.derpman.lol');
}

function slope() {
  openAg('https://derpmandev.github.io/unblocked-games/slope');
}

function subway() {
  openAg('https://derpman.codeberg.page/echo/@main/subway-surfers/index.html');
}

function territorial() {
  openAg('https://territorial.io');
}

function florr() {
  openAg('https://florr.io');
}

function cookieClicker() {
  openAg('https://orteil.dashnet.org/cookieclicker');
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

function volleyRandom() {
  openAg('https://files.twoplayergames.org/files/games/o1/Volley_random/index.html');
}

function suikaWatermelon() {
  openAg('https://watermelongame.com');
}

function timeShooter3() {
  openAg('https://html5.gamedistribution.com/rvvASMiM/6493b872f0564380a7adad671d1e0a57/index.html');
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

function worldsHardestGm() {
  openAg('https://assets.surfdoge.pro/assets/worldshardestgm.html');
}