// ==UserScript==
// @name         Gladiatus guides
// @namespace    http://tampermonkey.net/
// @version      2024-07-03
// @description  meck lyf easier
// @author       You
// @match        https://gladiatus.gamerz-bg.com/item-prefixes
// @match        https://gladiatus.gamerz-bg.com/item-suffixes
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function cellContains(td, ...wordList) {
        return Array.from(wordList).every(word => td.textContent.match(new RegExp(word, "i")))
    }

    setTimeout(() => {
        const agility = /Agility \+2\d/i
        const dexterity = /Dexterity \+2\d/i
        const charisma = /Charisma \+2\d/i
        const intelligence = /Intelligence \+2\d/i

        const dexAgi = []
        const dexCha = []
        const dexInt = []
        const agiCha = []
        const agiInt = []
        const chaInt = []
        const dexAgiCha = []
        const dexAgiInt = []



        const tables = Array.from(document.querySelectorAll("table")).filter(table => table.style.backgroundColor === "rgb(0, 0, 0)")
        tables.forEach(table => {
            const statsCell = table.querySelector("tbody").children[1].children[1]
            if (statsCell && cellContains(statsCell, dexterity, agility)){
                dexAgi.push(table)
            } else if(statsCell && cellContains(statsCell, dexterity, charisma)){
                dexCha.push(table)
            } else if(statsCell && cellContains(statsCell, dexterity, intelligence)){
                dexInt.push(table)
            } else if(statsCell && cellContains(statsCell, agility, charisma)){
                agiCha.push(table)
            } else if(statsCell && cellContains(statsCell, agility, intelligence)){
                agiInt.push(table)
            } else if(statsCell && cellContains(statsCell, charisma, intelligence)){
                chaInt.push(table)
            } else if(statsCell && cellContains(statsCell, dexterity, agility, charisma)){
                dexAgiCha.push(table)
            } else if(statsCell && cellContains(statsCell, dexterity, agility, intelligence)){
                dexAgiInt.push(table)
            }
        })

        console.log("====================== Dexterity Agility ======================")
        dexAgi.forEach(table => {
            console.log(table)
            console.log(table.querySelector("tbody").children[0].children[1].querySelector("span").textContent)
        })

        console.log("====================== Dexterity Charisma ======================")
        dexCha.forEach(table => {
            console.log(table)
            console.log(table.querySelector("tbody").children[0].children[1].querySelector("span").textContent)
        })

        console.log("====================== Dexterity Intelligence ======================")
        dexInt.forEach(table => {
            console.log(table)
            console.log(table.querySelector("tbody").children[0].children[1].querySelector("span").textContent)
        })

        console.log("====================== Agility Charisma ======================")
        agiCha.forEach(table => {
            console.log(table)
            console.log(table.querySelector("tbody").children[0].children[1].querySelector("span").textContent)
        })

        console.log("====================== Agility Intelligence ======================")
        agiInt.forEach(table => {
            console.log(table)
            console.log(table.querySelector("tbody").children[0].children[1].querySelector("span").textContent)
        })

        console.log("====================== Charisma Intelligence ======================")
        chaInt.forEach(table => {
            console.log(table)
            console.log(table.querySelector("tbody").children[0].children[1].querySelector("span").textContent)
        })

        console.log("====================== Dexterity Agility Charisma ======================")
        dexAgiCha.forEach(table => {
            console.log(table)
            console.log(table.querySelector("tbody").children[0].children[1].querySelector("span").textContent)
        })

        console.log("====================== Dexterity Agility Intelligence ======================")
        dexAgiInt.forEach(table => {
            console.log(table)
            console.log(table.querySelector("tbody").children[0].children[1].querySelector("span").textContent)
        })

    }, 500)
})();