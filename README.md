# はじめに

ベースコーディングや公開後のパーツ修正・追加で Sass, TypeScript を変更する場合、下記の内容を必ずご確認ください。<br>
コーディングルール等の情報については Backlog の [base-coding プロジェクトの Wiki](https://cab-work.backlog.jp/wiki/BC/Home) をご確認ください。

---

## 前提条件

- エディターは [Visual Studio Code (VSCode)](https://code.visualstudio.com/) を使用する
- [Node.js](https://nodejs.org/ja/) がインストールされている

---

## 作業前準備

ターミナルで `npm i` コマンドを実行してリポジトリ内の依存パッケージをインストールしてください。<br>
後述するビルドコマンドを実行してエラーが出る場合は、変更されたパッケージがある可能性がありますので、一度 `npm i` コマンドを実行してみてください。

---

## 各コマンド説明

### watch コマンド

```npm
npm run watch
```

このコマンドを実行すると監視モードとなり、ファイルを修正・保存すると開発用に特化したビルドが自動的に実行されます。<br>
ベースコーディングや公開後のパーツ修正・追加時は、こちらのコマンドを利用してコーディングを進めてください。<br>
watch コマンドを実行しているターミナルでキーボードの Ctrl+C キーを押下すると監視モードを停止することができます。<br>
尚、HTML コード内で初めて登場する CSS クラスを利用する場合は、一度監視モードを停止して、再度 watch コマンドを実行してください。

### prod コマンド

```npm
npm run prod
```

サーバーアップ用に特化したビルドを実行します。<br>
公開後のパーツ修正・追加時は、テストアップおよび本番アップ前に、こちらのコマンドを利用してビルドしてください。<br>
また、公開後の更新作業において HTML コード内で初めて登場する CSS クラスを利用する場合、公開後に build.js, style.css がコンフリクトした際にも、こちらのコマンドを利用してビルドしてください。

### dev コマンド

```npm
npm run dev
```

開発用に特化したビルドを実行します。<br>
リニューアルで下層ページ作成時に HTML コード内で初めて登場する CSS クラスを利用する場合、ベースコーディング時に build.js, style.css がコンフリクトした際にこちらのコマンドを利用してビルドしてください。

---

## ソースファイル管理

### Sass パーツファイルについて

src\scss に格納してください。<br>
ファイル名は接頭辞にアンダースコアを入れて作成してください。(例 \_ttl.scss)<br>
ファイルを追加した場合、各フォルダ内の \_index.scss ファイルから @use（ global の場合は @forward）で読み込んでください。
尚、同じ目的のファイルが複数つくられる場合は、フォルダに入れて管理してください。（例 parts\ttl\\\_ttl1.scss）

### TypeScript モジュールについて

src\ts\modules にモジュールファイルを作成してください。<br>
作成したモジュールは、src\ts\index.ts から import 文にて読み込んでください。

---

## npm パッケージ追加方法

リポジトリ内に新たにパッケージを追加したい時の手順です。

### npm に公開されているパッケージの追加手順

1. [npm 公式サイト](https://www.npmjs.com/)の Search packages にライブラリ名を入力します。
2. ライブラリ詳細を確認し、ターミナルで `npm i ライブラリ名` を入力します。
3. リポジトリ内 package.json の dependencies にインストールしたライブラリ名が追加されていればインストール完了です。
4. インストールしたライブラリの型定義ファイルを[TypeScript 公式サイト](https://www.typescriptlang.org/dt/search)から検索し、存在する場合はターミナルで `npm i -D 型定義ファイル名` を入力します。
5. リポジトリ内 package.json の devDependencies にインストールした型定義ファイル名が追加されていればインストール完了です。

### npm に公開されていないパッケージの追加手順

1. npm で公開されていないライブラリをダウンロードします。
2. src\not-npm に上記でダウンロードしたファイルから必要なファイルのみ格納します。
3. src\ts\modules にモジュールファイルを作成する場合、require 文にてライブラリを読み込んでください。

尚、@types の型定義ファイルがない場合は、TypeScript についての[型定義ファイル](#型定義ファイル)を確認してください。

---

## webpack について

### CSS への画像埋め込み

CSS の background-image で読み込んだ画像について、5KB 以下は CSS へ埋め込み、それ以外は実ファイル参照となります。<br>
（5KB 指定の理由は、それより大きいサイズになると出力された CSS ファイルのサイズが肥大化してしまう為）<br>
尚、利用する npm パッケージによっては、5KB 以上の指定が必要となる場合がありますのでご注意ください。

### CSS SourceMap

当リポジトリでは、サーバーアップ用は compressed、開発時は expanded としてビルドされます。

### CSS 未使用クラス削除

[PurgeCSS](https://purgecss.com/) を利用して、ビルド時に style.css から未使用の CSS クラスが削除されるように設定しています。<br>
HTML コード内で初めて登場するクラスは SCSS ファイルで実装されていても style.css に入っていない為、一度ビルドコマンドを実行する必要があります。

新しく追加した npm パッケージの CSS クラス定義を追加したい場合は、postcss.config.js ファイルの safelist に追記してください。

---

## TypeScript について

### 型定義ファイル

#### @types の型定義ファイルがなく、node_modules 内に .d.ts ファイルがある場合

tsconfig.json の paths に .d.ts ファイルへのパスを追記すると型定義が利用できます。<br>
（例：`"sugar": ["node_modules/sugar/sugar.d.ts"]`）

#### @types の型定義ファイルがなく、node_modules 内に .d.ts ファイルもない場合

src\\@types\パッケージ名 のフォルダを作成、その中に型定義を記述した index.d.ts ファイルを作成すると型定義が利用できます。<br>
（例：`src\@types\js-base64\index.d.ts`）

##### 型定義ファイルがない jQuery 依存ライブラリについて

TypeScript を正しくコンパイルできないため、下記のいずれかで対応してください。

###### 型定義ファイルを作成する（推奨）

前述のとおり src\\@types フォルダ内に型定義ファイルを作成します。<br>
（例：`src\@types\venobox\index.d.ts`）

###### 型アサーションする

jQuery オブジェクトを any で型アサーションします。<br>
（例：jQuery プラグイン VenoBox）

```typescript
(<any>$('.popup)).venobox();
($('.popup') as any).venobox();
```
