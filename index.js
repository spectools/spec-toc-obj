"use strict";

var _filter = Array.prototype.filter;

function findToc(window) {
    var toc = window.document.getElementsByClassName("toc");
    if (toc.length) return toc[0];
    var node = findTocTitle(window);
    while (node && (node = node.nextSibling)) {
        if (node.tagName == "OL" || node.tagName == "UL") return node;
    }

    // Special case for Web-Component-based EDs. (Yes, that's a thing!)
    try {
        return window.document.querySelector("spec-toc /deep/ ol");
    } catch(e) {
        return null;
    }
}

function findTocTitle(window) {
    var windows = [window];
    for (var i = 0; i < window.frames.length; i++) {
        windows.push(window.frames[i]);
    }
    for (var i = 0; i < windows.length; i++) {
        var node = _filter.call(windows[i].document.getElementsByTagName("h2"), function(h2) {
            return h2.textContent.trim().toLowerCase() == "table of contents";
        })[0];
        if (node) return node;
    }
    return null;
}

module.exports = findToc;