// ==UserScript==
// @name     Emag
// @version  1
// @grant    none
// @match    https://www.emag.ro/*
// @require  https://code.jquery.com/jquery-3.6.3.slim.min.js
// ==/UserScript==


// emag unhide reviews
// Array.from(document.getElementsByClassName('reviews-customer-images')).forEach(element => element.style.display = "block");
// Array.from(document.getElementsByClassName('reviews-sort-options')).forEach(element => element.style.display = "block");
// Array.from(document.getElementsByClassName('product-conversations-list')).forEach(element => element.style.display = "block");
// Array.from(document.getElementsByClassName('js-reviews-paginator-container')).forEach(element => element.style.display = "block");
// Array.from(document.getElementsByClassName('btn-view-all-reviews')).forEach(element => element.style.display = "block");

// $("div.card-item:contains('Promovat')").remove();

console.log($("div.card-item:contains('Promovat')"));