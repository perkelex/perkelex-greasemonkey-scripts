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
        // arenas
        /turma/i,
        /arena/i,
        /provinciarum/i,

        // grind
        /Mesoai\-Oasis/i, // s69 expedition
        /In the Heart of Decay/i, //s69 dungeon

        /caravan/i,
        /Fairground/i,
        /opponents at expeditions/i,

        //misc
        /items/i,
    ]
    const questsToRemoveAnyway = [
        /defeat each opponent at least once/i,
        /succession/i,
        /defeat [0-9]+ (?!(opponents|enemies))/i,
        /In the Heart of Decay: Defeat the boss in this dungeon/i,
    ]

    setTimeout(() => {
        document.querySelectorAll(".contentboard_slot_inactive").forEach(quest => {
            let iWantItGone = true;

            if (quest.querySelector(".quest_slot_time")){
                quest.style.display = "none";
                return
            }

            const questTitle = quest.querySelector(".quest_slot_title").textContent.toLowerCase();

            for (const keepRegEx of questsToKeep) {
                if (questTitle.match(keepRegEx)) {
                    iWantItGone = false;
                }
            }

            for (const removeAnywayRegEx of questsToRemoveAnyway) {
                if (questTitle.match(removeAnywayRegEx)) {
                    iWantItGone = true;
                }
            }

            iWantItGone ? quest.style.display = "none" : null;
        });
    }, 500);
})();