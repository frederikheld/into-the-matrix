# Into the Matrix

Rewrite of the initial implementation in TypeScript.

## Goals

* Fix performance issue caused by the rendering approach
* Rewrite in TypeScript
* Better documentation for classes and functions

## Dev

This project uses [Vite](https://vite.dev/) as build system.

Start the development mode with

```sh
$ npm run dev
```

## Tech & Concepts

The main challenge of this project is performance: how can hundrets or thousands of elements rendered and updated fluidly.

The solution involves using [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) and using a [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM).

### Literature

* [Shadow DOM vs. Virtual DOM](https://medium.com/duomly-blockchain-online-courses/shadow-dom-vs-virtual-dom-what-is-the-difference-f2611da536ab)
