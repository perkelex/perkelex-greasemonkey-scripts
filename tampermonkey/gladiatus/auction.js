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
    // 'use strict';

    // Misc
    function print() {
        console.log(arguments);
    }

    function getQueryParameterValue(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const gcaSortMapping = {
        "Damage": "damage",
        "Armor": "armour",
        "Strength": "strength",
        "Agility": "agility",
        "Dexterity": "dexterity",
        "Constitution": "constitution",
        "Intelligence": "intelligence",
        "Charisma": "charisma",
        "Healing": "healing",
        "Life": "life",
        "Threat": "threat",
        "Level": "level",
        "Health": "10410197108116104",
        "Hardening": "104971141001011101051101034511897108117101",
        "Using": "11711510511010358",
        "Critical attack": "991141051161059997108459711611697991074511897108117101",
        "From intelligence": "102114111109451051101161011081081051031011109910158",
        "Block": "98108111991074511897108117101",
    }

    class State{
        static currentFilter = null;

        static isFilteredBy(filter) {
            return this.currentFilter === filter;
        }

        static setFilter(filter) {
            this.currentFilter = filter;
        }

        static resetFilter() {
            this.currentFilter = null
        }
    }

    // Utils
    function nameToID(name) {
        return name.toLowerCase().replaceAll(" ", "-");
    }


    // Functors
    function resetAuctionItemsDisplay() {
        document.querySelectorAll("#auction_table td").forEach(td => {td.style.display = "table-cell"});
        document.querySelectorAll("#auction_table tr").forEach(td => {td.style.display = "table-row"});
    }

    function filterContent(content) {
        resetAuctionItemsDisplay();

        if (State.isFilteredBy(content)) {
            State.resetFilter();
            return
        }

        State.setFilter(content);

        const auctionTable = document.querySelector("#auction_table");

        // hide unwanted table cells
        auctionTable.querySelectorAll("td").forEach(td => {
            const form = td.querySelector("form");
            if (form && !form.dataset.item_name.toLowerCase().contains(content.toLowerCase())) {
                td.style.display = "none";
            }
        });

        // hide empty table rows
        auctionTable.querySelectorAll("tr").forEach(tr => {
            if ([...tr.querySelectorAll("td")].every(td => td.style.display.contains("none"))) {
                tr.style.display = "none";
            }
        });
    }

    function multiFilterContent() {
        resetAuctionItemsDisplay();

        if (State.isFilteredBy(Array.from(arguments).join(" "))) {
            State.resetFilter();
            return
        }

        State.setFilter(Array.from(arguments).join(" "));

        const auctionTable = document.querySelector("#auction_table");

        // hide unwanted table cells
        auctionTable.querySelectorAll("td").forEach(td => {
            const form = td.querySelector("form");
            if (form && ! Array.from(arguments).every(arg => form.dataset.item_name.toLowerCase().contains(arg.toLowerCase()))) {
                td.style.display = "none";
            }
        });

        // hide empty table rows
        auctionTable.querySelectorAll("tr").forEach(tr => {
            if ([...tr.querySelectorAll("td")].every(td => td.style.display.contains("none"))) {
                tr.style.display = "none";
            }
        });
    }

    function filterMyBids() {
        resetAuctionItemsDisplay();
        const auctionTable = document.querySelector("#auction_table");

        // hide unwanted table cells
        auctionTable.querySelectorAll("td").forEach(td => {
            const myBidsWithRefresh = td.querySelector("div a span");
            const myBidsWithoutRefresh = td.querySelector("div span");
            if (myBidsWithRefresh) {
                if (!myBidsWithRefresh.style.color.contains("blue")) {
                    td.style.display = "none";
                }
            } else if (myBidsWithoutRefresh){
                if (!myBidsWithoutRefresh.style.color.contains("blue")){
                    td.style.display = "none";
                }
            } else {
                td.style.display = "none";
            }
        });

        // hide empty table rows
        auctionTable.querySelectorAll("tr").forEach(tr => {
            if ([...tr.querySelectorAll("td")].every(td => td.style.display.contains("none"))) {
                tr.style.display = "none";
            }
        });
    }

    function fillAndSortGCA(criteria){
        const sortSelect = document.querySelector("#gca-auction-sort-select");
        const sortButton = document.querySelector(".gca-auction-sort-button");

        sortSelect.value = gcaSortMapping[criteria];
        sortButton.click();
    }

    function showHideElement(elementID) {
        const element = document.querySelector(`#${elementID}`);
        element.style.display.contains("block") ? element.style.display = "none" : element.style.display = "block";
    }


    // Generators
    function createGenericButton(content, type){
        const button = document.createElement("button");
        button.setAttribute("id", `${content.toLowerCase().replaceAll(" ", "-")}-${type.toLowerCase()}`);
        button.appendChild(document.createTextNode(`${content}`));
        button.className += "awesome-button";
        button.style.margin = "0rem 0.25rem";
        return button;
    }

    function createGenericFilterButton(content, action) {
        const button = createGenericButton(content, "filter");
        button.addEventListener("click", action);
        return button;
    }

    function createSortButton(content, action = fillAndSortGCA) {
        const button = createGenericButton(content, "sort");
        button.addEventListener("click", action.bind(this, content));
        return button;
    }

    function createFilterButton(content) {
        const contentFilterButton = createGenericFilterButton(content, content.contains(" ") ? multiFilterContent.bind(this, content.split(" ")) : filterContent.bind(this, content));

        return contentFilterButton;
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

    function createSubCategory(title) {
        const subCategory = document.createElement("div");
        subCategory.appendChild(document.createTextNode(title));
        return subCategory;
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

    // Other functions
    function mercDisplayAttr() {
        const auctionItems = document.querySelectorAll(".auction_item_div");
        auctionItems.forEach(item => {
            let isMerc = false;
            let isDexMerc = false;
            let isAgiMerc = false;
            let str = 0;
            let dex = 0;
            let agi = 0;
            let con = 0;
            let cha = 0;
            let int = 0;
            let info = "";
            eval(item.children[0].children[0].dataset.tooltip)[0].flat().forEach(strng => {
                if (typeof strng == "string"){
                    if (strng.contains("Samnit") || strng.contains("Murmillo")){
                        // isMerc = true;
                        isDexMerc = true;
                    }
                    if (strng.contains("Elite Spear")){
                        isAgiMerc = true;
                    }
                    if (strng.contains("Strength")){
                        str = strng.match(/\d+/);
                    }
                    if (strng.contains("Dexterity")){
                        dex = strng.match(/\d+/);
                    }
                    if (strng.contains("Agility")){
                        agi = strng.match(/\d+/);
                    }
                    if (strng.contains("Constitution")){
                        con = strng.match(/\d+/);
                    }
                    if (strng.contains("Charisma")){
                        cha = strng.match(/\d+/);
                    }
                    if (strng.contains("Intelligence")){
                        int = strng.match(/\d+/);
                    }
                }
            });
            if (isDexMerc || isAgiMerc) {
                const bidDiv = item.parentNode.querySelector(".auction_bid_div");
                info = `${isDexMerc ? dex : agi} ${bidDiv.children[2].innerText}`;
                bidDiv.children[2].innerText = info;
            }
        });
    }


    function addQuickFilters() {
        const quickFiltersSection = createSection("Quick Filters Section");
        const quickFiltersSectionHeader = createSectionHeader("Quick Filters", showHideElement.bind(this, nameToID("Quick Filters Section")));

        const quickFiltersSectionCategoriesContainer = document.createElement("div");
        quickFiltersSectionCategoriesContainer.setAttribute("id", nameToID("Filter categories container"));
        quickFiltersSectionCategoriesContainer.style.display = "flex";
        quickFiltersSectionCategoriesContainer.style.flexDirection = "row";
        quickFiltersSectionCategoriesContainer.style.justifyContent = "space-evenly";
        quickFiltersSectionCategoriesContainer.style.columnGap = "0.125rem";
        quickFiltersSectionCategoriesContainer.style.margin = "0.125rem";

        const neededThisToCollapseTheListLoL = [
            createFilterCategory("Control",
            [
                createGenericFilterButton("Reset", resetAuctionItemsDisplay),
                createGenericFilterButton("My Bids", filterMyBids),
            ]),

            createFilterCategory("Prefix",
            [
                createSubCategory("Low (1-30)"),
                createFilterButton("Calódiens"),
                createFilterButton("Sugos"),
                createFilterButton("Uróthiens"),
                createFilterButton("Rayols"),
                createSubCategory("Mid (30-70)"),
                createFilterButton("Zeindras"),
                createFilterButton("Kerrannas"),
                createFilterButton("Táliths"),
                createFilterButton("Trafans"),
                createFilterButton("Opiehnzas"),
                createSubCategory("High (80-100)"),
                createFilterButton("Ichorus"),
                createFilterButton("Lucius"),
                createFilterButton("Gaius"),
                createFilterButton("Antonius"),
                createSubCategory("End (100+)"),
                createFilterButton("Sebastianus"),
                createFilterButton("Gratius"),
                createFilterButton("Gaias"),
            ]),

            createFilterCategory("Suffix",
            [
                createFilterButton("Delicacy"),
                createFilterButton("Suffering"),
                createFilterButton("Elimination"),
                createFilterButton("Aggression"),
                createFilterButton("Earth"),
                createFilterButton("Dragon"),
                createFilterButton("Gloom"),
                createFilterButton("Inferno"),
                createFilterButton("Heaven"),
            ]),

            createFilterCategory("Mercenary",
            [
                createFilterButton("Samnit"),
                createFilterButton("Murmillo"),
                createFilterButton("Elite Spear"),
                createSubCategory("Misc"),
                createFilterButton("Grindstone")
            ]),

            createFilterCategory("Presets",
            [
                createFilterButton("Antonius Assassination"),
            ]),
        ].forEach(category => { quickFiltersSectionCategoriesContainer.appendChild(category) });

        quickFiltersSection.appendChild(quickFiltersSectionCategoriesContainer);

        const auctionControls = document.querySelector("#content article");
        auctionControls.appendChild(quickFiltersSectionHeader);
        auctionControls.appendChild(quickFiltersSection);
    }

    function overwriteGCASortSection() {
        const watchForSortSection = setInterval(() => {
            const sortSection = document.querySelector("#gca-auction-sort-section");
            if (sortSection) {
                clearInterval(watchForSortSection);

                const sortForm = sortSection.querySelector("form");
                sortForm.style.display = "none";

                const sortSectionContainer = document.createElement("div");
                sortSectionContainer.setAttribute("id", nameToID("Sort categories container"));
                sortSectionContainer.style.display = "flex";
                sortSectionContainer.style.flexDirection = "row";
                sortSectionContainer.style.justifyContent = "space-evenly";
                sortSectionContainer.style.margin = "0.25rem";

                sortSection.appendChild(sortSectionContainer);

                const collapseLoL = [
                    createSortButton("Damage"),
                    createSortButton("Agility"),
                    createSortButton("Dexterity"),
                    createSortButton("Healing"),
                    createSortButton("Block"),
                ].forEach(button => { sortSectionContainer.appendChild(button) });
            }
        }, 100);
    }

    // const HOST = `https://${window.location.host}/game/index.php?`;

    // const TOKEN = getQueryParameterValue("sh");

    setTimeout(() => {
        // clean useless text
        document.querySelectorAll("p").forEach(paragraph => {
            paragraph.textContent.contains("If someone overbids you you do") ? paragraph.style.display = "none" : null;
        });

        overwriteGCASortSection();
        addQuickFilters();
        mercDisplayAttr();

        // paint auction item boxes
        setInterval(() => {
            document.querySelectorAll("#auction_table div.auction_bid_div").forEach(bidItem => {
                let noBids = false;
                let unknownBidder = false;
                let friendlyBidder = false;
                let myBidNoRefresh = false;

                const noBidsTest = bidItem.firstElementChild;
                if (noBidsTest) {
                    noBids = noBidsTest.innerText.contains("No bids");1
                    myBidNoRefresh = noBidsTest.innerText.contains("Your bid has been placed");
                }

                const unknownBidderTest = bidItem.querySelector("div span");
                if (unknownBidderTest) {
                    unknownBidder = unknownBidderTest.textContent.contains("Bids already placed");
                }

                const friendlyBidderTest = bidItem.querySelector("div a span");
                if (friendlyBidderTest) {
                    friendlyBidder = friendlyBidderTest;
                }

                const bidBox = bidItem.closest("div.section-header")

                noBids ? bidBox.style.backgroundColor = "lightgrey" : null;
                unknownBidder ? bidBox.style.backgroundColor = "#FFCCCB" : null;
                friendlyBidder || myBidNoRefresh ? bidBox.style.backgroundColor = "lightgreen" : null;
            });
        }, 500);
    }, 500);
})();