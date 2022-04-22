require("trix")
require("@rails/actiontext")
require("@rails/activestorage").start()
require("turbolinks").start()// Support component names relative to this directory:
const images = require.context('../images', true)
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);
window.Turbolinks = Turbolinks;
