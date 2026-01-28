## Initial Project Setup

- Read README
- Install node_modules
  `pnpm i`

- Start dev environment
  `pnpm dev`

## New Module Coding Guide (ECM)

To create a component module called `Modal`, please follow the following steps:

(Coding)

1. Duplicate an existing module and update the name.
2. Import the style of the new module in `packages/ecm/src/core.scss`
3. Import the JS of the new module in `packages/ecm/src/core.ts` (if there is JS)
4. Coding
5. Testing. For style only module, please add VR test. If there is JS, please add unit tests.

- `pnpm test` for unit test
- `pnpm e2e` for e2e test

There are dedicated sections for writing tests, read them for more information.

6. Open PR (Make sure all test passes!)

(Documentation)

1. Create a new MDX file in docs `apps/module-navi/src/pages/ecm/docs/ad/modal.mdx`
2. Duplicate any existing MDX file and modify the content.
3. Add the new page in the table of contents `apps/module-navi/src/toc.ts`

Read the next sections to learn more about coding and writing documentation.

## Git Branch Name

Please use the ticket ID and a short description.
`ICW-15100-modal`

Keep branch name length to 42 characters because of deployment URL length limit.

## Coding

The Storybook is hosted on `localhost:8080`.
When creating a new module, there are 2 possible architectures:

- Atomic
  Pros

  - Reusable

  Cons

  - Cannot be mobile responsive

```html
<div class="ecm-container">
  <-- other module <div class="ecm-component"></div> <-- atomic component
  <div class="ecm-component"></div>
  <div class="ecm-component"></div>
  <div class="ecm-component"></div>
  <div></div
></div>
```

- Independent
  Pros

  - Can be mobile responsive (pc/sp)

  Cons

  - Not reusable

```html
<div data-module-name="ecm-campaign-details"> <div></div></div>
```

Please choose the appropriate architecture. Sometimes it's better to make it atomic, sometimes it's better to make it independent. When in doubt, choose to make it independent because mobile responsive (one source for pc/sp) is the true end goal for event pages.

### Composing Styles

Please avoid using multiple modules in the same element. Mixing multiple modules makes it hard to understand which modules applies which styles.

❌ Inheritance

```
<div class="ecm-slider-slider ecm-alcor">
<div>
```

✅ Composition

```
<div class="ecm-slider-slide">
  <div class="ecm-alcor">
  <div>
<div>
```

✅ Use utilities and modifier to customize the base module style

```
<div class="ecm-slider-slide">
  <div class="ecm-alcor ecm-alcor-modifier px-4">
  <div>
<div>
```

### Composing JS

- Similar logic to composing styles, please use class but avoid inheritance.

Why:
While inheritance makes code looks cleaner and reusable, it also couples them together which most of the time becomes hell to maintain in the long run.

❌ Inheritance

```js
class FloatingTop extends Floating
```

```html
<a data-module-name="ecm-scroll-to-top">
  <i
    class="ecm-icon-chevron-up"
    aria-hidden="true"
  ></i>
</a>
```

✅ Composition

```js
class Floating
class ScrollToTop
```

```html
<div
  style="bottom: 32px; right: 32px;"
  data-module-name="ecm-floating"
  data-hidden="true"
  data-show-threshold="150"
>
  <a data-module-name="ecm-scroll-to-top">
    <i
      class="ecm-icon-chevron-up"
      aria-hidden="true"
    ></i>
  </a>
</div>
```

## Coding SCSS

Please use the available mixins and variables as much as possible.
`packages/ecm/src/_scss`

## Writing Testing

### Unit Testing

ECM uses Vitest for unit testing. The naming convention is `*.test.ts`.

**Please test the spec, not the implementation.**
https://kentcdodds.com/blog/testing-implementation-details

### E2E Testing

ECM uses Playwright for E2E testing. The naming convention is `*.spec.ts`.

The minimum required E2E test is a snapshot test.
There is a helper function to create a snapshot test.

```js
// e2e/module-name/module-name.spec.ts
import { snapshot } from '../../../../../helper'

snapshot({
  name: 'ModuleName SP',
  url: 'http://localhost:8080/iframe.html?viewMode=story&id=modules-container--sp',
  device: 'sp',
})

snapshot({
  name: 'ModuleName MD',
  url: 'http://localhost:8080/iframe.html?viewMode=story&id=modules-container--md',
  device: 'md',
})
```

Notes

- The Storybook must be running to perform an E2E test.
- The snapshot test fails when ran for the first time. You will need to run the test again.

## Running E2E Test

To run E2E test, we must first:

- Ensure `sidekick` is the current working directory of your terminal (root directory of monorepo)

- Ensure Storybook is running
  `pnpm dev` (dev mode)
  OR
  `pnpm build:sb && pnpm start:sb` (bundle mode, faster test)

- Run E2E test file (in a different terminal)
  `pnpm e2e badge` (only run 'badge' test cases)
  OR
  `pnpm e2e` (run all test cases)

- Add --headed flag if you want to see the run in browser.
  `pnpm e2e --headed`

## Updating Snapshot

- `pnpm e2e badge --update-snapshots` (Update the snapshot for 'badge')

## Writing Documentation (MDX files)

Before writing documentation, ensure the documentation uses the latest bundle.
`pnpm build --filter=ecm`

.mdx files are Markdown files that can render React components.
If you are using VSCode as your text editor, install an extension for .mdx to improve your writing experience.

Here is the minimum required code/text for the .mdx file to work.

```jsx
// 'REACT COMPONENTS IMPORTS HERE!'

export const meta = {
  title: 'バナー',
  description: 'Edit me',
  url: '/docs/components/banner',
  tags: ['hero'], // allows the page to be searchable by the keyword 'hero'
}

// 'CONTENT HERE!'
```

Feel free to use any component in `apps/module-navi/components`, these are components made specifically for the documentation.
You can also use components from [Mantine](https://mantine.dev).

If you need to create a custom/complex component for documentation, you can create a React component in `page-files`.

## Writing Markdown

Check out `Reference Guide` page.
http://localhost:3002/ecm/docs/dev/reference-guide/
