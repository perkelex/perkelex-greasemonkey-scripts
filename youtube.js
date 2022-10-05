// ==UserScript==
// @name     Youtube hide shorts
// @version  1
// @grant    none
// @include  https://www.youtube.com/
// @include  https://www.youtube.com/feed/subscriptions
// ==/UserScript==

function waitAndPurgeShorts(delay){
    setTimeout(() => {
        document.querySelectorAll("ytd-grid-video-renderer").forEach(video => {
            video.querySelector("a[href*='/shorts/']") ? video.remove() : null;
        });
    }, delay);
}

if (location.href.includes("/feed/subscriptions")){
    waitAndPurgeShorts(3000);
}
else{
    let intervalRef = setInterval(() => {
        let subs = document.querySelector("a#endpoint[href='/feed/subscriptions']");
        if (subs) {
            subs.addEventListener("click", () => waitAndPurgeShorts(3000));
            clearInterval(intervalRef);
        }
    }, 500);
}
