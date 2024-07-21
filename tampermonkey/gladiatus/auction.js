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
        Array.from(arguments).forEach(argument => { console.log(argument) });
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

    const recipes = {

    }

    const mainMaterialOnSmelt = {
        "Linen Strip": { "Tinothiels": 7, "Calódiens": 8,
            "Tanias": 14,
            "Uróthiens": 13,
            "Doitrems": 5,
            "Chalinis": 9,
            "Asendacs": 14,
            "Grasscrawlers": 10,
            "Isundels": 10,
            "Mooncruchers": 11,
            "Cisiens": 13,
            "Galarands": 10,
        },
        "Fang": {
            "Amoviels": 10,
            "Vuthiels": 10,
            "Frabos": 10,
            "Lothays": 11,
            "Rayols": 12,
            "Umilawens": 5,
            "Kedyssis": 12,
            "Bacias": 12,
            "Gonaks": 10,
            "Beasthammers": 19,
            "Chabdyns": 18,
        },
        "Silk Thread": {
            "Kosmonas": 7,
            "Mimas": 5,
            "Umilawens": 5,
            "Rynightes": 7,
            "Zeindras": 6,
        },
        "Hemp": {
            "Reinkes": 9,
            "Solitanis": 13,
            "Elywens": 8,
            "Ismaels": 13,
            "Demonkillers": 8,
        },
        "Jute Patch": {
            "Zickezackes": 10,
            "Gadriewens": 8,
            "Xus": 12,
            "Frientas": 9,
            "Kerrannas": 6,
        },
        "Wool": {
            "Mermereus": 11,
            "Doitrems": 5,
            "Umilawens": 5,
            "Skiterus": 11,
            "Elrarangs": 19,
            "Lurtscharas": 15,
        },
        "Flintstone": {
            "Orleds": 21,
            "Adendathiels": 16,
            "Ashitills": 13,
            "Ashitills": 17,
        },
        "Lapis Lazuli": {
            "Melanchaetas": 13,
            "Ronaldas": 18,
            "Fustriels": 13,
        },
        "Adrenaline": {
            "Bereccas": 22,
            "Fitschis": 20,
            "Medonis": 22,
            "Heuhois": 19,
        },
        "Scale": {
            "Umfetas": 12,
            "Gidras": 20,
            "Melaneos": 21,
            "Zombers": 23,
        },
        "Storm Rune": {
            "Xenphlames": 21,
            "Umbros": 40,
            "Opiehnzas": 18,
            "Chucks": 23,
            "Appius": 17,
        },
        "Garnet": {
            "Liloels": 31,
            "Purmanns": 25,
            "Stoybaers": 29,
            "Shivas": 35,
            "Anchorons": 20,
            "Marcus": 48,
        },
        "Bull's Horn": {
            "Sphingens": 10,
            "Barbekuus": 13,
            "Leandronimus": 13,
            "Thorstens": 33,
            "Zimbris": 34,
        },
        "Tincture of Stamina": {
            "Korks": 20,
            "Fernabasts": 21,
            "Sentarions": 24,
            "Tantus": 21,
            "Lucius": 27,
        },
        "Sulphur": {
            "Trafans": 19,
            "Jennifers": 29,
            "Ichorus": 35,
            "Decimus": 32,
        },
        "Potion of Perception": {
            "Cheggovs": 30,
        },
        "Crystal": {
            "Manius": 42,
            "Titus": 29,
            "Gaius": 31,
            "Antonius": 30,
            "Quintus": 25,
            "Belisarius": 30,
            "Pontius": 22,
        },
        "Amethyst": {
            "Mateus": 48,
            "Dexterus": 21,
            "Servius": 31,
            "Giganticus": 23,
            "Marcellus": 36,
            "Constantius": 27,
            "Valerius": 47,
            "Caldus\'": 24,
        },
        "Dragon Scale": {
            "Dairus": 34,
            "Sextus": 34,
            "Tellus": 20,
            "Lepidus": 30,
            "Titanius": 23,
            "Avalonius": 24,
            "Amulius": 34,
        },
        "Emerald": {
            "Spurius": 52,
            "Mandalus": 52,
            "Silvanus": 54,
            "Vergilius": 56,
            "Aurelius": 56,
            "Caldus\'": 23,
        },
        "Sphinx Feather": {
            "Lethe's": 33,
            "Mercurialis": 47,
            "Aulus": 35,
        },
        "Sugilite": {
            "Asphodel's": 39,
            "Joves": 40,
            "Magnus": 44,
            "Angelus": 47,
            "Caesius": 44,
            "Gratias": 47,
        },
        "Almandin": {
            "Sebastianus": 24,
            "Mycandrilles": 40,
            "Ursus": 33,
            "Primulus": 37,
            "Sergius": 31,
            "Gratius": 37,
        },
        "Typhon Leather": {
            "Dragonus\'": 30,
            "Oranius": 28,
        },
        "Hydra Scale": {
            "Ambrosius\'": 26,
            "Aspagius": 41,
            "Pilatus": 41,
        },
        "Soul Essence": {
            "Gaias": 55,
            "Accas": 73,
            "Quintas": 45,
        },
    }

    const mercCategoyMapping = {
        "15": "test"
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

    class Flags{
        static quickFilterToggle = false;
    }

    // Utils
    function nameToID(name) {
        return name.toLowerCase().replaceAll(" ", "-");
    }

    class Mercenary {
        static getTypeFromId(id) {
            switch (id){
                case "1":
                case "6":
                case "11":
                case "16":
                    return "Tank";
                case "2":
                case "7":
                case "12":
                case "17":
                    return "Healer";
                default:
                    return "Damage";
            }
        }
    }

    class Items {
        static getTypeFromId(id) {
            switch(id){
                case "1": return "Weapon";
                case "2": return "Shield";
                case "3": return "Chestplate";
                case "4": return "Helmet";
                case "5": return "Gloves";
                case "6": return "Ring";
                case "7": return "Usable";
                case "8": return "Shoes";
                case "9": return "Amulet";
                case "11": return "Reinforcement";
                case "12": return "Upgrade";
                case "13": return "Recipe";
                case "14": return "Gold";
                case "15": return "Mercenary";
                case "18": return "Forging goods";
                case "19": return "Tools";
                case "20": return "Scroll";
                case "21": return "Event item";
                default: null;
            }
        }

        static getIdFromType(type) {
            switch(type){
                case "Mercenary": return "15";
            }
        }
    }


    // Functors
    function resetAuctionItemsDisplay() {
        document.querySelectorAll("#auction_table td").forEach(td => {td.style.display = "table-cell"});
        document.querySelectorAll("#auction_table tr").forEach(tr => {tr.style.display = "table-row"});
    }

    function filterContent(content) {
        resetAuctionItemsDisplay();

        if (Flags.quickFilterToggle && State.isFilteredBy(content)) {
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
            if (Array.from(tr.querySelectorAll("td")).every(td => td.style.display.contains("none"))) {
                tr.style.display = "none";
            }
        });
    }

    function multiFilterContent() {
        resetAuctionItemsDisplay();

        if (Flags.quickFilterToggle && State.isFilteredBy(Array.from(arguments).join(" "))) {
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
            if (Array.from(tr.querySelectorAll("td")).every(td => td.style.display.contains("none"))) {
                tr.style.display = "none";
            }
        });
    }

    function customFilter(complexCriteriaList){
        resetAuctionItemsDisplay();

        const auctionTable = document.querySelector("#auction_table");

        // hide unwanted table cells
        auctionTable.querySelectorAll("td").forEach(td => {
            const form = td.querySelector("form");
            if (form && !Array.from(complexCriteriaList).some(criteria => criteria.every(term => form.dataset.item_name.toLowerCase().contains(term.toLowerCase())))) {
                td.style.display = "none";
            }
        });

        // hide empty table rows
        auctionTable.querySelectorAll("tr").forEach(tr => {
            if (Array.from(tr.querySelectorAll("td")).every(td => td.style.display.contains("none"))) {
                tr.style.display = "none";
            }
        });
    }

    function filterMyBids() {
        resetAuctionItemsDisplay();
        const auctionTable = document.querySelector("#auction_table");

        // hide unwanted table cells
        auctionTable.querySelectorAll("td").forEach(td => {
            const myBidsWithRefresh = td.querySelector(".auction_bid_div div a span");
            const myBidsWithoutRefresh = td.querySelector(".auction_bid_div div");
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
            if (Array.from(tr.querySelectorAll("td")).every(td => td.style.display.contains("none"))) {
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

    function showHideElement(element) {
        // const element = document.querySelector(`#${elementID}`);
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
        const button = createGenericButton(content, "quickfilter");
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

    // complexCriteria looks like [[ ["lucius", "delicacy"], ["ichorus", "assasination"], ...]]
    // doubling list because bind acts strange
    function createCustomFilterButton(title, complexCriteria) {
        const customFilterButton = createGenericButton(title, "filter");
        customFilterButton.addEventListener("click", customFilter.bind(this, [complexCriteria]));
        return customFilterButton;
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
        auctionItems.forEach(auctionItem => {
            const mercItem = Array.from(auctionItem.querySelector("div").querySelector("div")).filter(itemType => itemType.classList[0].split("-")[2].contains(Items.getIdFromType("Mercenary")));

            mercItem.forEach(item => {
                let str = 0;
                let dex = 0;
                let agi = 0;
                let con = 0;
                let cha = 0;
                let int = 0;
                let info = "";
                eval(item.dataset.tooltip)[0].flat().forEach(attribute => {
                    if (typeof attribute == "string"){
                        attribute.contains("Strength") ? str = attribute.match(/\d+/) : null;
                        attribute.contains("Dexterity") ? dex = attribute.match(/\d+/) : null;
                        attribute.contains("Agility") ? agi = attribute.match(/\d+/) : null;
                        attribute.contains("Constitution") ? con = attribute.match(/\d+/) : null;
                        attribute.contains("Charisma") ? cha = attribute.match(/\d+/) : null;
                        attribute.contains("Intelligence") ? int = attribute.match(/\d+/) : null;
                    }
                });

                const auctionTd = auctionItem.parentNode.parentNode.parentNode;

                const mercType = Mercenary.getTypeFromId(item.classList[0].split("-")[3]);
                const bidDiv = auctionItem.parentNode.querySelector(".auction_bid_div");
                switch (mercType){
                    case "Tank":
                        // agi >= 360 ? auctionTd.style.display = "none" : auctionTd.style.display = "table-cell";
                        info = `${agi} ${bidDiv.children[2].innerText}`;
                        break;
                    case "Healer":
                        // int >= 360 ? auctionTd.style.display = "none" : auctionTd.style.display = "table-cell";
                        info = `${int} ${bidDiv.children[2].innerText}`;
                        break;
                    case "Damage":
                        // dex >= 360 ? auctionTd.style.display = "none" : auctionTd.style.display = "table-cell";
                        info = `${dex} ${bidDiv.children[2].innerText}`;
                        break;
                }
                bidDiv.children[2].innerText = info;
            })
        });
    }


    function addQuickFilters() {
        const quickFiltersSection = createSection("Quick Filters Section");
        const quickFiltersSectionHeader = createSectionHeader("Quick Filters", showHideElement.bind(this, quickFiltersSection));

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
                createSubCategory("Auto"),
                createGenericFilterButton("Food", bidFood),
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
                createFilterButton("Titus"),
                createFilterButton("Sextus"),
                createFilterButton("Gaius"),
                createFilterButton("Mandalus"),
                createFilterButton("Antonius"),
                createFilterButton("Constantinus"),

                createSubCategory("End (100+)"),
                createFilterButton("Sebastianus"),
                createFilterButton("Gratius"),
                createFilterButton("Gaias"),
            ]),

            createFilterCategory("Suffix",
            [
                createSubCategory("Level 90"),
                createFilterButton("Delicacy"),
                createFilterButton("Assassination"),
                createFilterButton("Conflict"),
                createFilterButton("Heaven"),
                createFilterButton("Solitude"),
            ]),

            createFilterCategory("Mercenary",
            [
                createCustomFilterButton("Tank", [
                    ["Hoplomachus"], // Italy
                    ["Elite Spear Carrier"], // Africa
                    ["Eagle Wing"], // Germania
                    ["Grandmaster"], // Britannia
                ]),
                createCustomFilterButton("Healer", [
                    ["Medicus"], // Italy
                    ["Medicine man"], // Africa
                    ["Herbalist"], // Germania
                    ["Druid Master"], // Britannia
                ]),
                createCustomFilterButton("Damage", [
                    ["Thracian"], ["Murmillo"], ["Samnit"], // Italy
                    ["Archer"], ["Experienced archer"], ["Sword Wolf"], // Africa
                    ["Bear Warrior"], ["Scorpion Warrior"], ["Axe Warrior"], // Germania
                    ["The Ranger"], ["Axe Thrower"], ["Chariot Driver"], // Britannia
                ]),
                createSubCategory("Specific"),
                createFilterButton("Samnit"),
                createFilterButton("Murmillo"),
                createFilterButton("Elite Spear"),
                createFilterButton("Grandmaster"),

                createSubCategory("Misc"),
                createFilterButton("Grindstone")
            ]),

            createFilterCategory("Presets",
            [
                createFilterButton("Lucius Assassination"),
                createFilterButton("Lucius Delicacy"),
                createFilterButton("Ichorus Assassination"),
                createFilterButton("Gaius Conflict"),
                createFilterButton("Opiehnzas Heaven"),
                createFilterButton("Táliths Solitude"),
                createSubCategory("Complex filters"),
                createCustomFilterButton("Level 90 gear",
                    [
                        ["lucius", "assassination"],
                        ["lucius", "delicacy"],
                        ["Ichorus", "assassination"],
                        ["gaius", "conflict"],
                        ["Opiehnzas", "heaven"],
                        ["Táliths", "solitude"],
                    ]
                ),
                createSubCategory("Smelt"),
                createCustomFilterButton("Tincture of Stamina (Lucius)",
                    [
                        ["lucius"],
                        ["fernabasts"],
                        ["tantus"],
                        ["sentarions"],
                    ]
                ),
                createCustomFilterButton("Crystal (Antonius)",
                    [
                        ["manius"],
                        ["gaius"],
                        ["belisarius"],
                        ["antonius"],
                        ["titus"],
                        ["quintus"],
                        ["pontius"],
                    ]
                ),
                createCustomFilterButton("Amethyst (Antonius)",
                    [
                        ["valerius"],
                        ["mateus"],
                        ["marcellus"],
                        ["constantinus"],
                        ["servius"],
                        ["dexterus"],
                        ["giganticus"],
                    ]
                ),
                createCustomFilterButton("Sulphur (Ichorus)",
                    [
                        ["icorus"],
                        ["decimus"],
                        ["jennifers"],
                        ["trafans"],
                    ]
                ),
                createCustomFilterButton("Storm Rune (Opiehnzas)",
                    [
                        ["umbros"],
                        ["chucks"],
                        ["Xenphlames"],
                        ["Appius"],
                    ]
                ),
                createCustomFilterButton("Flintstone (Taliths)",
                    [
                        ["orleds"],
                        ["Ashitills"],
                        ["Táliths"],
                        ["Adendathiels"],
                    ]
                ),
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
                    createSortButton("Armor"),
                    createSortButton("Agility"),
                    createSortButton("Dexterity"),
                    createSortButton("Charisma"),
                    createSortButton("Healing"),
                    createSortButton("Block"),
                ].forEach(button => { sortSectionContainer.appendChild(button) });
            }
        }, 100);
    }

    function modifyFilterSection() {

        // Move hide gold button
        const filterSection = document.querySelector("section > a.gca-auction-show-hide-button").parentNode;
        const tableRows = filterSection.querySelectorAll("form > table > tbody > tr");
        const lastRow = tableRows[tableRows.length - 1]
        const filterHideGoldButton = filterSection.querySelector("a");
        const td = document.createElement("td")
        td.appendChild(filterHideGoldButton)
        lastRow.appendChild(td);

        // Create filters
        const filtersSectionCategoriesContainer = document.createElement("div");
        filtersSectionCategoriesContainer.setAttribute("id", nameToID("Filter section categories container"));
        filtersSectionCategoriesContainer.style.display = "flex";
        filtersSectionCategoriesContainer.style.flexDirection = "row";
        filtersSectionCategoriesContainer.style.justifyContent = "space-evenly";
        filtersSectionCategoriesContainer.style.columnGap = "0.125rem";
        filtersSectionCategoriesContainer.style.margin = "0.125rem";

        [
            createFilterCategory("Control",
            [
                // createGenericButton()
            ]),
        ].forEach(category => filtersSectionCategoriesContainer.append(category))

        filterSection.appendChild(filtersSectionCategoriesContainer)
    }

    function isFriendlyBid(auctionBidDiv){
        const bidder = Array.from(auctionBidDiv.querySelectorAll("a")).filter(a => a.querySelector("span"))
        return bidder.length ? true : false
    }

    function isFoodItem(auctionItemDiv) {
        return auctionItemDiv.querySelector("div > div > div").classList[0].split("-")[2] === "7"

    }

    function getBidButtonOf(auctionBidDiv){
        return auctionBidDiv.querySelector("input[type='button'][value='Bid'][name='bid']")
    }

    function bidFood() {
        if(confirm("Are you sure you want to bid on all the food available? It's gonna take some time"))
        {
            const itemForm = document.querySelectorAll("#auction_table td form")
            foodItemsToBid = Array.from(itemForm).filter(form => !isFriendlyBid(form.querySelector(".auction_bid_div")) && isFoodItem(form.querySelector(".auction_item_div")))
            let index = 0
            let timer = setInterval(() => {
                getBidButtonOf(foodItemsToBid[index]).click()
                if (index === foodItemsToBid.length - 1) clearInterval(timer)
                else index++
            }, 250)
        }
    }

    function sortMercByMainTrait(){

    }


    // const HOST = `https://${window.location.host}/game/index.php?`;

    // const TOKEN = getQueryParameterValue("sh");

    setTimeout(() => {
        // clean useless text
        document.querySelectorAll("p").forEach(paragraph => {
            paragraph.textContent.contains("If someone overbids you you do") ? paragraph.style.display = "none" : null;
        });

        document.querySelector("#content > article").style.margin = "1rem 0rem";
        document.querySelector("h2.buildingDesc.section-header").style.margin = "1rem 0rem";

        // addTotalCost();
        // document.querySelectorAll(".auction_bid_div input[type='text']").forEach(input => {print(input.style.backgroundColor)})
        modifyFilterSection();
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
    }, 100);
})();