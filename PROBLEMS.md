1. Cannot start Storybook due to port 8080 being taken
   Possible solutions:

- Try deleting node_modules/.cache

2. E2E test not taking snapshot
   Possible solutions:

- Check the Storybook link you provided. Sample format:
  http://localhost:8080/iframe.html?args=&id=modules-breadcrumb--default&viewMode=story

  - It should start with http://localhost:8080/iframe.html
  - It should have &viewMode=story parameter

3. Cannot run E2E test "Looks like Playwright Test or Playwright was just installed or updated."
   Possible solutions:

- Reinstall playwright and node_modules

```
npx playwright install
pnpm install
```
