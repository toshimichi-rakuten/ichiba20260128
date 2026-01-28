# Check Tool

`https://r.r10s.jp/com/js/c/ecm_check_tool/ecm_check_tool.min.umd.js`

## TeamSite

/default/main/com02/vertical/WORKAREA/00-PUBLIC/htdocs/com/js/c/ecm_check_tool

## Bookmark

```
javascript: (function () {
  const scripts = [...document.getElementsByTagName('script')];
  const ctMatcher = new RegExp(/r.r10s.jp\/com\/js\/c\/ecm_check_tool/);
  const ctExists = scripts.find((s) => s.src.match(ctMatcher));

  if (!ctExists) {
    const s = document.createElement('script');
    s.setAttribute('src', 'https://r.r10s.jp/com/js/c/ecm_check_tool/ecm_check_tool.min.umd.js?v=' + Date.now());
    document.body.appendChild(s);
  }
})()
```

## TODO

Create a Vite plugin that will rename bundle to match the name in TeamSite on build.
