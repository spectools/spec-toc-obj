"use strict";

var _filter = Array.prototype.filter;

function ToC(doc) {
    this.fragment = doc.createDocumentFragment();
};

ToC.prototype.push = function(node) {
    this.fragment.appendChild(node.cloneNode(true));
};

ToC.prototype.isEmpty = function() {
    return this.fragment.childNodes.length == 0;
};

function findToc(window) {
    var toc = new ToC(window.document);
    var node = window.document.querySelector(".toc");
    if (node) {
        toc.push(node);
    } else {
        node = findTocTitle(window);
    }
    collectLists(node, toc);
    
    if (!toc.isEmpty()) return toc.fragment;
    // Special case for Web-Component-based EDs. (Yes, that's a thing!)
    try {
        node = window.document.querySelector("spec-toc /deep/ ol");
        if (node) {
            toc.push(node);
            collectLists(node, toc);
            return toc.fragment;
        }
    } catch(e) {}
    return null;
}

function collectLists(node, toc) {
    while (node && (node = node.nextSibling)) {
        if (isList(node)) toc.push(node);
        if (isH2(node)) return;
    }
}

function isList(node) {
    var t = node.tagName;
    return t == "OL" || t == "UL";
}

function isH2(node) {
    return node.tagName == "H2";
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