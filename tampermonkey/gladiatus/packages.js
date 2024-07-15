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
        // const element = document.querySelector(`#${elementID}`);
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

    function createGenericButton(content, type){
        const button = document.createElement("button");
        button.setAttribute("id", `${content.toLowerCase().replaceAll(" ", "-")}-${type.toLowerCase()}`);
        button.appendChild(document.createTextNode(`${content}`));
        button.className += "awesome-button";
        button.style.margin = "0rem 0.25rem";
        return button;
    }

    function createFilterCategory(title, children){
        const category = document.createElement("div");
        category.setAttribute("id", `filter-${title.toLowerCase()}-category`);
        category.style.display = "flex";
        category.style.flexDirection = "column";
        category.style.gap = "0.25rem";
        category.style.border = "1px solid black";
        category.style.borderRadius = "0.5rem";

        const categoryHeader = document.createElement("div");
        categoryHeader.appendChild(document.createTextNode(title));
        categoryHeader.style.fontWeight = "bold";
        categoryHeader.style.textDecoration = "underline";
        categoryHeader.style.margin = "0rem 0.25rem";

        category.appendChild(categoryHeader);

        for (const child of children){
            category.appendChild(child);
        }

        return category;
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
                const splitName = name.textContent.split(" ");
                name.textContent = `${splitName[0]} ${splitName[splitName.length-1]}`;

                const duration = rightPackageItemInfo.querySelector("span.ticker");

                sender.innerText.contains("Auction") ? pack.style.background = "rgba(0, 255, 0, 0.5)" : null;
                sender.innerText.contains("Smelter") ? pack.style.background = "rgba(255, 255, 0, 0.5)" : null;

                // ["lucius", "antonius"].some(prefix => name.innerText.toLowerCase().contains(prefix)) ? leftPackageItemInfo.style.background = "rgba(0, 0, 255, 0.5)" : null;
                parseInt(duration.dataset.tickerTimeLeft) < Constants.oneDayInMilliseconds ? duration.parentNode.style.background = "rgba(255, 0, 0, 0.5)" : null;
            });

            Array.from(document.querySelectorAll("h2.section-header")).filter(node => node.innerText.contains("Content")).forEach(node => {node.innerText = `Content: ${packs.length} packages`;});
        }, 1000);
    }, 250);
})();