// ==UserScript==
// @name         Arena Provinciarum
// @namespace    http://tampermonkey.net/
// @version      2024-07-03
// @description  meck lyf easier
// @author       You
// @match        https://*.gladiatus.gameforge.com/game/index.php?mod=arena&submod=serverArena&aType=2*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    setTimeout(() => {

        let af = Array.from;

        const ranking = document.querySelector("#own2");
        const opponentsLinksList = af(ranking.querySelectorAll("a"))
        opponentsLinksList.forEach(opponent => { opponent.target = "_self" });

        console.log(opponentsLinksList[0]);
        //https://s62-en.gladiatus.gameforge.com/game/index.php?mod=player&p=443530246&language=en

        let result = fetch(opponentsLinksList.at(0).href);

        console.log(result);

    }, 500);

})();


// fetch("https://jsonplaceholder.typicode.com/todos", {
//     method: "POST",
//     body: JSON.stringify({
//       userId: 1,
//       title: "Fix my bugs",
//       completed: false
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8"
//     }
//   });
