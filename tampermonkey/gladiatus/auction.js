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

    function print() {
        console.log(arguments);
    }

    function getQueryParameterValue(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    function resetAuctionItemsDisplay() {
        document.querySelectorAll("#auction_table td").forEach(td => {td.style.display = "table-cell"});
        document.querySelectorAll("#auction_table tr").forEach(td => {td.style.display = "table-row"});
    }

    function createResetButton() {
        const resetButton = document.createElement("button");
        resetButton.setAttribute("id", `Reset-filter`);
        resetButton.appendChild(document.createTextNode(`Reset`));
        resetButton.className += "awesome-button";
        resetButton.style.margin = "2px";
        resetButton.addEventListener("click", function() {
            resetAuctionItemsDisplay();
        });

        return resetButton;
    }

    function createFilterButton(filterContent) {
        const contentButton = document.createElement("button");
        contentButton.setAttribute("id", `${filterContent}-filter`);
        contentButton.appendChild(document.createTextNode(`${filterContent}`));
        contentButton.className += "awesome-button";
        contentButton.style.margin = "2px";
        contentButton.addEventListener("click", function() {
            resetAuctionItemsDisplay();
            const auctionTable = document.querySelector("#auction_table");
            // hide unwanted table cells
            auctionTable.querySelectorAll("td").forEach(td => {
                const form = td.querySelector("form");
                if (form && !form.dataset.item_name.contains(filterContent)) {
                    td.style.display = "none";
                }
            });

            // hide empty table rows
            auctionTable.querySelectorAll("tr").forEach(tr => {
                if ([...tr.querySelectorAll("td")].every(td => td.style.display.contains("none"))) {
                    tr.style.display = "none";
                }
            });
        });

        return contentButton;
    }

    function createMyBidsButton(){
        // TODO: this
        const contentButton = document.createElement("button");
        contentButton.setAttribute("id", `My-bids-filter`);
        contentButton.appendChild(document.createTextNode("My bids"));
        contentButton.className += "awesome-button";
        contentButton.style.margin = "2px";
        contentButton.addEventListener("click", function() {
            resetAuctionItemsDisplay();
            const auctionTable = document.querySelector("#auction_table");
            // hide unwanted table cells
            auctionTable.querySelectorAll("td").forEach(td => {
                const me = td.querySelector("div a span");
                if (me) {
                    if (!me.style.color.contains("blue")) {
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


        });

        return contentButton;
    }

    function addQuickFilters() {
        const auctionTable = document.querySelector("#auction_table");
        const auctiontableParent = auctionTable.parentNode;

        const quickFilterSectionHeader = document.createElement("h2");
        quickFilterSectionHeader.classList.add("section-header");
        quickFilterSectionHeader.setAttribute("id", "quickFilterSectionHeader");
        quickFilterSectionHeader.style.cursor = "pointer";
        quickFilterSectionHeader.style.userSelect = "none";
        quickFilterSectionHeader.appendChild(document.createTextNode("Quick Filters"));
        quickFilterSectionHeader.addEventListener("click", function () {
            const qfSection = document.querySelector("#quickFilterSection");
            qfSection.style.display.contains("block") ? qfSection.style.display = "none" : qfSection.style.display = "block";
        });

        const quickFiltersSection = document.createElement("section");
        quickFiltersSection.setAttribute("id", "quickFilterSection");
        quickFiltersSection.style.minHeight = "45px";
        quickFiltersSection.style.display = "block";

        const filterCategoriesContainer = document.createElement("div");
        filterCategoriesContainer.setAttribute("id", "filterCategoriesContainer");
        filterCategoriesContainer.style.display = "block flex";

        const controlCategory = document.createElement("div");
        controlCategory.setAttribute("id", "filterControlCategory");
        controlCategory.style.display = "grid";
        controlCategory.appendChild(createResetButton());
        controlCategory.appendChild(createMyBidsButton());

        const prefixCategory = document.createElement("div");
        prefixCategory.setAttribute("id", "filterPrefixCategory");
        prefixCategory.style.display = "grid";
        prefixCategory.appendChild(createFilterButton("Lothays"));
        prefixCategory.appendChild(createFilterButton("Bacias"));
        prefixCategory.appendChild(createFilterButton("Sugos"));
        prefixCategory.appendChild(createFilterButton("Uróthiens"));
        prefixCategory.appendChild(createFilterButton("Táliths"));
        prefixCategory.appendChild(createFilterButton("Opiehnzas"));
        prefixCategory.appendChild(createFilterButton("Lucius"));
        prefixCategory.appendChild(createFilterButton("Ichorus"));


        const suffixCategory = document.createElement("div");
        suffixCategory.setAttribute("id", "filterSuffixCategory");
        suffixCategory.style.display = "grid";
        suffixCategory.appendChild(createFilterButton("Delicacy"));
        suffixCategory.appendChild(createFilterButton("Conflict"));
        suffixCategory.appendChild(createFilterButton("Assassination"));
        suffixCategory.appendChild(createFilterButton("Heaven"));
        suffixCategory.appendChild(createFilterButton("Solitude"));

        const mercenaryCategory = document.createElement("div");
        mercenaryCategory.setAttribute("id", "filterMercenaryCategory");
        mercenaryCategory.style.display = "grid";
        mercenaryCategory.appendChild(createFilterButton("Samnit"));
        mercenaryCategory.appendChild(createFilterButton("Murmillo"));
        mercenaryCategory.appendChild(createFilterButton("Elite Spear"));

        const miscCategory = document.createElement("div");
        miscCategory.setAttribute("id", "filterMiscCategory");
        miscCategory.style.display = "grid";
        miscCategory.appendChild(createFilterButton("Grindstone"));


        filterCategoriesContainer.appendChild(controlCategory);
        filterCategoriesContainer.appendChild(prefixCategory);
        filterCategoriesContainer.appendChild(suffixCategory);
        filterCategoriesContainer.appendChild(mercenaryCategory);
        filterCategoriesContainer.appendChild(miscCategory);

        quickFiltersSection.appendChild(filterCategoriesContainer);

        const auctionControls = document.querySelector("#content article");
        auctionControls.appendChild(quickFilterSectionHeader);
        auctionControls.appendChild(quickFiltersSection);
    }

    const HOST = `https://${window.location.host}/game/index.php?`;

    const TOKEN = getQueryParameterValue("sh");

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