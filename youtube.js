// ==UserScript==
// @name     Youtube
// @version  1
// @grant    none
// @include  https://www.youtube.com/
// @include  https://www.youtube.com/feed/subscriptions
// @include  https://www.youtube.com/result/*
// @include  https://www.youtube.com/watch=*
// @match    https://www.youtube.com/*
// @require  https://code.jquery.com/jquery-3.6.3.slim.min.js
// ==/UserScript==

const youtubeURL = "youtube.com";
const subscriptionsURL = "/feed/subscriptions/";

setInterval(function() {
    if (location.href.includes(youtubeURL) || location.href.includes(subscriptionsURL) || location.href.includes("watch")){
        removeShortsCategory();
        purgeShortsInSearch();
        purgeClandestineShortsSection();
        purgeShortVideos();
        removeShortsFromSearchResults();
        removePeopleAlsoSearchedFor();
        removeEndOfVideoCards();
        removeMembersOnlyContent();
    }
}, 2000);

function purgeShortVideos(durationSec=60){
    $("div#items").each(element => {
        videoTime = $(element).find("ytd-thumbnail-overlay-time-status-renderer span").outerText;
        if (videoTime && timeToSeconds(videoTime) <= durationSec){
            $(element).remove();
        }
    });
}

function removeShortsCategory(){
    $("a[title='Shorts']").remove();
}

function purgeShortsInSearch(){
    $("a#thumbnail[href*='/shorts/']").parents("ytd-rich-item-renderer").remove();
    $("a#thumbnail[href*='/shorts/']").parents("ytd-video-renderer").remove();
}

function purgeClandestineShortsSection(){
    $("ytd-rich-section-renderer.style-scope.ytd-rich-grid-renderer").remove();
}

function removeShortsFromSearchResults(){
    $("ytd-reel-shelf-renderer").remove();
}

function removePeopleAlsoSearchedFor(){
    $("ytd-horizontal-card-list-renderer").remove();
}

function removeEndOfVideoCards(){
    $("div.ytp-ce-element").remove();
}

function removeMembersOnlyContent(){
    $("ytd-rich-item-renderer div.members-only").remove();
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
