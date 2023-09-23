let details = navigator.userAgent;
let regexp = /android|iphone|kindle|ipad/i;
let isMobileDevice = regexp.test(details);
if (isMobileDevice) {
 window.location.href = '/mobile.html';
} else {
    console.log('I love big tall guys twerking in the shower');
}
