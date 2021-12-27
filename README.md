# Into the Matrix

Become the Operator with this _JavaScript_ implementation of the famous Matrix effect as it was shown in the first movie in 1999. 

![Into the Matrix](./docs/into-the-matrix.jpg)

To get you started quickly, this repo comes with a demo that you can throw onto your screen in fullscreen mode as it is. If you want to embed the effect into your website, the demo shows you how it's done.

## Concept

The _Matrix_ object can be attached to a container which needs to have a defined size and height via _absolute_, _relative_  or _fixed_ positioning. The effect will work best out of the box, but it can be adjusted via an _options_ object that is passed into the `Matrix` constructor. Check out [`./src/matrix.js`](./src/matrix.js) to see all options and their default values.

The _Matrix_ object has a `run()` and a `stop()` method to start/stop the animation. Alternatively you can call the `render()` function directly to execute the next render step.

In each render step
* the _Matrix_ object will create _Trickles_ at random positions on the x-axis with a given probability
* each _Trickle_ will drop a new _Symbol_ one step down on the y-axis, which will create the "trickle down" effect
* each _Symbol_ will gradually fade out and change its character with a given probability. The fade out speed varies between _Symbols_ to create variation in the length of the _Trickles_

The software will also take care of deleting faded out _Symbols_ and _Trickles_ that have reached the container's bottom edge.

## Setup

[_NodeJS_](https://nodejs.org/en/) and [_npm_](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) are prerequisites to build and develop this software.

Install the dependencies with `$ npm install`.

This software uses _NodeJS_ dependencies which won't run in the web browser unless they are compiled into native _JavaScript_ (a process called "building" which is done by the _Webpack_ dependency).

Build the package with `$ npm run build`. This will create a file [`./dist/bundle.js`](./dist/bundle.js) that you can use in your web application.

## Use

The simplest way to run the matrix effect is to open [`./demo/index.html`](./demo/index.html) in your web browser. The effect looks best if the browser is run in fullscreen mode (press <kbd>F11</kbd> on most browser to enter/leave fullscreen mode).

The demo also comes with a status bar that will become visible if you move the mouse pointer to the lower edge of the window. It shows stats about the rendering and buttons to start and stop the animation.

If you change the size of the window, the _Matrix_ will automatically adapt its number of columns and length of the _Trickles_. You will see how the number of trickles and with it the rendering time changes in the status bar after the resize.

## Develop

The source code of the demo will also show you how to use the package.

If you want to change the source code, you can use `$ npm run watch` to automatically re-build the package whenever you save changes. You still have to refresh the webpage though.

## Limitations

The software is **not** optimized for performance yet. For a large area to render in a fluid animation, you will need a processor with strong single-thread performance (as JavaScript is not multi-threaded by its nature).

## Sources & Attribution

* [Matrix Digital Rain](https://en.wikipedia.org/wiki/Matrix_digital_rain) explained on Wikipedia
