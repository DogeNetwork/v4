let details = navigator.userAgent;
let regexp = /android|iphone|kindle|ipad/i;
let isMobileDevice = regexp.test(details);
if (isMobileDevice) {
 window.location.href = '/mobile.html';
} else {
    console.log('Desktop Detected.');
}
