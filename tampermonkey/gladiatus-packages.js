// ==UserScript==
// @name         Gladiatus Packages counter
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
        const packages = document.querySelectorAll(".packageItem");
        const length = packages.length;
        const contentHeader = [...document.querySelectorAll("h2.section-header")].filter(node => node.innerText.contains("Content")).forEach(node => node.innerText = `Content: ${length} packages`);
        console.log(contentHeader);
        // contentHeader.innerHTML = "Content: " + length + " packages";
    }, 250);
})();