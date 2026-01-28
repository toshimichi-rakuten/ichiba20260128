# Hotfix Release Process

1. Checkout the latest release tag
```
git checkout release/20250820
```

2. Create a new hotfix branch
```
git checkout -b ICW-00000-hotfix
```

3. Apply your fixes

4. Open a PR `production` to branch. The goal of this PR is to let the reviewers check the fix.

5. Tag the hotfix release in this format

```
release/20250821-hotfix
```

6. Deploy the hotfix

7. Open a PR to `master` branch to merge the hotfix back
