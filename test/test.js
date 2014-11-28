"use strict";

var jsdom = require("jsdom"),
    assert = require("assert"),
    toc = require("../index");

suite("Find ToC", function() {
    test("idempotence", function(done) {
        jsdom.env("./fixtures/fetch.html", function(err, window) {
            if (err) {
                assert.fail(err.message);
            } else {
                assert.equal(toc(window).childNodes.length, toc(window).childNodes.length);
            }
            done();
        });
    });
    test("test WHATWG spec", testFixture("./fixtures/fetch.html"));
    test("test CSS WG spec", testFixture("./fixtures/css-scoping.html"));
    test("test Web components-based spec", testFixture("https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html"));
    test("test WOFF spec", testFixture("./fixtures/WOFF.html"));
});

function testFixture(file) {
    return function(done) {
        jsdom.env(file, function(err, window) {
            if (err) {
                assert.fail(err.message);
            } else {
                assert(toc(window));
            }
            done();
        });
    }
}