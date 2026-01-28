# Seasonal Common Module

## Coding

- Read the markdowns in the root. (README, WORKFLOW, STYLE_GUIDE)

- `pnpm new` to create new module. You will need to manually import the new component index.scss file to `scm/src/index.scss`

- CSS must be responsive
  SP/PC has a separate Story because the old ECM has a different base style.
  However, our code should work on both devices in a single code.

## How to reuse ECM code

If you want to create a Pill module in SCM and you want to reuse ECM Pill, you can import the SCSS of ECM Pill.

```
// scm/src/index.ts
import 'ecm/src/modules/pill/index.scss'
import './modules/pill/index.scss'
```

Note: The new ECM reset cannot be imported, so the style might need adjustment.

## Release

```css
<link
  rel="stylesheet"
  href="https://r.r10s.jp/com/js/c/scm/1.0/scm-1.0.0.min.css?v=202305181442"
/>
```

## TeamSite

//wteamsite1001z/default/main/com02/vertical/WORKAREA/00-PUBLIC/htdocs/com/js/c/scm
