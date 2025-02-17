# Multi Core Frameset Demo

Browsers don't allow webworkers to run in local files. This is why you have to start a local webserver and access the file via its (local) web url.

First you have to build the package as described in the [main README](../../README.md).

Then start the server with:

```sh
$ npm start
```

You can also start it in watch mode to have the server automatically re-started on file changes:

```sh
$ npm run watch
```

Note: this will not watch changes in the main package but only changes to the Multi Core Frameset code!
