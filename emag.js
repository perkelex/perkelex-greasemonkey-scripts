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

const product_clutter_h2_section = [
    "Produse promovate",
    "Iti mai recomandam si",
    "Cumparate frecvent impreuna",
    "Compara cu produse similare",
    "Alti clienti au vizitat si",
    "Produse similare promovate",
    "Te-ar mai putea interesa si",
    "Linkuri utile",
]

const product_clutter_h2_div = [
    "Alti vizitatori au fost interesati si de"
]

const to_remove_by_id = [
    "mktp-sell-with-emag"
]

setInterval(function() {
    $("div.card-item:contains('Promovat')").remove();

    for (const item of product_clutter_h2_section) {
        $("h2:contains('" + item + "')").parents("section").remove();
    }

    for (const item of product_clutter_h2_div) {
        $("h2:contains('" + item + "')").parents("div.js-nh-recommendations-container").remove();
    }

    for (const item of to_remove_by_id) {
        $("#" + item).remove();
    }

    $("div.mywallet-product-ecredit-pricing").parent("div").remove();

    $(".gdpr-cookie-banner").remove()
}, 2000)