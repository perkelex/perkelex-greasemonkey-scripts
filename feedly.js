// ==UserScript==
// @name     Feedly remove unwanted garbage
// @version  1
// @grant    none
// @match    https://feedly.com/*
// ==/UserScript==


// feedly remove unwanted articles

const unwantedNews = [
/* tenis */ "irina begu", "begu", "halep", "ema raducanu", "ema răducanu", "emma răducanu", "ana bogdan", "cupa davis", "serena williams", "emmei raducanu", "Sorana Cîrstea",
/* inot */ "david popovici",
/* regina */ "Elisabeta a II-a", "elisabetei a II-a", "reginei elisabeta", "regina elisabeta",
/* familia regala */ "charles al III-lea", "regele charles", "regelui charles",
/* better tenis */ "magnus carlsen", "tenis", "nicholas david ionel", "novak djokovic", "djokovic", "roman safiullin", "safiullin", "marin cilic", "cilic",
/* competitii tenis */ "Alpe Adria Cup", "Transylvanian Open","WTA", "Billie Jean King Cup", "sibiu open", "ATP", "Australian Open", "billie jean king",
/* cretinisme */ "Ce facem astăzi", "horoscop", "zodie", "zodia", "zodii",
"Alternosfera",
"baschet",
"handbal", "csm bucuresti",
"fotbal feminin", "fotbalistele", "fetele de la politehnica",
"premiile oscar", "nominalizari oscar",
"Survivor România",
"(P)",
"motogp", "f1"
];

// console.log("starting");
// start parsing after some time.
setTimeout(() => {
	// parse and update periodically
	setInterval(() => {
		document.querySelectorAll("article").forEach(
			(article) => {
				unwantedNews.forEach(keyword => {
					article.querySelector("div.EntryTitle").textContent.toLowerCase().includes(keyword.toLowerCase()) ? article.remove() : null;
					article.querySelector("div.EntrySummary").textContent.toLowerCase().includes(keyword.toLowerCase()) ? article.remove() : null;
				});
			}
		);
	}, 3000);
}, 5000);