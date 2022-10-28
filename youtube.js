// ==UserScript==
// @name     Youtube
// @version  1
// @grant    none
// @include  https://www.youtube.com/
// @include  https://www.youtube.com/feed/subscriptions
// ==/UserScript==

const youtubeURL = "youtube.com";
const subscriptionsURL = "/feed/subscriptions/";

const spammers = ["Chris Williamson", "În Dodii"];

setInterval(() => {
    if (location.href.includes(youtubeURL) || location.href.includes(subscriptionsURL)){
        videos = document.querySelectorAll("ytd-grid-video-renderer");
        purgeShorts(videos);
        purgeShortVideosFromCreators(videos, spammers);
    }
}, 10000);

function purgeShorts(videoList){
    videoList.forEach(video => {
        video.querySelector("a[href*='/shorts/']") ? video.remove() : null;
    });
}

function purgeShortVideosFromCreator(videoList, creatorName){
    videoList.forEach(video => {
        const creator = video.querySelector("a.yt-formatted-string").textContent;
        const videoTime = video.querySelector("ytd-thumbnail-overlay-time-status-renderer span").textContent.replace(/[\r\n\s]/gm, "");
        console.log(`${creator}, ${timeToSeconds(videoTime)}`);
        (creator === creatorName && timeToSeconds(videoTime) < 1800) ? video.remove() : null;
    });
}

function purgeShortVideosFromCreators(videoList){
    spammers.forEach(spammer => purgeShortVideosFromCreator(videoList, spammer));
}

// converts hh:mm:ss to seconds for sane processing of time
function timeToSeconds(timeStr){
    const timeArr = timeStr.split(":");
    switch(timeArr.length){
        case 3:
            return Number(timeArr[0]) * 3600 + Number(timeArr[1]) * 60 + Number(timeArr[2]);
        case 2:
            return Number(timeArr[0]) * 60 + Number(timeArr[1]);
        case 1:
            return Number(timeArr[0]);
    }
}