/*
Made by @xderpman
If you reuse this code, provide proper credits or keep this comment.
*/

var agFrame = document.querySelector('#siteurl').src;
var ngUrl = 'https://' + window.location.hostname + '/service/hvtrs8%2F-nmw%2Cge%2Fkfpaoe-slirpgt%3Darp%5Dpig%3Fcmm%2Crmbnoz.alkelt%24pcrvngr%3Fgcmgnmrc';

if (agFrame === ngUrl) {
    function fixNowGGScript() {
        var iframe = top.document.getElementById('siteurl');
        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        var roblox = innerDoc.getElementById('js-game-video');
        var controlBar = innerDoc.getElementById('ng-control-bar');
        var headers = innerDoc.querySelectorAll('header');

        try {
            // Set the marginTop of roblox to be the same as the height of controlBar
            var controlBarHeight = controlBar.offsetHeight || controlBar.clientHeight;
            roblox.style.top = null;
            roblox.style.marginTop = '110%'
            controlBar.style.top = '91%';
            headers.forEach(function(header) {
                header.style.display = 'none';
            });
            console.log('Successfully injected Now.GG Script.');
        } catch (err) {
            console.error('Now.GG script injection failed.');
        }
    }

    setInterval(fixNowGGScript, 5000);
}