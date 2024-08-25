window.onload = function() {
	let scope;
	const vercelCheck = localStorage.getItem('isVercel');
	const swAllowedHostnames = ["localhost", "127.0.0.1"];
	const wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
	const connection = new BareMux.BareMuxConnection("/baremux/worker.js");
	async function registerSW() {
		if (!navigator.serviceWorker) {
			if (location.protocol !== "https:" && !swAllowedHostnames.includes(location.hostname)) throw new Error("Service workers cannot be registered without https.");
			throw new Error("Your browser doesn't support service workers.");
		}
		await connection.setTransport("/epoxy/index.mjs", [{
			wisp: wispUrl
		}]);
		await window.navigator.serviceWorker.register("/sw.js", {
			scope: '/service/',
		});
		await window.navigator.serviceWorker.register("/oldsw.js", {
			scope: '/sv/',
		});
		async function fetchDomains() {
			const response = await fetch('/data/b-list.json');
			const data = await response.json();
			return data.domains;
		}

		function createDomainRegex(domains) {
			const escapedDomains = domains.map(domain => domain.replace(/\./g, '\\.'));
			return new RegExp(escapedDomains.join('|') + '(?=[/\\s]|$)', 'i');
		}
		const domains = await fetchDomains();
		const domainRegex = createDomainRegex(domains);
		const searchValue = Ultraviolet.codec.xor.decode(localStorage.getItem("encodedUrl"));
		if (vercelCheck !== 'true') {
			if (domainRegex.test(searchValue)) {
				scope = '/sv/';
			} else {
				scope = '/service/';
			}
		} else {
			scope = '/sv/';
		}
		let encodedUrl = localStorage.getItem("encodedUrl");
		encodedUrl = scope + encodedUrl;
		document.querySelector("#siteurl").src = encodedUrl;
	}
	/* CK */
	function rndAbcString(length) {
		const characters = "abcdefghijklmnopqrstuvw0123456789012345";
		let result = "";
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	}
	var randomAlphanumericString = rndAbcString(7);
	var url = "/portal?auth=" + randomAlphanumericString;
	var title = "Google Docs";
	history.pushState({}, title, url);
	registerSW();
	live();
};