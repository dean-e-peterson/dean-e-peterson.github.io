"use strict";

// NOTE!!!  Hiding menu only applies to mobile devices.  See CSS.

var showingMenu = false;
function toggleMenu() {
    let navs = document.getElementsByTagName("nav");
    if (showingMenu) {
        // Hide Menu
        for (let nav of navs) {
            nav.classList.add("hide-menu");
        }
        showingMenu = false;
    }
    else {
        // Show Menu
        for (let nav of navs) {
            nav.classList.remove("hide-menu");
        }
        showingMenu = true;
    }
}

