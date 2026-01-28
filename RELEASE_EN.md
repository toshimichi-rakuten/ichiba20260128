# Release

## Preparation

0. Ensure you have `jq` installed on your computer

- jq (https://formulae.brew.sh/formula/jq)

1. Ensure your master branch is latest

```sh
git checkout master && git pull
```

2. Create release branch (replace <ticket_number>)

```sh
git checkout -b ICW-<ticket_number>-release
```

3. Run unit and e2e test. (Can be skipped if there is no bundle update)

```sh
pnpm test
pnpm build:sb && pnpm start:sb
pnpm e2e --update-snapshots
```

If there is a regression, please fix before proceeding to the next step.

4. Run release script

```sh
pnpm release
```

5. If everything went correctly, you should have this directory: (Please double check)

```sh
teamsite (gitignored)
├── ecm
│   └── 3.x
└── scm
    └── 2.x
```

6. Deploy the bundles to production. `ecm` and `scm` in this case.

Note: Deploying the bundles won't affect any event pages, so we can push them to the production environment as soon as they're ready.

### ecm TeamSite Path

/default/main/com02/vertical/WORKAREA/00-PUBLIC/htdocs/com/js/c/ecm/<new_version>

### scm TeamSite Path

/default/main/com02/vertical/WORKAREA/00-PUBLIC/htdocs/com/js/c/scm/<new_version>

7. Open a PR

### PR Checklist (Bundles)

- TeamSite path is correct
- Version is incremented properly
- (ECM only) include files is updated
- Bundle contains the necessary changes
- Bundle is released to production with no problem
- Git tag matches the latest commit in the PR

### PR Checklist (ModuleNavi)

- TeamSite path is correct
- Outline files
- `module-navi` "fixed" version exists
- `module-navi` "latest" version is updated
- Git tag matches the latest commit in the PR

8. Ensure release is ready
- Ensure all tasks are done.
- Get release approval from business side.
- Get PR approval from dev side.

## Deploying

8. Run smoke test to ensure the bundles are accessible to the public.

```sh
pnpm release:smoke
```

9. Rerun tests

```sh
pnpm test
pnpm build:sb && pnpm start:sb
pnpm e2e --update-snapshots
```

If there is a regression, please restart the release process.

10. Confirm `group_inc` is safe to update

Updating `group_inc` would update all event pages in Rakuten Ichiba.  

Our release should ensure:
- Backwards compatibility
- Smooth migration process if there is code change

If for some reason these are not possible, 
all the event pages should be fixed and coordinated to be deployed with `group_inc` at the same.

11. Deploy `group_inc`. Files are in located in `packages/ecm/group_inc`

### group_inc TeamSite path

/default/main/com02/vertical/WORKAREA/00-PUBLIC/htdocs/com/js/c/ecm/group_inc

12. Deploy ModuleNavi

/default/main/kakunin.rakuten/all/WORKAREA/00-PUBLIC/htdocs/public_access/ichiba/cwd/reference/latest
/default/main/kakunin.rakuten/all/WORKAREA/00-PUBLIC/htdocs/public_access/ichiba/cwd/reference/<date>

```sh
teamsite (gitignored)
├── module-navi
│   ├── 20250314
│   └── latest
```

Note: If you have lost the file, feel free to run `pnpm release` again.

13. Ensure deployment changes reflected

- Event pages are using the new bundles
- ModuleNavi is updated

14. Add git tag

```sh
git tag release/<date>
git push --tags
```

15. Finally, merge your PR.
