// ==UserScript==
// @name     Google
// @version  1
// @grant    none
// @match    https://www.google.com/search*
// @require  https://code.jquery.com/jquery-3.6.3.slim.min.js
// ==/UserScript==

setInterval(function() {
    $("span:contains('People also ask')").parents().eq(5).remove();
    $("span:contains('Top stories')").parents().eq(7).remove();
    $("span:contains('Related searches')").parents().eq(7).remove();
}, 2000);