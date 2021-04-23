const routes = require("next-routes");

module.exports = routes()
    .add("search", "/:subpath(ua|)?", "Search1")
    .add("about", "/:subpath(ua|)?/about", "About");
