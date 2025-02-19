# Design Guideline

## Improve performance

* no DOM queries (e.g. `document.getElementById()`) in render() function
* everything that needs to be calculated exactly once, has to happen in `constructor()` or `createElement()`
