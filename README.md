# Into the Matrix

This is an implementation of the famous Matrix effect in _JavaScript_. It is focused on reproducing the effect as it was shown in the first movie as accurate as possible.

To get you started quickly, the repo comes with a demo that shows you how to embed the effect into your own website. If you just want to put this effect on your screen, the demo is all you need.

![Into the Matrix](./docs/into-the-matrix.jpg)

## Concept

The _Matrix_ object can be attached to a container which needs to have a defined size and height via _absolute_, _relative_  or _fixed_ positioning. The effect will work best out of the box, but it can be adjusted via an _options_ object that is passed into the `Matrix` constructor. Check out [`./src/matrix.js`](./src/matrix.js) to check out all options and their defaults.

The _Matrix_ object has a `run()` and a `stop()` method to start/stop the animation. Alternatively you can call the `render()` function directly to execute the next render step.

In each render step
* the _Matrix_ object will create _Trickles_ at random positions on the x-axis with a given probability
* each _Trickle_ will drop a new _Symbol_, which will create the "trickle down" effect
* each _Symbol_ will gradually fade out and change its character with a given probability. The fade out speed varies between _Symbols_ to create variation in _Trickle_ length.

The software will also take care of deleting faded out _Symbols_ and _Trickles_ that have reached the container's bottom edge.

## Setup

[_NodeJS_](https://nodejs.org/en/) and [_npm_](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) are prerequisites to build and develop this software.

Install the dependencies with `$ npm install`.

This software uses _NodeJS_ dependencies which won't run in the web browser unless they are compiled into native _JavaScript_ (a process called "building" which is done by the _Webpack_ dependency).

Build the package with `$ npm run build`. This will create a file [`./dist/bundle.js`](./dist/bundle.js) that you can use in your web application.

## Use

The simplest way to run the matrix effect is to open [`./demo/index.html`](./demo/index.html) in your web browser. The effect looks best if the browser is run in fullscreen mode (press <kbd>F11</kbd> on most browser to enter/leave fullscreen mode).

When you load the page, the number of trickles will be determined by the width of the container. In the demo this is equal to the width of the viewport. If you change the size of the browser window, it's best to refresh the page to update the number of trickles.

The demo also comes with a toolbar that will become visible if you move the mouse pointer to the lower edge of the window. It shows stats about the rendering and buttons to start and stop the animation.

## Develop

The source code of the demo will also show you how to use the package.

If you want to change the source code, you can use `$ npm run watch` to automatically re-build the package whenever you save changes. You still have to refresh the webpage though.

## Limitations

The software is **not** optimized for performance yet. For a large area to cover, you will need a processor with good single-thread performance to have a fluid animation.

## Sources & Attribution

* [Matrix Digital Rain](https://en.wikipedia.org/wiki/Matrix_digital_rain) explained on Wikipedia
