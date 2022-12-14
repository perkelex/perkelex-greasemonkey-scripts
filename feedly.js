// ==UserScript==
// @name     Feedly remove unwanted garbage
// @version  1
// @grant    none
// @match    https://feedly.com/*
// ==/UserScript==


// feedly remove unwanted articles

const unwantedNews = [
"irina begu", "begu", "halep", "ema raducanu", "ema răducanu", "emma răducanu",, "ana bogdan", "cupa davis", "serena williams", "Billie Jean King Cup",
"david popovici",
"Elisabeta a II-a", "elisabetei a II-a", "reginei elisabeta", "regina elisabeta",
"charles al III-lea", "regele charles", "regelui charles",
"magnus carlsen", "tenis", "Transylvanian Open", "Transylvania Open", "WTA",
"nicholas david ionel", "sibiu open",
"ATP", "novak djokovic", "djokovic", "roman safiullin", "safiullin", "marin cilic", "cilic",
"Ce facem astăzi",
"Alternosfera",
"baschet",
"handbal",
"horoscop"
];

// start parsing after some time.
setTimeout(() => {
	// parse and update periodically
	setInterval(() => {
		document.querySelectorAll("article").forEach(
			(article) => {
				unwantedNews.forEach(keyword =>
					article.querySelector(".content a").textContent.toLowerCase().includes(keyword.toLowerCase()) ? article.remove() : null);
			}
		);
	}, 3000);
}, 5000);