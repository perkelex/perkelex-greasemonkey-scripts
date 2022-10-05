// ==UserScript==
// @name     Youtube hide shorts
// @version  1
// @grant    none
// @match    https://www.youtube.com/
// ==/UserScript==

function waitAndPurgeShorts(delay){
    setTimeout(() => {
        document.querySelectorAll("ytd-grid-video-renderer").forEach(video => {
            video.querySelector("a[href*='/shorts/']") ? video.remove() : null;
        });
    }, delay);
}

let intervalRef = setInterval(() => {
    let subs = document.querySelector("a#endpoint[href='/feed/subscriptions']");
    if (subs) {
        subs.addEventListener("click", () => waitAndPurgeShorts(3000));
        clearInterval(intervalRef);
    }
}, 500);
