## Getting Started

1. Clone the repository

```
git clone ssh://git@git.rakuten-it.com:7999/icwdcdg/sidekick.git
```

2. Switch to Node v20.9.0 (Assuming you have Node Version Manager)

```
nvm use
```

3. Install pnpm

```
npm install -g pnpm
```

4. Install node_modules

```
pnpm install
```

5. Run development environment

```
pnpm dev // storybook and docs
```

If everything worked correctly, dev servers should be hosted at:
http://localhost:8080 (ECM storybook)
http://localhost:8081 (SCM storybook)
http://localhost:3000 (docs)
