const routes = require("next-routes");

module.exports = routes()
    .add("search", "/:subpath(ua|)?", "Search")
    .add("about", "/:subpath(ua|)?/about", "About");
