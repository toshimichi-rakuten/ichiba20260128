## Initial Project Setup

- Read README
- Install node_modules
  `pnpm i`

- Start dev environment
  `pnpm dev`

## New Module Coding Guide (ECM)

「Modal」というコンポーネント モジュールを作成するとします。 次のことを行う必要があります。

（コーディング）

1. 既存のモジュールを複製して、名前を更新してください。
2. 新しいモジュールを`core.scss`にインポートしてください。`packages/ecm/src/core.scss` (SCSSファイル)
3. JSありの場合、新しいモジュールを`core.ts`にインポートしてください。`packages/ecm/src/core.ts` (JSファイル)
4. コーディング。
5. テスト作成。

- スタイルのみはVRテスト。
- JSありはVRテストとユニットテスト。

6. テスト全部実行する。
   - `pnpm test` ユニットテスト。
   - `pnpm e2e` E2Eテスト。初めてE2Eテストを実行する場合は新しモジュールのスナップショットを撮れます。

※詳しくテストの書き方は　###単体テスト　と　###E2E テスト　を確認してください。

7. PR作成。(テスト全部成功しているかを確認してください。)

(ドキュメント作成)

1. 新しMDXファイル`apps/module-navi/src/pages/ecm/docs/ad/modal.mdx`を作成してください。
2. 存在しているMDXファイルの中身をコピーしてください。
3. 新しファイルを`apps/module-navi/src/toc.ts`にインポートしてください。

次のセクションを読んで、コーディングとドキュメント作成について詳しく学んでください。

## Git Branch Name

Please use the ticket ID and a short description.
`ICW-15100-modal`

Keep branch name length to 42 characters because of deployment URL length limit.

## コーディング

Storybook は `localhost:8080` でホストされています。
新しモジュールを作る場合は"Atomic"か"Independent"を検討してください。

- Atomic
  Pros

  - Reusable

  Cons

  - レスポンシブ不可

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

  - レスポンシブ対応(pc/sp)

  Cons

  - Not reusable

```html
<div data-module-name="ecm-campaign-details"> <div></div></div>
```

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

## SCSSのコーディング

可能な限り、利用可能な mixin と変数を使用してください。
こちらのファイルを参照ください。
`packages/ecm/src/_scss`

変数が無ければ値をそのまま利用しても大丈夫です。
値はファイル２個以上で利用される場合は変数にしてください。

## 古い ECM の移行

古い ECM パーツを移行するときは、クラスの名前を新しいスタイル ガイドに変更し、可能な限りコードを簡素化します。

こちらのファイルを参照ください。

https://git.rakuten-it.com/projects/ICWDCDG/repos/sidekick/browse/STYLE_GUIDE_EN.md

## テスト

ECMには2種類のテストがあります。単体テストと e2e テスト。

### 単体テスト

ecm は単体テストに vitest を使用します。
ファイル命名規則は `*.test.ts` を参照ください。

### E2E テスト

ecm は、e2e テストに playwright を使用します。
ファイル命名規則は `*.spec.ts` を参照ください。

スナップショットテストヘルパーコードがありますので利用してください。

```js
// e2e/module-name/module-name.spec.ts
import { snapshot } from '../../../../../helper'

snapshot({
  name: 'ModuleName SP', // module名
  url: 'http://localhost:8080/iframe.html?viewMode=story&id=modules-container--sp', // storybookのURL
  device: 'sp',
})

snapshot({
  name: 'ModuleName MD', // module名
  url: 'http://localhost:8080/iframe.html?viewMode=story&id=modules-container--md', // storybookのURL
  device: 'md',
})
```

※E2Eテストを実行する場合はStorybookのサーバーが立ち上がっている必要があります。
※初めてスナップショットを撮る場合はテストは失敗します。スナップショット取得後、また再テストお願いします。

##　E2E テストの実行

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

## ドキュメントの作成 (MDX ファイル)

Before writing documentation, ensure the documentation uses the latest bundle.
`pnpm build --filter=ecm`

.mdx ファイルは、React コンポーネントをレンダリングできる Markdown ファイルです。

VSCode をテキストエディターとして使用している場合は、.mdx の拡張機能をインストールして、ライティング エクスペリエンスを向上させます。

.mdx ファイルが機能するために最低限必要なコード/テキストは次のとおりです。

```jsx
// 'REACT COMPONENTS IMPORTS HERE!'

export const meta = {
  title: 'バナー',
  description: 'Edit me',
  url: '/docs/components/banner',
  tags: ['banner'], // allows this document to be searched by the keywords 'banner'
}

// 'CONTENT HERE!'
```

`apps/module-navi/components` 内の任意のコンポーネントを自由に使用してください。これらはドキュメント用に特別に作成されたコンポーネントです。

[Mantine](https://mantine.dev) のコンポーネントを使用することもできます。

ドキュメント用のカスタム/複雑なコンポーネントを作成する必要がある場合は、`page-files` で React コンポーネントを作成できます。

## Markdownチートシート

マークダウンの記述に使用できるコンポーネントのリストについては、`apps/module-navi/src/pages/dev/reference-guide.mdx`を確認してください。

このページは、ブラウザーの`http://localhost:3002/ecm/docs/dev/reference-guide/`でも表示できます。
