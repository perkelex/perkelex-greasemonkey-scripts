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
        "mesoai-oasis", // s69 expedition
        "Under a Blood-red Sky", // s69 dungeon
        "opponents at expeditions",
    ]
    const questsToRemoveAnyway = [
        "defeat each opponent at least once",
        "succession"
    ]

    setTimeout(() => {
        document.querySelectorAll(".contentboard_slot_inactive").forEach(quest => {
            let iWantItGone = true;

            if (quest.querySelector(".quest_slot_time")){
                quest.style.display = "none";
                return
            }

            const questTitle = quest.querySelector(".quest_slot_title").textContent.toLowerCase();

            for (const keepKeyword of questsToKeep) {
                if (questTitle.contains(keepKeyword.toLowerCase())) {
                    iWantItGone = false;
                }
            }

            for (const removeAnywayKeyword of questsToRemoveAnyway) {
                if (questTitle.contains(removeAnywayKeyword.toLowerCase())) {
                    iWantItGone = true;
                }
            }

            iWantItGone ? quest.style.display = "none" : null;
        });
    }, 500);
})();