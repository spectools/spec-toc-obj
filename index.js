"use strict";

var _filter = Array.prototype.filter;

function findToc(window) {
    var fragment = window.document.createDocumentFragment();
    var node = window.document.querySelector(".toc");
    if (node) {
        fragment.appendChild(node);
    }
    if (!node) {
        node = findTocTitle(window);
    }
    collectLists(node, fragment);
    
    if (fragment.childNodes.length) return fragment;
    // Special case for Web-Component-based EDs. (Yes, that's a thing!)
    try {
        node = window.document.querySelector("spec-toc /deep/ ol");
        if (node) {
            fragment.appendChild(node);
            collectLists(node, fragment);
            return fragment;
        }
    } catch(e) {}
    return null;
}

function collectLists(node, fragment) {
    while (node && (node = node.nextSibling)) {
        if (isList(node)) fragment.appendChild(node);
        if (isH2(node)) return;
    }
}

function isList(node) {
    var t = node.tagName;
    return t == "OL" || t == "UL";
}

function isH2(node) {
    var t = node.tagName;
    return t == "H2";
}



function findTocTitle(window) {
    var windows = [window];
    for (var i = 0; i < window.frames.length; i++) {
        windows.push(window.frames[i]);
    }
    for (var i = 0; i < windows.length; i++) {
        var node = _filter.call(windows[i].document.querySelectorAll("h2"), function(h2) {
            return h2.textContent.trim().toLowerCase() == "table of contents";
        })[0];
        if (node) return node;
    }
    return null;
}

module.exports = findToc;