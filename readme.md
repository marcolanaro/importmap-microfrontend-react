# Importmap and microfrontend architecture

## Introduction

#### Importmap

Recently Chrome has released [importmap](https://github.com/WICG/import-maps) implementation.

At this moment in time, the `import` directive is covered by 92.32% of the browsers. If your product needs to support evergreen browsers only, you can easily deploy es modules without much transpilation, then polyfill importmap with [es-module-shims](https://github.com/guybedford/es-module-shims).

#### Microfrontend

This play very well with the idea of [microfrontends](https://micro-frontends.org/) where every component is deployed independently. I truly suggest to have a look at [single-spa](https://single-spa.js.org/): one of the best framework to implement microfrontend.


In the scenario where you have constrains on the type of browser you need to support and the `import` directive is not available, you have to use [systemjs](https://github.com/systemjs/systemjs.).
Single-SPA provides bindings, routing and templating for all the main frameworks. It leverages systemjs and uses [import-map-overrides](https://github.com/joeldenning/import-map-overrides) for a low friction development.

Note: not the scope of this experiment to analyse pro and cons of microfrontends. Low friction development does not means that the cost is reduced: it is moved on a more complex CI, infrastructure and architecture.

#### Unbundled development

This is the idea of avoiding bundling the application during development. Increase the dev experience and doesn't require much effort to deploy to evergreen browsers.
Have a look at projects like [snowpack](https://www.snowpack.dev/) and [vitejs](https://vitejs.dev/.).

## This experiment

#### Requirements

I want to test a microfrontend architecture that allow me get the benefits of unbundled development while requiring old browser support, i.e. systemjs bundles.
Being able to develop umbundled would enable me for a smooth transition from systemjs to es modules when I will not be required to support old browsers.

#### What I did

I decided to use:
- [vitejs](https://vitejs.dev/.) because the deeper integration with rollup allow me to compile libraries easily.
- [react](https://reactjs.org/) because it's mainstram, the same can be applied for other frameworks.
- use of [import-map-overrides](https://github.com/joeldenning/import-map-overrides) in case you need to consume a different local library.

###### Development

On every package, you just need `npm run dev`.

- You can develop `ui` in isolation on [http://localhost:5002](http://localhost:5002).
- You can develop `app` in integration with `ui`, but isolated from anything else on [http://localhost:5001](http://localhost:5001).
- You can develop `index` in integration with `app` and `ui` on [http://localhost:5000](http://localhost:5000).

###### Production

On every package, build with `npm run build`, run with `npm run serve`.

Visit [http://localhost:5000](http://localhost:5000).

- The `index` project would deploy a static `index.html` that defines importmap for react and the microfrontend libraries.
- The `app` and the `ui` packages are two different microfrontends.
- `app` depends on `ui`.
- `app` bundle does not include `ui`.

#### Gotcha

Microfrontends architecture creates a big challenge on managing non js assets, e.g. json, css, images. This is general for any microfrontend, not an issue of this solution, e.g. svg not available on development mode.

#### Monorepo

This is not required, just easier for me to commit in one place.
This requires npm v7.