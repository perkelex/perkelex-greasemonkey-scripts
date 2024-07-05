// ==UserScript==
// @name         Auction
// @namespace    http://tampermonkey.net/
// @version      2024-07-03
// @description  meck lyf easier
// @author       You
// @match        https://*.gladiatus.gameforge.com/game/index.php?mod=auction*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(() => {
        document.querySelector("p").forEach(paragraph => {
            paragraph.textContent.contains("If someone overbids you you do") ? paragraph.style.display = "none" : null;
        });

        setInterval(() => {
            const auctionTable = document.querySelector("#auction_table");
            auctionTable.querySelectorAll("div.auction_bid_div").forEach(bidItem => {
                const noBids = bidItem.firstElementChild.innerText.contains("No bids") ? true : false;
                const unknownBidder = bidItem.querySelector("div span").textContent.contains("Bids already placed") ? true : false;
                const friendlyBidder = bidItem.querySelector("div a span");

                const bidBox = bidItem.closest("div.section-header")

                noBids ? bidBox.style.backgroundColor = "lightgrey" : null;
                unknownBidder ? bidBox.style.backgroundColor = "#FFCCCB" : null;
                friendlyBidder ? bidBox.style.backgroundColor = "lightgreen" : null;
            });
        }, 1000);
    }, 250);
})();