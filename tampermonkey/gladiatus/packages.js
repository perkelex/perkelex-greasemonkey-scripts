// ==UserScript==
// @name         Packages
// @namespace    http://tampermonkey.net/
// @version      2024-07-03
// @description  meck lyf easier
// @author       You
// @match        https://*.gladiatus.gameforge.com/game/index.php?mod=packages*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(() => {
        [...document.querySelectorAll("h2.section-header")].filter(node => node.innerText.contains("Content")).forEach(node => {node.innerText = `Content: ${node.length} packages`;});

        setInterval(() => {
            document.querySelectorAll(".packageItem").forEach(pack => {
                const sender = pack.querySelector(".sender");
                sender.innerText.contains("Auction") ? pack.style.backgroundColor = "lightgreen" : null
                sender.innerText.contains("Smelter") ? pack.style.backgroundColor = "yellow" : null
            });
        }, 500);
    }, 250);
})();