// ==UserScript==
// @name         General
// @namespace    http://tampermonkey.net/
// @version      2024-07-03
// @description  meck lyf easier
// @author       You
// @match        https://*.gladiatus.gameforge.com/game/index.php?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function disableMouseOverMenu() {
        document.querySelectorAll(".menutab_city").forEach(menutab => { menutab.onmouseover = null });
        document.querySelectorAll(".menutab_country").forEach(menutab => { menutab.onmouseover = null });
    }

    function paintAuctionStatus(auction) {
        ["very long", "long"].some(duration => auction.textContent.toLowerCase().contains(duration)) ? auction.style.backgroundColor = "red" : null;
        ["middle"].some(duration => auction.textContent.toLowerCase().contains(duration)) ? auction.style.backgroundColor = "orange" : null;
        ["short"].some(duration => auction.textContent.toLowerCase().contains(duration)) ? auction.style.backgroundColor = "yellow" : null;
        ["very short"].some(duration => auction.textContent.toLowerCase().contains(duration)) ? auction.style.backgroundColor = "green" : null;
    }

    setTimeout(() => {
        setInterval(() => {
            const gladiator = document.querySelector("#auction_status_gladiator");
            const mercenary = document.querySelector("#auction_status_mercenary");

            gladiator.style.color = "black";
            gladiator.style.textShadow = "none";

            mercenary.style.color = "black";
            mercenary.style.textShadow = "none";

            paintAuctionStatus(gladiator);
            paintAuctionStatus(mercenary);

            document.querySelectorAll("#chatFulldiv").forEach(chat => { chat.remove(); });
            disableMouseOverMenu();

                // noBids ? bidBox.style.backgroundColor = "lightgrey" : null;
                // unknownBidder ? bidBox.style.backgroundColor = "#FFCCCB" : null;
                // friendlyBidder || myBidNoRefresh ? bidBox.style.backgroundColor = "lightgreen" : null;
        }, 500);
    }, 500);
})();