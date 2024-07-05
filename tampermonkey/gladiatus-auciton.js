// ==UserScript==
// @name         Gladiatus Auction Painter
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
       const auctionTable = document.querySelector("#auction_table");
       auctionTable.querySelectorAll("div.auction_bid_div").forEach(bidItem => {
            const noBids = bidItem.firstElementChild.innerText.contains("No bids") ? true : false;
            const unknownBidder = bidItem.querySelector("div span").textContent.contains("Bids already placed") ? true : false;
            const friendlyBidder = bidItem.querySelector("div a span");

            noBids ? bidItem.closest("div.section-header").style.backgroundColor = "lightgrey" : null;
            unknownBidder ? bidItem.closest("div.section-header").style.backgroundColor = "#FFCCCB" : null;
            friendlyBidder ? bidItem.closest("div.section-header").style.backgroundColor = "lightgreen" : null;

       });
    }, 250);
})();