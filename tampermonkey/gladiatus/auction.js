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

    function showHideElement(elementID) {
        const element = document.querySelector(`#${elementID}`);
        element.style.display.contains("block") ? element.style.display = "none" : element.style.display = "block";
    }


    // Generators
    function createGenericButton(content, action) {
        const button = document.createElement("button");
        button.setAttribute("id", `${content.toLowerCase().replaceAll(" ", "-")}-filter`);
        button.appendChild(document.createTextNode(`${content}`));
        button.className += "awesome-button";
        button.style.margin = "0rem 0.25rem";
        button.addEventListener("click", action);
        return button;
    }

    function createFilterButton(content) {
        const contentFilterButton = createGenericButton(content, content.contains(" ") ? multiFilterContent.bind(this, content.split(" ")) : filterContent.bind(this, content));

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


    function addQuickFilters() {
        const quickFiltersSection = createSection("Quick Filters Section");
        const quickFiltersSectionHeader = createSectionHeader("Quick Filters", showHideElement.bind(this, nameToID("Quick Filters Section")));

        const quickFiltersSectionCategoriesContainer = document.createElement("div");
        quickFiltersSectionCategoriesContainer.setAttribute("id", nameToID("Filter categories container"));
        quickFiltersSectionCategoriesContainer.style.display = "flex";
        quickFiltersSectionCategoriesContainer.style.flexDirection = "row";
        quickFiltersSectionCategoriesContainer.style.columnGap = "0.125rem";
        quickFiltersSectionCategoriesContainer.style.margin = "0.125rem";

        [
            createFilterCategory("Control",
            [
                createGenericButton("Reset", resetAuctionItemsDisplay),
                createGenericButton("My Bids", filterMyBids),
            ]),

            createFilterCategory("Prefix",
            [
                createSubCategory("Low (1-30)"),
                createFilterButton("Calódiens"),
                createFilterButton("Sugos"),
                createFilterButton("Uróthiens"),
                createFilterButton("Rayols"),
                createSubCategory("Mid (30-60)"),
                createFilterButton("Zeindras"),
                createFilterButton("Kerrannas"),
                createFilterButton("Táliths"),
                createFilterButton("Trafans"),
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
                createFilterButton("Conflict"),
                createFilterButton("Assassination"),
                createFilterButton("Heaven"),
                createFilterButton("Earth")
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

    // const HOST = `https://${window.location.host}/game/index.php?`;

    // const TOKEN = getQueryParameterValue("sh");

    setTimeout(() => {
        // clean useless text
        document.querySelectorAll("p").forEach(paragraph => {
            paragraph.textContent.contains("If someone overbids you you do") ? paragraph.style.display = "none" : null;
        });

        addQuickFilters();

        // paint auction item boxes
        setInterval(() => {
            document.querySelectorAll("#auction_table div.auction_bid_div").forEach(bidItem => {
                let noBids = false;
                let unknownBidder = false;
                let friendlyBidder = false;
                let myBidNoRefresh = false;

                const noBidsTest = bidItem.firstElementChild;
                if (noBidsTest) {
                    noBids = noBidsTest.innerText.contains("No bids");
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
    }, 250);
})();