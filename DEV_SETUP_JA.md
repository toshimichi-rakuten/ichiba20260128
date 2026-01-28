## Getting Started

1. レポジトリをCloneしてください

```
git clone ssh://git@git.rakuten-it.com:7999/icwdcdg/sidekick.git
```

2. Node versionを v20.9.0 に変更してください。(Node Version Managerが事前に準備されていることを前提としています。)

```
nvm use
```

3. pnpmをinstallしてください

```
npm install -g pnpm
```

4. node_modulesをinstallしてください

```
pnpm install
```

5. 制作環境を立ち上げてください。

```
pnpm dev // storybook and docs
```

もし正しく動いたら、以下のようにサーバーがホストされます:
http://localhost:8080 (ECM storybook)
http://localhost:8081 (SCM storybook)
http://localhost:3000 (docs)
