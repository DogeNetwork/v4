function openAg(url, ag) {
  localStorage.setItem("currentAg", ag)
  location.href = '/edu?login=' + Ultraviolet.codec.base64.encode(url);
}

/*apps*/
function gpt() {
  openAg('https://julius.ai/ai-chatbot');
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
  openAg('https://accounts.spotify.com/login');
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
  openAg('https://vidstream.to');
}

function netflix() {
  openAg('https://netflix.com');
}

function nineAnim() {
  openAg('https://9animetv.to/');
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
  openAg('https://coolmathgames.com');
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
  alert(`This app might not work as expected. Refresh the page if it detects a VPN.`);
  openAg('https://educationbluesky.com/apps/roblox-corporation/5349/roblox.html');
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
  openAg('https://www.onlinegames.io/games/2024/more/idle-breakout/index.html');
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

function rocketRoyale() {
  openAg('https://rocketbotroyale.winterpixel.io/');
}

function thereIsNoGame() {
  openAg('https://23azostore.github.io/s/there-is-no-game/');
}

function ovo() {
  openAg('https://ovo.onrender.com/versions/1.4.4b/index.html');
}

function awesomeTanksTwo() {
  openAg('https://derpman.codeberg.page/awesometanks2/');
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

function stackBounce() {
  openAg('https://storage.googleapis.com/bento-developer-games/stackbounce/gameCode/index.html');
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

function vex3() {
  openAg('https://derpman.codeberg.page/vex3');
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

function 99balls3d() {
  openAg('https://gamesnacks.com/games/99balls3d');
}

function adventurecapitalist() {
  openAg('https://than1089.github.io/adventure-capitalist/');
}

function aquapark.io() {
  openAg('https://html5.gamedistribution.com/rvvASMiM/ce67b95f0db44d66b8b0dc48ade7ce1a/index.html');
}

function archeryworldtour() {
  openAg('https://gamesnacks.com/embed/games/archery');
}

function diep.io() {
  openAg('https://diep.io/');
}

function ashbelt() {
  openAg('https://ultimatemen.github.io/games/ashbelt/index.html');
}

function asphaltretro() {
  openAg('https://html5.gamedistribution.com/rvvASMiM/2c122cee7ef04222a962449e32a34e98/?gd_sdk_referrer_url=https://gamedistribution.com/games/asphalt-retro');
}


function basketbros() {
  openAg('https:/cdn/3kh0/basketbros-io/index.html');
}

function basketrandom() {
  openAg('https://html5.gamedistribution.com/rvvASMiM/bf1268dccb5d43e7970bb3edaa54afc8/?gd_sdk_referrer_url=https://gamedistribution.com/games/basket-random');
}

function basketballstars() {
  openAg('https://html5.gamedistribution.com/rvvASMiM/69d78d071f704fa183d75b4114ae40ec/?gd_sdk_referrer_url=https://gamedistribution.com/games/basketball-stars');
}

function bitlife() {
  openAg('https://html5.gamedistribution.com/rvvASMiM/rvvASMiM/2e44fb60fd3f4606b1b06c17a2b9d60d/index.html');
}


function bonk.io() {
  openAg('https://bonk.io');
}

function bounceback() {
  openAg('https://skoolcdn.github.io/gfiles/gfiles/html5/bounceback');
}

function buildnow.gg() {
  openAg('https://games.crazygames.com/en_US/buildnow-gg/index.html');
}

function candyjump() {
  openAg('https://candyjump.games235.com/');
}

function clustertruck() {
  openAg('https://www.snake-games.io/localgames/cluster-rush/');
}

function codmobile() {
  openAg('https://now.gg/play/activision-publishing-inc/7935/call-of-duty.html');
}

function counterstrike() {
  openAg('https://play-cs.com');
}

function cubeform() {
  openAg('https://www.mathplayground.com/cubeform/index.html');
}

function defly.io() {
  openAg('https://defly.io/');
}

function drawthehill() {
  openAg('https://www.mathplayground.com/draw-the-hill/index.html');
}

function driftboss() {
  openAg('https://www.mathplayground.com/drift-boss-v3/index.html');
}

function drifthunters() {
  openAg('https://webglmath.github.io/drift-hunters/');
}

function fireboyandwatergirl() {
  openAg('https://html5.gamedistribution.com/rvvASMiM/a55c9cc9c21e4fc683c8c6857f3d0c75/?gd_sdk_referrer_url=https://gamedistribution.com/games/fireboy-and-watergirl-1-forest-temple');
}

function genshinimpact() {
  openAg('https://nowgg.nl/play/cognosphere-pte-ltd-/1773/genshin-impact.html');
}

function gunspin() {
  openAg('https://ubg365.github.io/gunspin/play.html');
}

function happywheels() {
  openAg('https://games-online.io/game/HappyWheels');
}

function janissarybattles() {
  openAg('https://html5.gamedistribution.com/rvvASMiM/8b55f4f729be4e70b6155f27d2e04690/?gd_sdk_referrer_url=https://gamedistribution.com/games/janissary-battles');
}

function kirka.io() {
  openAg('https://kirka.io/');
}

function linerider() {
  openAg('https://www.linerider.com/');
}

function masterarcher() {
  openAg('https://playcanv.as/p/JERg21J8');
}

function melonsandbox() {
  openAg('https://nowgg.nl/play/playducky/7199/melon-sandbox.html');
}

function minecraft1.3() {
  openAg('https://rawcdn.githack.com/CybriaTech/Opium/main/games/eagler-1.3/index.html');
}

function minecraft1.5.2() {
  openAg('https://rawcdn.githack.com/CybriaTech/Opium/main/games/eagler-1.5.2/index.html');
}

function minecraft1.8() {
  openAg('https://rawcdn.githack.com/CybriaTech/Opium/main/games/eagler-1.8/index.html');
}

function monstertruckstunts() {
  openAg('https://files.twoplayergames.org/files/games/other/Monster_Truck_Port_Stunt/index.html');
}

function papasfreezeria() {
  openAg('https://en.gameslol.net/data/awayjs/papa/freezeria.html');
}

function papastacomia() {
  openAg('https://www.numuki.com/gameframe/papa-s-taco-mia');
}

function penaltykicks() {
  openAg('https://www.mathplayground.com/penalty-kicks/index.html');
}

function pizzatower() {
  openAg('https://kdata1.com/2021/03/3527391/2.1/');
}

function polkadotgame() {
  openAg('https://www.polkadotgame.com/game.html');
}

function risehigher() {
  openAg('https://www.mathplayground.com/rise-higher/index.html');
}

function robostorm() {
  openAg('https://robostorm.io');
}

function rocketleague2d() {
  openAg('https://v6p9d9t4.ssl.hwcdn.net/html/3325334/index.html');
}

function rotate() {
  openAg('https://html5.gamedistribution.com/rvvASMiM/0faa4468d18e4f7aa2e0161b4fefa193/?gd_sdk_referrer_url=https://gamedistribution.com/games/rotate');
}

function smashkarts() {
  openAg('https://smartcart1.github.io/s/smash-karts/');
}

function snowrider3d() {
  openAg('https://23azostore.github.io/s8/snow-rider-3d/');
}

function soccerrandom() {
  openAg('https://html5.gamedistribution.com/rvvASMiM/308d826f20034d7b972f25258c8d0a44/?gd_sdk_referrer_url=https://gamedistribution.com/games/soccer-random');
}

function stickmanarcherofight() {
  openAg('https://html5.gamedistribution.com/rvvASMiM/3f4c166817ad4fd4b5b05d9adba22fcd/?gd_sdk_referrer_url=https://www.gamegab.com/play/16561/Stickman-Archero-Fight/');
}

function stumbleguys() {
  openAg('https://now.gg/iframe/snippet?app_pkg=com.kitkagames.fallbuddies&partner=skool');
}

function supermario64() {
  openAg('https://ultimatemen.github.io/games/superm64/index.html');
}

function tunnelrush() {
  openAg('https://tunnelrush.app/iframe/index.html');
}

function vex3() {
  openAg('https://html5.gamedistribution.com/rvvASMiM/762c932b4db74c6da0c1d101b2da8be6/?gd_sdk_referrer_url=https://gamedistribution.com/games/vex-3');
}

function vex4() {
  openAg('https://html5.gamedistribution.com/rvvASMiM/80e6a5ae477f4d4fbcd1ea293d10087d/?gd_sdk_referrer_url=https://gamedistribution.com/games/vex-4');
}

function vex5() {
  openAg('https://html5.gamedistribution.com/rvvASMiM/f120262ab72743039fbce88c1f370df8/?gd_sdk_referrer_url=https://gamedistribution.com/games/vex-5');
}

function vex6() {
  openAg('https://html5.gamedistribution.com/rvvASMiM/4925e12574364121a48c61c35f649c36/?gd_sdk_referrer_url=https://gamedistribution.com/games/vex-6');
}

function vex7() {
  openAg('https://html5.gamedistribution.com/rvvASMiM/rvvASMiM/0c454c9562d249d28ba3a2b50564042c/index.html?gd_sdk_referrer_url=https%3A%2F%2Ftr.y8.com%2Fgames%2Fvex_7&key=y8&value=default&gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL3RyLnk4LmNvbS9nYW1lcy92ZXhfNyIsInBhcmVudERvbWFpbiI6InRyLnk4LmNvbSIsInRvcERvbWFpbiI6InRyLnk4LmNvbSIsImhhc0ltcHJlc3Npb24iOmZhbHNlLCJsb2FkZXJFbmFibGVkIjp0cnVlLCJob3N0IjoiaHRtbDUuZ2FtZWRpc3RyaWJ1dGlvbi5jb20iLCJ2ZXJzaW9uIjoiMS41LjE2In0%253D');
}

function volleyrandom() {
  openAg('https://html5.gamedistribution.com/rvvASMiM/b6f03bdc505e4d78a17379a5a83e206b/?gd_sdk_referrer_url=https://gamedistribution.com/games/volley-random');
}

function funnyshooter2() {
  openAg('https://rawcdn.githack.com/nightrose-labs/quartz/master/1/6af3cc65-32f9-4f3d-a66c-6c8882a7c5df/index.html');
}

function taming.io() {
  openAg('https://taming.io');
}

function slither.io() {
  openAg('https://slither.io');
}

function evowars.io() {
  openAg('https://evowars.io');
}

function deepestsword() {
  openAg('https://html-classic.itch.zone/html/4017918/index.html');
}

function tunnelrushmania() {
  openAg('https://html5.gamemonetize.co/2fp4sd31llh6u6vjxe1wxbx8meapsgop/');
}

function baconmaydie() {
  openAg('https://game.enjoy4fun.com/baconmaydie/v2/index.html');
}

function eggycar() {
  openAg('https://webglmath.github.io/eggy-car/');
}

function cookieclicker() {
  openAg('https://orteil.dashnet.org/cookieclicker/');
}

function littlealchemy() {
  openAg('https://littlealchemy.com');
}

function littlealchemy2() {
  openAg('https://littlealchemy2.com');
}

function ovo2() {
  openAg('https://dthesle.github.io/OvO2/');
}

function ovodimensions() {
  openAg('https://www.miniplay.com/embed/ovo-dimensions');
}

function paper.io() {
  openAg('https://g-class.biz/lessons/1/');
}

function pool/billiardsclassic() {
  openAg('https://13582048327635951979.playables.usercontent.goog/v/assets/index.html');
}

function alienshooter() {
  openAg('https://16702553337040190672.playables.usercontent.goog/v/assets/index.html');
}

function amaze!() {
  openAg('https://580820627722902829.playables.usercontent.goog/v/assets/index.html');
}

function angrybirds:showdown() {
  openAg('https://6381249690777614785.playables.usercontent.goog/v/assets/index.html');
}

function basketballfrvr() {
  openAg('https://11024365036548115513.playables.usercontent.goog/v/assets/index.html');
}

function cannonballs3d() {
  openAg('https://14726002176993811037.playables.usercontent.goog/v/assets/index.html');
}

function radiusraid() {
  openAg('https://jackrugile.com/radius-raid/');
}

function thechromaincident() {
  openAg('https://js13kgames.com/games/the-chroma-incident/index.html');
}

function dinorun3d() {
  openAg('https://russell2259.github.io/dino3d/');
}

function burritobison:launchalibre() {
  openAg('https://rawcdn.githack.com/GameHub88/Yexex-Assets/main/bb/index.html');
}

function yohoho.io() {
  openAg('https://rawcdn.githack.com/GameHub88/Yexex-Assets/main/yohoho/index.html');
}

function jacksmith() {
  openAg('https://moonlight.silvereen.net/src/static/games/jacksmith/index.html');
}

function sansfightsimulator() {
  openAg('https://jcw87.github.io/c2-sans-fight/');
}

function slowroads() {
  openAg('https://slowroads.io');
}

function ducklife5() {
  openAg('https://rawcdn.githack.com/CybriaTech/Opium/main/games/duck-life-5/index.html');
}

function bloonstd4() {
  openAg('https://rawcdn.githack.com/CybriaTech/Opium/main/games/btd-4/index.html');
}

function bloonstd5() {
  openAg('https://rawcdn.githack.com/CybriaTech/Opium/main/games/btd-5/index.html');
}

function raftwars() {
  openAg('https://rawcdn.githack.com/CybriaTech/Opium/main/games/raft-wars/index.html');
}

function raftwars2() {
  openAg('https://rawcdn.githack.com/CybriaTech/Opium/main/games/raft-wars-2/index.html');
}

function run() {
  openAg('https://rawcdn.githack.com/CybriaTech/Opium/main/games/run/index.html');
}

function run2() {
  openAg('https://rawcdn.githack.com/CybriaTech/Opium/main/games/run2/index.html');
}

function subwaysurfers:singapore() {
  openAg('https://rawcdn.githack.com/CybriaTech/Opium/main/games/subway-surfers-singapore/index.html');
}

function polytrack() {
  openAg('https:/game.glimbo.xyz/polytrack');
}

