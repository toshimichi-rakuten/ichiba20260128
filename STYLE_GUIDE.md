## CSS Class Convention

### Naming

Components should have `ecm-` prefix in their name.

### Naming Format

`kebab-case` for class names so it's simple as possible for directors.
Modifier class should have the parent class name in the start.

`main-section`
`main-section-bg-red`

Component

```html
<div class="ecm-component">
  <div></div>
  <div></div>
  <div></div>
</div>
```

Component Modifiers

```html
<div class="ecm-component ecm-component-bg-red"></div>
```

Component Reuse

```html
<div class="ecm-component scm-component"></div>
```

Simple Utility

```html
<div class="mb-4"></div>
```

Complex Utility (verbose)

```html
<div class="space-y-8"></div>
```

### Usage of &

Avoid using `&` to shorten class name.

❌

```scss
.ecm-component {
  &.&-bg-red {
    background-color: red;
  }
}
```

✅

```scss
.ecm-component {
  &.ecm-component-bg-red {
    background-color: red;
  }
}
```

Why:
Shortening class name by `&` makes it less readable and unsearchable.

### Nesting

Only nest modifiers.

❌

```scss
.ecm-component {
  display: flex;

  .ecm-component-item {
    &.ecm-component-item-bg-red {
      background-color: red;
    }
  }
}
```

✅

```scss
.ecm-component {
  display: flex;
}

.ecm-component-item {
  &.ecm-component-item-bg-red {
    background-color: red;
  }
}
```

Why:
Flat code has better readability.

## JS Coding Convention

TODO

## File Naming Convention

React component folders should be `PascalCase`. Other than that, all files and folders should be `kebab-case`.
On build, output must be converted to `snake_case` since it's the convention in TeamSite/Ichiba.

```
src/utils/shuffle-array.ts
src/components/sample-code.tsx
src/components/Navbar/index.tsx
src/components/Navbar/left-side.tsx
src/components/Navbar/right-side.tsx
```
