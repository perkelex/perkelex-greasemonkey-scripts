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
            "Orlelds": 21,
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

    // ========================== Utils ==========================
    function nameToID(name) {
        return name.toLowerCase().replaceAll(" ", "-");
    }

    function isFriendlyBid(auctionBidDiv){
        const bidder = Array.from(auctionBidDiv.querySelectorAll("a")).filter(a => a.querySelector("span"))
        return bidder.length ? true : false
    }



    function getBidButtonOf(auctionBidDiv){
        return auctionBidDiv.querySelector("input[type='button'][value='Bid'][name='bid']")
    }

    class Mercenary {
        static top3 = {
            "Tank": [],
            "Healer": [],
            "Damage": [],
        }

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

        static getMercStats(element){
            // TODO
        }
    }

    class Food {
        static isSmall(id) {
            switch(id){
                case "10": return false
                default : return true
            }
        }
    }

    class Items {
        static getTypeFromId(id) {
            switch(id){
                case "-1": return "Any";
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

        static isMinLevel(auctionItemDiv, level) {
            return parseInt(auctionItemDiv.querySelector("div > div > div").dataset.level) >= level
        }

        static isFoodItem(auctionItemDiv) {
            return auctionItemDiv.querySelector("div > div > div").classList[0].split("-")[2] === "7"
        }

        static isGear(auctionItemDiv) {
            const itemID = parseInt(auctionItemDiv.querySelector("div > div > div").classList[0].split("-")[2])
            return itemID >= 1 && itemID <= 9 && itemID !== 7
        }

        static getQualityFromColor(auctionBidDiv){
            switch(auctionBidDiv.children[2].style.color){
                case "green": return "Green"
                case "rgb(81, 89, 247)": return "Blue"
                case "rgb(227, 3, 224)": return "Purple"
                case "rgb(255, 106, 0)": return "Orange"
                case "rgb(255, 0, 0)": return "Red"
                default: return "unknown"
            }
        }

        static getColorFromQuality(quality){
            switch(quality){
                case "Green": return "green"
                case "Blue": return "rgb(81, 89, 247)"
                case "Purple": return "rgb(227, 3, 224)"
                case "Orange": return "rgb(255, 106, 0)"
                case "Red": return "rgb(255, 0, 0)"
            }
        }

        static getMinimumQualityRegExStr(quality){
            const qualities = ["Green", "Blue", "Purple", "Orange", "Red"]
            for(const idx in qualities){
                if(qualities[idx] === quality)
                    return qualities.slice(idx).join("|")
            }
        }
    }


    // ========================== Functors ==========================
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

        hideUnwantedCells(auctionTable, [[content]])
        hideEmptyTableRows(auctionTable)
    }

    function multiFilterContent() {
        resetAuctionItemsDisplay();

        if (Flags.quickFilterToggle && State.isFilteredBy(Array.from(arguments).join(" "))) {
            State.resetFilter();
            return
        }

        State.setFilter(Array.from(arguments).join(" "));

        const auctionTable = document.querySelector("#auction_table");

        auctionTable.querySelectorAll("td").forEach(td => {
            const form = td.querySelector("form");
            if (form && ! Array.from(arguments).every(arg => form.dataset.item_name.toLowerCase().contains(arg.toLowerCase()))) {
                td.style.display = "none";
            }
        });

        hideEmptyTableRows(auctionTable)
    }

    function customTextFilter() {
        resetAuctionItemsDisplay();

        let nameInput = document.querySelector(`#${nameToID("text filter name input")}`).value
        nameInput = nameInput ? nameInput.split(" ") : nameInput

        let attributeInput = document.querySelector(`#${nameToID("text filter attribute input")}`).value
        attributeInput = attributeInput ? attributeInput.split(" ") : attributeInput

        if (!nameInput && !attributeInput){
            return
        }

        // if (Flags.quickFilterToggle && State.isFilteredBy(Array.from(input).join(" "))) {
        //     State.resetFilter();
        //     return
        // }

        // State.setFilter(Array.from(input).join(" "));

        const auctionTable = document.querySelector("#auction_table");

        auctionTable.querySelectorAll("td").forEach(td => {
            const form = td.querySelector("form");
            if (form) {
                let nameMatch = true
                let attributesMatch = true
                const itemName = form.dataset.item_name
                const itemTooltip = form.querySelector("div > div > div").dataset.tooltip.split("Value")[0]
                const itemDiv = form.querySelector(".auction_item_div")

                if (nameInput && !Array.from(nameInput).every(keyword => itemName.match(new RegExp(keyword, "i")) && Items.isGear(itemDiv))){
                    nameMatch = false
                    // print(`${nameInput} - ${itemName}`)
                    // print(itemName.match(new RegExp(nameInput[0], "i")))
                    // td.style.display = "none";
                }

                if (attributeInput && !Array.from(attributeInput).every(keyword => itemTooltip.match(new RegExp(`${keyword}[a-zA-Z]* \\+\\d{2}`, "i")) && Items.isGear(itemDiv))){
                    attributesMatch = false
                    // print(itemTooltip)
                    // print(itemTooltip.match(new RegExp(`${attributeInput[0]}[a-zA-Z]*\s\+`, "i")))
                    // td.style.display = "none";
                }

                if ((nameInput && !nameMatch) || (attributeInput && !attributesMatch)) {
                    td.style.display = "none";
                }
            }
        });

        hideEmptyTableRows(auctionTable)
    }

    function customFilter(complexCriteriaList){
        resetAuctionItemsDisplay();

        const auctionTable = document.querySelector("#auction_table");

        hideUnwantedCells(auctionTable, complexCriteriaList);
        hideEmptyTableRows(auctionTable);
    }

    function customMercFilter(type){
        const top3 = Mercenary.top3[type][2] || null
        const top1 = Mercenary.top3[type][0] || null
        if (!top3) return
        resetAuctionItemsDisplay();

        const auctionTable = document.querySelector("#auction_table");

        // const tdsToShow = []
        // const tdsToHide = []
        // const trs = []

        auctionTable.querySelectorAll("td").forEach(td => {
            const form = td.querySelector("form");
            if (form){
                const itemDiv = form.querySelector(".auction_item_div")
                const bidDiv = form.querySelector(".auction_bid_div")
                const attributeValue = parseInt(bidDiv.children[2].textContent.split(" ")[0])
                const itemClassListSplit = itemDiv.querySelector("div > div > div").classList[0].split("-")
                const itemTypeId = itemClassListSplit[2]
                const itemSubTypeId = itemClassListSplit[3]
                const isMercAndMatchesType = Items.getTypeFromId(itemTypeId) === "Mercenary" && type === Mercenary.getTypeFromId(itemSubTypeId)

                if (!isMercAndMatchesType) {
                    td.style.display = "none";
                    // tdsToHide.push(td.cloneNode(true))
                } else if (attributeValue < top3){
                    td.style.display = "none";
                    // tdsToShow.push(td.cloneNode(true));
                }

                if (isMercAndMatchesType && attributeValue === top1){
                    bidDiv.children[2].style.backgroundColor = "#fab73d"
                }
            }
        });

        hideEmptyTableRows(auctionTable)
    }

    function hideEmptyTableRows(table) {
        table.querySelectorAll("tr").forEach(tr => {
            if (Array.from(tr.querySelectorAll("td")).every(td => td.style.display.contains("none"))) {
                tr.style.display = "none";
            }
        });
    }

    function hideUnwantedCells(table, complexCriteria) {
        table.querySelectorAll("td").forEach(td => {
            const form = td.querySelector("form");
            if (!form) return

            const isFood = Items.isFoodItem(form.querySelector(".auction_item_div"))
            const matchesName = Array.from(complexCriteria).some(criteria => criteria.every(term => form.dataset.item_name.match(new RegExp(term, "i"))))

            if (isFood || !matchesName) td.style.display = "none"
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
        element.style.display.contains("block") ? element.style.display = "none" : element.style.display = "block";
    }

    function bidFood(minLevel) {
        if(confirm("Are you sure you want to bid on all the food available? It's gonna take some time"))
        {
            const itemForm = document.querySelectorAll("#auction_table td form")
            foodItemsToBid = Array.from(itemForm).filter(form =>
                !isFriendlyBid(form.querySelector(".auction_bid_div")) &&
                Items.isFoodItem(form.querySelector(".auction_item_div")) &&
                Items.isMinLevel(form.querySelector(".auction_item_div"), minLevel) &&
                Food.isSmall(form.querySelector(".auction_item_div > div > div").classList[0].split("-")[3]) &&
                parseInt(form.querySelector(".auction_bid_div input[type='text'][name='bid_amount']").value) <= 1500
            )
            let index = 0
            let timer = setInterval(() => {
                getBidButtonOf(foodItemsToBid[index]).click()
                if (index === foodItemsToBid.length - 1) clearInterval(timer)
                else index++
            }, 250)
        }
    }

    function smeltFilter(){
        resetAuctionItemsDisplay()
        const args = Array.from(arguments)
        const maxPrice = args.pop()
        const quality = args.pop()
        const nameCriteria = args

        const itemTds = document.querySelectorAll("#auction_table td")
        itemTds.forEach(td => {
            if (!td.querySelector("form")) return
            const auctionBidDiv = td.querySelector("form .auction_bid_div")
            const itemName = auctionBidDiv.children[2].textContent
            const itemQuality = Items.getQualityFromColor(auctionBidDiv)
            const itemPrice = parseInt(auctionBidDiv.querySelector("input[type='text'][name='bid_amount']").value)

            if(
                !Array.from(nameCriteria).some(criterion => itemName.match(new RegExp(criterion, "i"))) ||
                !itemQuality.match(new RegExp(Items.getMinimumQualityRegExStr(quality), "i")) ||
                !(itemPrice <= maxPrice) ||
                Items.isFoodItem(td.querySelector("form .auction_item_div"))
            ){
                td.style.display = "none"
            }
        })

        hideEmptyTableRows(document.querySelector("#auction_table"))
    }

    function purpleItems(){
        resetAuctionItemsDisplay()

        document.querySelectorAll("#auction_table td").forEach(td => {
            if (!td.querySelector("form")) return
            const auctionBidDiv = td.querySelector("form .auction_bid_div")
            const itemQuality = Items.getQualityFromColor(auctionBidDiv)
            if(
                !itemQuality.match(new RegExp(Items.getMinimumQualityRegExStr("Purple"), "i")) ||
                Items.isFoodItem(td.querySelector("form .auction_item_div"))
            ){
                td.style.display = "none"
            }
        })

        hideEmptyTableRows(document.querySelector("#auction_table"))
    }


    // ========================== Generators ==========================
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

    // complexCriteria looks like [ [["lucius", "delicacy"], ["ichorus", "assasination"], ...] ]
    // doubling list because bind acts strange
    function createCustomFilterButton(title, complexCriteria) {
        const customFilterButton = createGenericButton(title, "filter");
        customFilterButton.addEventListener("click", customFilter.bind(this, [complexCriteria]));
        return customFilterButton;
    }

    function createCustomSmeltFilterButton(title, quality, maxPrice, nameCriteria){
        const customFilterButton = createGenericButton(title, "filter");
        customFilterButton.addEventListener("click", smeltFilter.bind(this, [...nameCriteria, quality, maxPrice]));
        customFilterButton.style.color = Items.getColorFromQuality(quality)
        return customFilterButton;
    }

    function createCustomMercFilterButton(title, mercType) {
        const customFilterButton = createGenericButton(title, "filter");
        customFilterButton.addEventListener("click", customMercFilter.bind(this, mercType));
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

    function createRowContainer(title) {
        const container = document.createElement("div");
        container.setAttribute("id", nameToID(title));
        container.style.display = "flex";
        container.style.flexDirection = "row";
        container.style.justifyContent = "space-evenly";
        container.style.columnGap = "0.125rem";
        container.style.margin = "0.125rem";
        return container
    }

    // ========================== Other functions ==========================
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

                // const auctionTd = auctionItem.parentNode.parentNode.parentNode;

                const mercType = Mercenary.getTypeFromId(item.classList[0].split("-")[3]);
                const bidDiv = auctionItem.parentNode.querySelector(".auction_bid_div");
                switch (mercType){
                    case "Tank":
                        // agi >= 360 ? auctionTd.style.display = "none" : auctionTd.style.display = "table-cell";
                        Mercenary.top3[mercType].push(parseInt(agi))
                        info = `${agi} ${bidDiv.children[2].innerText}`;
                        break;
                    case "Healer":
                        // int >= 360 ? auctionTd.style.display = "none" : auctionTd.style.display = "table-cell";
                        Mercenary.top3[mercType].push(parseInt(int))
                        info = `${int} ${bidDiv.children[2].innerText}`;
                        break;
                    case "Damage":
                        // dex >= 360 ? auctionTd.style.display = "none" : auctionTd.style.display = "table-cell";
                        Mercenary.top3[mercType].push(parseInt(dex))
                        info = `${dex} ${bidDiv.children[2].innerText}`;
                        break;
                }
                bidDiv.children[2].innerText = info;
            })
        });

        ["Tank", "Healer", "Damage"].forEach(mercType => { Mercenary.top3[mercType].sort((a, b) => b - a)})
    }

    function addQuickFilters() {
        const quickFiltersSection = createSection("Quick Filters Section");
        const quickFiltersSectionHeader = createSectionHeader("Quick Filters", showHideElement.bind(this, quickFiltersSection));

        const quickFiltersSectionCategoriesContainer = createRowContainer("Filter categories container")
        const customTextFilterContainer = createRowContainer("Custom text filter")
        customTextFilterContainer.style.justifyContent = "center";
        customTextFilterContainer.style.margin = "1rem";

        const customTextFilterInputsContainer = createRowContainer("Custom text filter inputs")
        customTextFilterInputsContainer.style.justifyContent = "center";
        customTextFilterInputsContainer.style.flexDirection = "column";
        customTextFilterInputsContainer.style.margin = "0.5rem";

        const customTextFilterNameInput = document.createElement("input")
        customTextFilterNameInput.setAttribute("type", "text")
        customTextFilterNameInput.setAttribute("id", nameToID("text filter name input"))

        const customTextFilterAttributeInput = document.createElement("input")
        customTextFilterAttributeInput.setAttribute("type", "text")
        customTextFilterAttributeInput.setAttribute("id", nameToID("text filter attribute input"))

        const triggerCustomTextInputFilter = createGenericFilterButton("Find it!", customTextFilter)
        const clearCustomTextInputFilter = createGenericFilterButton("Clear", () => {
            document.querySelector("#text-filter-name-input").value = ""
            document.querySelector("#text-filter-attribute-input").value = ""
        })

        customTextFilterInputsContainer.appendChild(customTextFilterNameInput)
        customTextFilterInputsContainer.appendChild(customTextFilterAttributeInput)
        customTextFilterContainer.appendChild(customTextFilterInputsContainer)
        customTextFilterContainer.appendChild(triggerCustomTextInputFilter)
        customTextFilterContainer.appendChild(clearCustomTextInputFilter)

        const neededThisToCollapseTheListLoL = [
            createFilterCategory("Control",
            [
                createGenericFilterButton("Reset", resetAuctionItemsDisplay),
                createGenericFilterButton("My Bids", filterMyBids),
                createSubCategory("Auto"),
                createGenericFilterButton("Food 0", bidFood.bind(this, 0)),
                createGenericFilterButton("Food 67", bidFood.bind(this, 67)),
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
                createFilterButton("Opiehnzas"),

                createSubCategory("High (80-100)"),
                createFilterButton("Ichorus"),
                createFilterButton("Lucius"),
                createFilterButton("Gaius"),
                createFilterButton("Antonius"),
                createFilterButton("Titanius"),

                createSubCategory("End (100+)"),
                createFilterButton("Sebastianus"),
                createFilterButton("Gratius"),
                createFilterButton("Gaias"),

                createSubCategory("Healing"),
                createFilterButton("Mandalus"),
                createFilterButton("Aurelius"),
            ]),

            createFilterCategory("Suffix",
            [
                createFilterButton("Delicacy"),
                createFilterButton("Harmony"),
                createFilterButton("Triviality"),
                createFilterButton("Assassination"),
                createFilterButton("Conflict"),
                createFilterButton("Heaven"),
                createFilterButton("Solitude"),
                createFilterButton("Alleluia"),
            ]),

            createFilterCategory("Mercenary",
            [
                createCustomMercFilterButton("Tank", "Tank"),
                createCustomMercFilterButton("Healer", "Healer"),
                createCustomMercFilterButton("Damage", "Damage"),

                createSubCategory("Specific"),
                createFilterButton("Samnit"),
                createFilterButton("Murmillo"),
                createFilterButton("Elite Spear"),
                createFilterButton("Grandmaster"),

                createSubCategory("Misc"),
                createFilterButton("Grindstone"),
                createCustomFilterButton("Strength", [["blue powder"]]),
                createCustomFilterButton("Dexterity", [["yellow powder"]]),
                createCustomFilterButton("Agility", [["green powder"]]),
                createCustomFilterButton("Constitution", [["orange powder"]]),
                createCustomFilterButton("Charisma", [["violet powder"]]),
                createCustomFilterButton("Intelligence", [["red powder"]]),
                createCustomFilterButton("Armor", [["protective gear"]]),
                createCustomFilterButton("Removal", [["detergent spong"]]),
                createSubCategory("--------"),
                createGenericFilterButton("Purple", purpleItems)
            ]),

            createFilterCategory("Presets",
            [
                // createFilterButton("Lucius Assassination"),
                // createFilterButton("Lucius Delicacy"),
                // createFilterButton("Ichorus Assassination"),
                // createFilterButton("Gaius Conflict"),
                // createFilterButton("Opiehnzas Heaven"),
                // createFilterButton("Táliths Solitude"),
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
                createSubCategory("Materials"),
                createCustomSmeltFilterButton("Dragons Scale (Titanius)", "Blue", 15000,
                    [
                        ["dairus"],
                        ["amulius"],
                        ["avalonius"],
                        ["lepidus"],
                        ["sextus"],
                        ["titanius"],
                    ]
                ),
                createCustomSmeltFilterButton("Tinct. of Stamina (Lucius)", "Blue", 15000,
                    [
                        ["lucius"],
                        ["fernabasts"],
                        ["tantus"],
                        ["sentarions"],
                    ]
                ),
                createCustomSmeltFilterButton("Tinct. of Perception (Lucius)", "Blue", 15000,
                    [
                        ["zimbris"],
                        ["thorstens"],
                        ["cheggovs"],
                    ]
                ),
                createCustomSmeltFilterButton("Crystal (Antonius)", "Blue", 15000,
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
                createCustomSmeltFilterButton("Amethyst (Antonius)", "Blue", 15000,
                    [
                        ["valerius"],
                        ["mateus"],
                        ["marcellus"],
                        ["constantius"],
                        ["servius"],
                        ["dexterus"],
                        ["giganticus"],
                    ]
                ),
                createCustomSmeltFilterButton("Sulphur (Ichorus)", "Blue", 15000,
                    [
                        ["ichorus"],
                        ["decimus"],
                        ["jennifers"],
                        ["trafans"],
                    ]
                ),
                createCustomSmeltFilterButton("Storm Rune (Opiehnzas)", "Blue", 15000,
                    [
                        ["umbros"],
                        ["chucks"],
                        ["Xenphlames"],
                        ["Appius"],
                    ]
                ),
                createCustomSmeltFilterButton("Protection Rune (Heaven)", "Blue", 15000,
                    [
                        ["accuracy"],
                        ["heaven"],
                        ["sickness"],
                    ]
                ),
                createCustomSmeltFilterButton("Flintstone (Taliths)", "Blue", 15000,
                    [
                        ["orlelds"],
                        ["Ashitills"],
                        ["Táliths"],
                        ["Adendathiels"],
                    ]
                ),
                createCustomSmeltFilterButton("Delicacy", "Blue", 15000,
                    [
                        ["silence"],
                        ["fragmentation"],
                    ]
                ),
                createSubCategory("Scrolls"),
                createCustomSmeltFilterButton("Titanius", "Green", 15000, ["Titanius"]),
                createCustomSmeltFilterButton("Antonius", "Green", 15000, ["Antonius"]),
                createCustomSmeltFilterButton("Lucius", "Green", 15000, ["Lucius"]),
                createCustomSmeltFilterButton("Ichorus", "Green", 12500, ["Ichorus"]),
                createCustomSmeltFilterButton("Opiehnzas", "Green", 10000, ["Opiehnzas"]),
                createCustomSmeltFilterButton("Táliths", "Green", 10000, ["Táliths"]),
                createCustomSmeltFilterButton("Kerrannas", "Green", 10000, ["Kerrannas"]),
                createCustomSmeltFilterButton("Conflict", "Green", 10000, ["Conflict"]),
                createCustomSmeltFilterButton("Heaven", "Green", 10000, ["Heaven"]),
                createCustomSmeltFilterButton("Solitude", "Green", 10000, ["Solitude"]),
                createCustomSmeltFilterButton("Alleluia", "Green", 10000, ["Alleluia"]),
                createCustomSmeltFilterButton("Elimination", "Green", 10000, ["Elimination"]),
            ]),
        ].forEach(category => { quickFiltersSectionCategoriesContainer.appendChild(category) });

        quickFiltersSection.appendChild(customTextFilterContainer);
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
                    createSortButton("Intelligence"),
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

    function highlightHighestMercStat(){
        const form = document.querySelectorAll("#auction_table form")
        form.forEach(form => {
            const auctionItemDiv = form.querySelector(".auction_item_div")
            print(auctionItemDiv.querySelector("div > div > div"))
            const auctionBidDiv = form.querySelector(".auction_bid_div")
        })
    }

    // const HOST = `https://${window.location.host}/game/index.php?`;

    // const TOKEN = getQueryParameterValue("sh");

    setTimeout(() => {

        // const auctionTableOriginal = document.querySelector("#auction_table")
        // const auctionTableClone = auctionTableOriginal.cloneNode(auctionTableOriginal)

        // clean useless text
        document.querySelectorAll("p").forEach(paragraph => {
            paragraph.textContent.contains("If someone overbids you you do") ? paragraph.style.display = "none" : null;
        });

        document.querySelector("#content > article").style.margin = "1rem 0rem";
        document.querySelector("h2.buildingDesc.section-header").style.margin = "1rem 0rem";

        modifyFilterSection();
        overwriteGCASortSection();
        addQuickFilters();
        mercDisplayAttr();
        // highlightHighestMercStat();

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