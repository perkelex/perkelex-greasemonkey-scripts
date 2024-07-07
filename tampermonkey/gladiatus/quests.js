// ==UserScript==
// @name         Quests
// @namespace    http://tampermonkey.net/
// @version      2024-07-03
// @description  meck lyf easier
// @author       You
// @match        https://*.gladiatus.gameforge.com/game/index.php?mod=quests*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const questsToKeep = [
        "turma",
        "items",
        "bandit camp", // big account expedition
        "wolf cave", // small account expedition
        "opponents at expeditions",
        "in enemy hands", // big account dungeon
        "the cave of dark intrigue", // small account dungeon
    ]
    const questsToRemoveAnyway = [
        "defeat each opponent at least once",
        "succession"
    ]

    setTimeout(() => {
        document.querySelectorAll(".contentboard_slot_inactive").forEach(quest => {
            let iWantItGone = true;

            const questTitle = quest.querySelector(".quest_slot_title").textContent.toLowerCase();

            for (const keepKeyword of questsToKeep) {
                if (questTitle.contains(keepKeyword)) {
                    iWantItGone = false;
                }
            }

            for (const removeAnywayKeyword of questsToRemoveAnyway) {
                if (questTitle.contains(removeAnywayKeyword)) {
                    iWantItGone = true;
                }
            }

            iWantItGone ? quest.style.display = "none" : null;
        });
    }, 500);
})();