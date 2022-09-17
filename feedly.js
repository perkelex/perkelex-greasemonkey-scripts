// feedly remove unwanted articles

// articles containing entries in this array will be removed from the page.
// case insensitive.
// special characters need to match.
const unwantedNews = ["irina begu", "begu", "halep", "ema raducanu", "ema răducanu", "cupa davis"];
let beforePurge = 0;
let afterPurge = 0;

// allow some time for the site content to load, otherwise the script is for nothing
setTimeout(() => {
	const leftNavList = document.querySelector("nav.LeftnavList div.m-t-2");
	const articles = document.querySelectorAll("article");
	beforePurge = articles.length;

	articles.forEach(
		(article) => {
			unwantedNews.forEach(keyword =>
				article.querySelector(".content a").textContent.toLowerCase().includes(keyword) ? article.remove() : null);
		}
	);

	afterPurge = document.querySelectorAll("article").length;

	console.log("Before purge:", beforePurge);
	console.log("After purge:", afterPurge);

	const beforePurgeDiv = document.createElement("div");
	const afterPurgediv = document.createElement("div");

	beforePurgeDiv.classList.add("LeftnavListRow");
	afterPurgediv.classList.add("LeftnavListRow");

	beforePurgeDiv.append(document.createTextNode(`Before purge: ${beforePurge}`));
	afterPurgediv.append(document.createTextNode(`After purge: ${afterPurge}(${afterPurge - beforePurge})`));

	leftNavList.insertBefore(afterPurgediv, leftNavList.firstElementChild);
	leftNavList.insertBefore(beforePurgeDiv, leftNavList.firstElementChild);

}, 5000);
