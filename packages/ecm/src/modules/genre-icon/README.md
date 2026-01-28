# How to update genre-icon webfont

There is no good Node.js library that is configurable/works exactly the way we want
so we'll need to do a little bit of manual work.

## Steps

1. Install svgo

```bash
# 3.3.2 as of this writing
npm i -g svgo
```

2. Make sure all the needed genre icons are in `.assets/svg/genre`

3. Run svgo to optimize all the svg

```bash
svgo -rf .assets/svg/genre
```

4. Go to https://icomoon.io/app and upload selection.json to load the previous settings where the current webfont is generated. If for some reason this doesn't work, you can also just reupload all the svg files again since everything is on default settings.

5. Upload the new icons to icomoon.

6. In the generated files, we only need woff, css, and selection.json. Delete the rest.

7. Copy the woff file to `.assets/fonts`

8. Copy the woff file to `apps/module-navi/public/_assets/fonts`

9. Copy the selection.json to `ecm/src/modules/genre-icon`

10. Copy the contents of generated css file to `ecm/src/modules/genre-icon/index.scss`

11. In the css, set the base path of src url in `@font-face` to r10. Remove all format except woff.

12. Add `?v=` parameter in src url to force reset the cache.

13. Update documentation in ModuleNavi.

14. When ready for release, upload the updated woff file to r10. TeamSite Path: `/com/js/c/ecm/assets/fonts`
