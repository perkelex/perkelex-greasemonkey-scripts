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
        static ofInterest = "rgba(255, 165, 0, 0.5)";
        static smeltForMaterials = "rgba(128, 128, 128, 0.5)";
        static smeltForScrolls = "rgba(255, 255, 255, 0.5)";
    }

    class Items {
        static getQualityFromColor(color){
            switch(color){
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

        static isFoodItem(packageItem) {
            return packageItem.children[1].children[0].classList[0].split("-")[2] === "7"
        }
    }

    function nameToID(name) {
        return name.toLowerCase().replaceAll(" ", "-");
    }

    function showHideElement(element) {
        element.style.display.contains("block") ? element.style.display = "none" : element.style.display = "block";
    }

    function CategoryHeader(name){
        const header = document.createElement("div")
        header.appendChild(document.createTextNode(name))
        header.style.textDecoration = "underline";
        header.style.fontWeight = "bold"
        header.style.margin = "0rem 0.25rem";
        return header
    }

    function SectionHeader(title, action = null) {
        const sectionHeader = document.createElement("h2");
        sectionHeader.classList.add("section-header");
        sectionHeader.setAttribute("id", `${nameToID(title)}`);
        sectionHeader.style.cursor = "pointer";
        sectionHeader.style.userSelect = "none";
        sectionHeader.appendChild(document.createTextNode(title));
        if (action) sectionHeader.addEventListener("click", action);
        return sectionHeader;
    }

    function Section(title) {
        const section = document.createElement("section");
        section.setAttribute("id", `${nameToID(title)}`);
        section.style.minHeight = "45px";
        section.style.display = "block";
        return section;
    }

    function Container(id, children, style) {
        const container = document.createElement("div")
        container.id = id
        // Object.entries(inherentStyle).forEach((prop, value) => {container.setAttribute("style", `${prop}: ${value}`)})
        if (style) Object.entries(style).forEach((prop, value) => {container.setAttribute("style", `${prop}: ${value}`)})
        children.forEach(child => {container.appendChild(child)})
        return container
    }

    function ColumnContainer(id, children, style){
        const columnContainer = Container(id, children, style)
        columnContainer.style.display = "flex"
        columnContainer.style.flexDirection = "column"
        columnContainer.style.gap = "0.25rem";
        columnContainer.style.border = "1px solid black";
        return columnContainer
    }

    function RowContainer(id, children, style){
        const rowContainer = Container(id, children, style)
        rowContainer.style.display = "flex"
        rowContainer.style.flexDirection = "row"
        rowContainer.style.justifyContent = "space-evenly"
        return rowContainer
    }

    function GenericButton(title, criteria) {
        const button = document.createElement("button")
        button.appendChild(document.createTextNode(title));
        button.classList.add("awesome-button")
        button.style.fontSize = "1rem"
        return button
    }

    function en69Packages(name, pack){
        if(location.hostname.contains("s69-en")){
            const itemQuality = pack.querySelector(".leftPackageItemInfo > span").style.color

            const scrolls = [
                /alleluia/i, /elimination/i, /inferno/i,
            ].some(pattern => name.innerText.match(pattern)) && Items.getQualityFromColor(itemQuality).match(/green/i) ? pack.style.background = Constants.smeltForScrolls : null;

            const materials = [
                // prefix
                /dairus/i, /amulius/i, /avalonius/i, /lepidus/i, /sextus/i, /titanius/i, // Dragon Scale - Titanius
                /lucius/i, /fernabasts/i, /tantus/i, /sentarions/i, // Tincture of Stamina - Lucius
                /manius/i, /gaius/i, /belisarius/i, /antonius/i, /titus/i, /quintus/i, /pontius/i, // Crystal - Antonius
                /valerius/i, /mateus/i, /marcellus/i, /constantius/i, /servius/i, /dexterus/i, /giganticus/i, // Amethyst - Antonius
                /accuracy/i, /heaven/i, /sickness/i, // Protection Rune - Opiehnzas

                // suffix
                /silence/i, /fragmentation/i, // Storm of Fortune - Delicacy
                /poison/i, /separation/i, /purposefulness/i, // Scorpion Poison - Assassionation
                /accuracy/i, /heaven/i, /sickness/i, // Protection rune - Heaven
                /love/i, /insanity/i, /solitude/i, // Totem of Healing - Solitude
                // /considerateness/i, /alleluia/i, /recovery/i, // Tincture of Enlightenment - Alleluia
                // /promise/i, /earth/i, // Essence of Reaction - Earth
                // /elimination/i, /aggression/i, // Poison Gland - Elimination
                // /malice/i, /antiquity/i, // Talisman of Power - Malice
                // /rivalry/i, /elysian fields/i, // Diamond - Hell
                // /retribution/i, /hope/i, // Bronze - Hell
                // /hellfire/i, /inferno/i, // Waters of Oblivion - Inferno
            ].some(pattern => name.innerText.match(pattern)) && Items.getQualityFromColor(itemQuality).match(new RegExp(Items.getMinimumQualityRegExStr("Blue"), "i")) ? pack.style.background = Constants.smeltForMaterials : null;

            const interest = [
                /lucius/i, /antonius/i, /Sebastianus/i, /Titanius/i
            ].some(pattern => name.innerText.match(pattern)) ? pack.style.background = Constants.ofInterest : null;

        }
    }

    function ee9Packages(name, pack){
        if (location.hostname.contains("s9-ee")){
            const itemQuality = pack.querySelector(".leftPackageItemInfo > span").style.color

            const scrolls = [
                //prefix
                /Táliths/i, /Ichorus/i, /Opiehnzas/i, /Lucius/i, /Antonius/i, /Sebastianus/i, /Kerrannas/i, /Titanius/i,

                //suffix
                /heaven/i, /solitude/i, /alleluia/i, /earth/i, /elimination/i, /malice/i, /^hell&/i, /inferno/i,
            ].some(pattern => name.innerText.match(pattern)) && Items.getQualityFromColor(itemQuality).match(new RegExp(Items.getMinimumQualityRegExStr("Green"), "i")) ? pack.style.background = Constants.smeltForScrolls : null;

            const materials = [
                // prefix
                /dairus/i, /amulius/i, /avalonius/i, /lepidus/i, /sextus/i, /titanius/i, // Dragon Scale - Titanius
                /lucius/i, /fernabasts/i, /tantus/i, /sentarions/i, // Tincture of Stamina - Lucius
                /zimbris/i, /thorstens/i, /cheggovs/i, // Tincture of Percpetion - Lucius
                /manius/i, /gaius/i, /belisarius/i, /antonius/i, /titus/i, /quintus/i, /pontius/i, // Crystal - Antonius
                /valerius/i, /mateus/i, /marcellus/i, /constantius/i, /servius/i, /dexterus/i, /giganticus/i, // Amethyst - Antonius
                /orlelds/i, /Adendathiels/i, /Táliths/i, /Ashitills/i, // Flintstone - Táliths
                /ichorus/i, /decimus/i, /jennifers/i, /trafans/i, // Sulphur - Ichorus
                /Umbros/i, /Chucks/i, /Xenphlames/i, /Appius/i, // Storm rune - Opiehnzas
                /Kerrannas/i, /Frientas/i, /Zickezackes/i, /Gadriewens/i, // Jute patch - Kerrannas
                /Kosmonas/i, /Mimas/i, /Frabos/i, /Zeindras/i, /Umilawens/i, // Silk - Kerrannas

                // suffix
                /silence/i, /fragmentation/i, // Storm of Fortune - Delicacy
                /poison/i, /separation/i, /purposefulness/i, // Scorpion Poison - Assassionation
                /accuracy/i, /heaven/i, /sickness/i, // Protection rune - Heaven
                /love/i, /insanity/i, /solitude/i, // Totem of Healing - Solitude
                // /considerateness/i, /alleluia/i, /recovery/i, // Tincture of Enlightenment - Alleluia
                // /promise/i, /earth/i, // Essence of Reaction - Earth
                // /elimination/i, /aggression/i, // Poison Gland - Elimination
                // /malice/i, /antiquity/i, // Talisman of Power - Malice
                // /rivalry/i, /elysian fields/i, // Diamond - Hell
                // /retribution/i, /hope/i, // Bronze - Hell
                // /hellfire/i, /inferno/i, // Waters of Oblivion - Inferno
            ].some(pattern => name.innerText.match(pattern)) && Items.getQualityFromColor(itemQuality).match(new RegExp(Items.getMinimumQualityRegExStr("Blue"), "i")) ? pack.style.background = Constants.smeltForMaterials : null;

            const interest = [
                /ichorus/i, /Táliths/i, /Opiehnzas/i, /Lucius/i, /Antonius/i, /Sebastianus/i, /Titanius/i,
            ].some(pattern => name.innerText.match(pattern)) ? pack.style.background = Constants.ofInterest : null;

        }
    }

    setTimeout(() => {
        // Misc
        document.querySelector("#hidePackges").style.display = "none";
        document.querySelector("section.nBot_packages").style.display = "none";
        document.querySelector("article.package-advance-filters > section").style.display = "none"
        Array.from(document.querySelectorAll("h2.section-header")).filter(h2 => h2.textContent.contains("Advanced filters")).forEach(h2 => {h2.addEventListener("click",() => {
            h2.nextElementSibling.style.display === "block" ? h2.nextElementSibling.style.display = "none" : h2.nextElementSibling.style.display = "block"
        })})

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
        const quickFiltersSection = Section("Quick Filters Section");
        const quickFiltersSectionHeader = SectionHeader("Quick Filters", showHideElement.bind(this, quickFiltersSection));

        const filterCategoriesContainer = RowContainer("filter-categories-container", [
            ColumnContainer("test-filter-category", [
                CategoryHeader("Test category"),
                GenericButton("test1"),
                GenericButton("test2"),
            ])
        ])

        quickFiltersSection.appendChild(filterCategoriesContainer)
        packagesArticle.insertBefore(quickFiltersSection, inventory.nextSibling);
        packagesArticle.insertBefore(quickFiltersSectionHeader, inventory.nextSibling);


        setInterval(() => {

            const packs = document.querySelectorAll(".packageItem");
            packs.forEach(pack => {
                pack.style.margin = "0rem 0.5rem"

                if (Items.isFoodItem(pack)) return

                const opacity = pack.style.opacity;

                // pack.setAttribute("style", `margin: 0rem 0.5rem !important; opacity: ${opacity}`);

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

                en69Packages(name, pack)
                ee9Packages(name, pack)

                parseInt(duration.dataset.tickerTimeLeft) < Constants.oneDayInMilliseconds ? duration.parentNode.style.background = "rgba(255, 0, 0, 0.5)" : null;
            });

            Array.from(document.querySelectorAll("h2.section-header")).filter(node => node.innerText.contains("Content")).forEach(node => {node.innerText = `Content: ${packs.length} packages`;});
        }, 1000);
    }, 500);
})();