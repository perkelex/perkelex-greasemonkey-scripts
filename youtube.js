// ==UserScript==
// @name     Youtube hide shorts
// @version  1
// @grant    none
// @match    https://www.youtube.com/feed/subscriptions
// ==/UserScript==

setTimeout(() => {
    document.querySelectorAll("ytd-grid-video-renderer").forEach(video => {
        video.querySelector("a[href*='/shorts/']") ? video.remove() : null;
    });
}, 5000);