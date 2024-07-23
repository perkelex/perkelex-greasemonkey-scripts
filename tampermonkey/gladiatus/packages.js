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

    class Constants {
        static oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    }

    function nameToID(name) {
        return name.toLowerCase().replaceAll(" ", "-");
    }

    function showHideElement(element) {
        element.style.display.contains("block") ? element.style.display = "none" : element.style.display = "block";
    }

    function createSectionHeader(title, action = null) {
        const sectionHeader = document.createElement("h2");
        sectionHeader.classList.add("section-header");
        sectionHeader.setAttribute("id", `${nameToID(title)}`);
        sectionHeader.style.cursor = "pointer";
        sectionHeader.style.userSelect = "none";
        sectionHeader.appendChild(document.createTextNode(title));
        if (action) sectionHeader.addEventListener("click", action);
        return sectionHeader;
    }

    function createSection(title) {
        const section = document.createElement("section");
        section.setAttribute("id", `${nameToID(title)}`);
        section.style.minHeight = "45px";
        section.style.display = "block";
        return section;
    }

    setTimeout(() => {
        // Misc
        document.querySelector("#hidePackges").style.display = "none";
        document.querySelector("section.nBot_packages").style.display = "none";

        // Init
        const packagesArticle = Array.from(document.querySelectorAll("article")).filter(article => !article.classList.length)[0];
        packagesArticle.style.margin = "0rem";

        const inventory = packagesArticle.children[0];

        // GCA Advanced Filters
        const gcaAdvancedFilters = document.querySelector("article.package-advance-filters");
        gcaAdvancedFilters.style.margin = "1rem 0rem";
        packagesArticle.insertBefore(gcaAdvancedFilters, inventory.nextSibling);
        gcaAdvancedFilters.querySelector("h2.section-header").addEventListener("click", (gcaAdvancedFilters) => {
            const section = gcaAdvancedFilters;
            section.style.display.contains("block") ? section.style.display = "none" : section.style.display = "block";
        });
        gcaAdvancedFilters.querySelector("div.active-filters").style.minHeight = "0rem";

        // Quick filters
        const quickFiltersSection = createSection("Quick Filters Section");
        const quickFiltersSectionHeader = createSectionHeader("Quick Filters", showHideElement.bind(this, quickFiltersSection));
        packagesArticle.insertBefore(quickFiltersSection, inventory.nextSibling);
        packagesArticle.insertBefore(quickFiltersSectionHeader, inventory.nextSibling);

        setInterval(() => {
            const packs = document.querySelectorAll(".packageItem");
            packs.forEach(pack => {
                const opacity = pack.style.opacity;

                pack.setAttribute("style", `margin: 0rem 0.5rem !important; opacity: ${opacity}`);

                const packInfo = pack.querySelector(".packageItemInfoColumn");
                const leftPackageItemInfo = packInfo.querySelector(".leftPackageItemInfo");
                const rightPackageItemInfo = packInfo.querySelector(".rightPackageItemInfo");

                const sender = leftPackageItemInfo.querySelector(".sender");
                const name = leftPackageItemInfo.querySelector("span");

                name.setAttribute("style", `color: ${name.style.color}; font-size: 1.25rem !important`);
                const splitName = name.innerText.split(" ");
                name.innerText = `${splitName[0]} ${splitName[splitName.length-1]}`;

                const duration = rightPackageItemInfo.querySelector("span.ticker");
                const level = rightPackageItemInfo.querySelector(":scope > span");

                sender.innerText.contains("Auction") ? pack.style.background = "rgba(0, 255, 0, 0.5)" : null;
                sender.innerText.contains("Smelter") ? pack.style.background = "rgba(255, 255, 0, 0.5)" : null;

                const itemOfInterestColor = "rgba(255, 165, 0, 0.5)";
                const itemsForSmeltColor = "rgba(128, 128, 128, 0.5)";

                if(location.hostname.contains("s69-en")){
                    [
                        /lucius/i, /fernabasts/i, /tantus/i, /sentarions/i, // Tincture of Staminga - Lucius
                        /manius/i, /gaius/i, /belisarius/i, /antonius/i, /titus/i, /quintus/i, /pontius/i, // Crystal - Antonius
                        /valerius/i, /mateus/i, /marcellus/i, /constantinus/i, /servius/i, /dexterus/i, /giganticus/i, // Amethyst - Antonius
                    ].some(prefix => name.innerText.match(prefix)) ? pack.style.background = itemsForSmeltColor : null;

                    [
                        /lucius/i, /antonius/i, /gaius/i
                    ].some(prefix => name.innerText.match(prefix)) ? pack.style.background = itemOfInterestColor : null;
                }
                else if (location.hostname.contains("s9-ee")){
                    [
                        /orleds/i, /Ashitills/i, /Táliths/i, /Adendathiels/i, // Flintstone - Táliths
                        /ichorus/i, /decimus/i, /jennifers/i, /trafans/i, // Sulphur - Ichorus
                        /harmony/i, /assassination/i, /conflict/i, /heaven/i, /solitude/i, /triviality/i, // suffixes of interest
                        // high lvl
                        /lucius/i, /fernabasts/i, /tantus/i, /sentarions/i, // Tincture of Staminga - Lucius
                        /manius/i, /gaius/i, /belisarius/i, /antonius/i, /titus/i, /quintus/i, /pontius/i, // Crystal - Antonius
                        /valerius/i, /mateus/i, /marcellus/i, /constantinus/i, /servius/i, /dexterus/i, /giganticus/i, // Amethyst - Antonius
                    ].some(prefix => name.innerText.match(prefix)) ? pack.style.background = itemsForSmeltColor : null;

                    [
                        /Táliths/i, /Kerrannas/i, /gaius/i
                    ].some(prefix => name.innerText.match(prefix)) ? pack.style.background = itemOfInterestColor : null;
                }


                parseInt(duration.dataset.tickerTimeLeft) < Constants.oneDayInMilliseconds ? duration.parentNode.style.background = "rgba(255, 0, 0, 0.5)" : null;
            });

            Array.from(document.querySelectorAll("h2.section-header")).filter(node => node.innerText.contains("Content")).forEach(node => {node.innerText = `Content: ${packs.length} packages`;});
        }, 1000);
    }, 250);
})();