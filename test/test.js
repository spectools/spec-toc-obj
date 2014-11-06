var jsdom = require("jsdom"),
    assert = require("assert"),
    toc = require("../index");

suite("Find ToC", function() {
    test("test WHATWG spec", testFixture("./fixtures/fetch.html"));
    test("test CSS WG spec", testFixture("./fixtures/css-scoping.html"));
    test("test Web components-based spec", testFixture("https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html"));
});

function testFixture(file) {
    return function(done) {
        jsdom.env(file, function(err, window) {
            if (err) {
                assert.fail(err.message);
                done();
                return;
            }
            assert(toc(window));
            done();
        });
    }
}