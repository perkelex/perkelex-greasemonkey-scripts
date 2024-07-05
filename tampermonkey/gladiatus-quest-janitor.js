// ==UserScript==
// @name         Gladiatus quest janitor
// @namespace    http://tampermonkey.net/
// @version      2024-07-03
// @description  meck lyf easier
// @author       You
// @match        https://*.gladiatus.gameforge.com/game/index.php?mod=quests*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const questsToKeep = ["turma", "items", "barbarian village", "opponents at expeditions", "in enemy hands"]
    const questsToRemoveAnyway = ["defeat each opponent at least once", "succession"]

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