# Into the Matrix

Rewrite of the initial implementation in TypeScript.

## Goals

* Fix performance issue caused by the rendering approach
* Rewrite in TypeScript
* Better documentation for classes and functions

> The main challenge of this project is performance: how can hundrets or thousands of elements rendered and updated fluidly?

## Dev

This project uses [Vite](https://vite.dev/) as build system.

Start the development mode with

```sh
$ npm run dev
```

## Approaches

I wrote the same setup in traditional [class-less](./index-assign.html) oop style and modern [class-based](./index-oop.html) oop style.

For 5000 symbols, class-based reaches ~3 FPS while class-less gets ~5 FPS. Clear win for class-less.

> Note: I'm not sure if this is related to the oop approach or more to the fact that the class-based approach adds more nodes in the tree than the much leaner class-less implementation. But I couldn't figure out how to use less elements in the class-based approach, so this might be implcitly caused by the approach.

Using an image to render the chars as `background-image` is about as performant as rendering the chars as `::after content` via `data-attr`. This might become more performant as soon as we add shadows.

Putting all images on a sprite and moving the `::before` element via `transform: translateX()` to show the selected char sounds performant in theory (because it's only one image and it is moved via a GPU transform operation), but it is in fact insanely slow

### Caveat!

If you run the comparison, make sure that

* all symbols are inside the viewport! Browsers might not render off-screen elements.
* you close the developer console! It adds a considerable performance penalty.

## Tech & Concepts

The solution involves using [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) <s>and using a [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)</s>.

> Note: the Shadow DOM has nothing to do with performance. I should try a virtual DOM instead, but it is way more complicated to implement and might not even bring performance improvements as I always change all elements.

It is okay if page load is slow, if this makes rendering faster at runtime. E.g. `Math.random()` should be run at page load to generate arrays that can simply be iterated at runtime.

> Note: it doesn't seem to make a different in performance if using `Math.random()` at runtime or iterating through a pre-randomized array. The latter feels more like random noise though, but I actually prefer the pseudo-random look of `Math.random()`.

I tried to use FastDom to queue layout recalculactions but it did not improve anything.

### More ways to improve performance

* using `Set` instead of `Array`
* using class-less instead of class-based oop style (see above)
* changing as little CSS values as possible in each render cycle
* using CSS properties that get rendered by the GPU (e.g. `transform`)
* implement a frame limiter to even out frame times (I'm not sure how much this acutally helps and the bigger struggle is to reach a decent frame time in the first place)
* when changing the `background-color` of a Symbol, it is faster to change it via `el.style.backgroundColor` (~9 fps) than via removing and adding classes that style the element (~6 fps).
* changing `innerText` to a random char is about 2 frames faster than doing `transform: rotate`, althoug it is not being rendered on the GPU.
* using the `attr` approach to change the text gets us up to 10 fps on average, but with varying fps. This is the fastest approach yet.

    > **JavaScript:**
    > ```js
    > // el has class `symbol`
    > el.setAttribute('data-content', getRandomChar(chars))
    > ```

    > **CSS:**
    > ```css
    > .symbol::before {
    >   content: attr(data-content);
    > }
    > ```

    Note that text that is being added like this can't be selected with the mouse, which might be a benefit for this project (could be done with `user-select: none;` otherwise).

### Things that don't improve performance

* it doesn't make a difference if I use a `conic-gradient` as background image for the Symbols or a exernal image loaded via `url`
* setting `visibility: hidden`, then rendering all Symbols, then setting `visibility: visible` to the Matrix might slightly improve performance, but I'm not actually sure. The same goes for `display: none` and `opacity: 0`.
* changing `background-image` instead of rendering a char as content is way slower.

### Literature

* [Shadow DOM vs. Virtual DOM](https://medium.com/duomly-blockchain-online-courses/shadow-dom-vs-virtual-dom-what-is-the-difference-f2611da536ab)
* [Operations that cause Layout Thrashing](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
* A solution to Layout Thrashing: [FastDom](https://github.com/wilsonpage/fastdom); how FastDom relates to `requestAnimationFrame()`: [Preventing 'layout thrashing'](https://sking7.github.io/articles/449317090.html) by the author of FastDom.
