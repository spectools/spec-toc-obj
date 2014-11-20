Spec-toc-obj
============

Takes a `window` object and returns referencs to all first level list containers
of the Table of Content of a W3C or WHATWG spec in a document fragment.

Known issues
------------

A test currently fails due to the limitations of jsdom CSS selector (which, for now, doesn't recognize the `/deep/` selector that matches elements within the shadow dom).
