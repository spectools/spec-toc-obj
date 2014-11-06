Spec-toc-obj
============

Takes a `window` object and returns the uppermost list container of the Table
of Content of a W3C or WHATWG spec.

Known issues
------------

A test currently fails due to the limitations of jsdom CSS selector (which, for now, doesn't recognize the `/deep/` selector that matches elements within the shadow dom).
