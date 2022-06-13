# はじめに

Docker を利用した WordPress のローカル環境の構築に必要な設定ファイル等をまとめています。<br>
新規および既存プロジェクトへの導入方法につきまして、下記をご確認ください。

---

## 前提条件

- エディターは [Visual Studio Code (VSCode)](https://code.visualstudio.com/) を使用する
- [Docker Desktop](https://www.docker.com/products/docker-desktop) がインストールされている<br>（参考 Wiki）<https://cab-work.backlog.jp/alias/wiki/837912>
- [PHP For Windows](https://windows.php.net/download/) 及び VSCode の PHP 関連の拡張機能がインストールされている<br>（参考 Wiki）<https://cab-work.backlog.jp/alias/wiki/701411>

---

## 導入プロジェクトに下記ファイルをコピーする

基本的にはそのままコピーして問題ありませんが、.vscode/settings.json ファイルはコピーによって変更された箇所を確認してください。<br>
下記は追加された Docker 関連のファイルになります。

- **.docker フォルダ**：Docker ファイルや有料プラグインの zip ファイルを格納しています。
- **.vscode\launch.json**：PHP の Xdebug の設定を記述しています。
- **.vscode\settings.json**：オートフォマットや PHP 関連の拡張機能の設定を記述しています。
- **src\php\stubs フォルダ**：ACF Pro プラグイン、その他の WordPress プラグインのスタブを記述した php ファイルを格納しています。
- **docker-compose.yml**：Docker サービス構築の設定ファイルになります。
- **.git-ftp-ignore**：Docker 関連の除外ファイルを追記しています。
- **.gitignore**：Docker 関連の除外ファイルを追記しています。

### 導入プロジェクトに応じてパスを修正する

Docker 関連のファイルは、WordPress を /wp フォルダにインストール、ルートから WordPress を実行することを前提に設定を記述しています。<br>
別のフォルダにインストールしたい場合は、下記設定ファイルのパスを適宜修正してください。

- **.docker\wordpress\Dockerfile**：`html/wp` を検索して、適宜変更してください。
- **.docker\wordpress\wp-install.sh**：6 行目の `/wp`を適宜変更してください。
- **docker-compose.yml**：28 行目の `/wp/` 、`html/wp` を検索して、適宜変更してください。34 行目をテーマのフォルダ名に変更してください。

### WordPress のインストール設定ファイルを編集する

WordPress のインストール設定ファイル（**.docker\wordpress\wp-install.sh**）を、構築する本番環境に合わせて修正してください。<br>
既存の本番環境からプラグイン等をまるごとエクスポートする前提の場合は、プラグインのインストール箇所を適宜コメントアウトして利用してください。

---

## はじめて利用する場合

1. ターミナルから `docker-compose build` コマンドを実行して、Docker コンテナを構築します。<br>Xdebug 関連のエラーが発生した場合、.docker\wordpress\Dockerfile ファイルの 26 行目をコメント解除、28 行目をコメントアウトして、改めてコマンドを実行してみてください。
2. ターミナルから `docker-compose up -d` コマンドを実行して、Docker コンテナを起動します。
3. 下記コマンド（最初の 2 行）を実行して WordPress のインストールします。
4. WordPress が正常にインストールされたら、下記コマンド（残り 4 行）を実行して index.php と.htaccess をローカルのルートにコピー＆修正します。

```bash
WEB=$(docker-compose ps | grep wordpress | awk '{print $1}')
docker exec -it $WEB bash "//usr/local/bin/wp-install.sh"
```

```bash
docker cp $WEB:/var/www/html/wp/.htaccess ./.htaccess
docker cp $WEB:/var/www/html/wp/index.php ./index.php
sed -i "1s/^/DirectoryIndex index.html index.php\n\n/" .htaccess
sed -i -e "s/\/wp-blog-header/\/wp\/wp-blog-header/" index.php
```

_※インストールを実行するタイミングによっては、プラグイン提供側サイトの問題で正常にインストールできない場合はありますので、Warning や Error が表示されている場合は、WordPress 管理画面より適宜再インストールをしてください。_

### サイト URL と初回ログイン URL

- <http://127.0.0.1:8080/>
- <http://127.0.0.1:8080/wp/wp-login.php>

_※SiteGuard WP Plugin でログイン URL を変更した場合は、その URL でログインしてください。_<br>
_※予めルートに .env ファイルを作成し、下記のようにローカル・ループバック・アドレスを指定すると、その IP アドレスでコンテナを起動することができます。_

```bash
IP=127.0.0.1
```

#### Live Server 拡張機能を利用したい場合

.vscode\settings.json ファイルの liveServer.settings.proxy を適宜変更してください。<br>
**尚、変更したままコミットしてしまうと、他のリポジトリ利用者にも影響がありますので、変更した場合はコミット前に変更を戻すようにしてください。**

### 有料プラグインの設定について

ACF Pro および Admin Columns は有料版を利用していますので、環境ごとにアクティベートが必要となります。<br>
（参考 Wiki）<https://cab-work.backlog.jp/alias/wiki/89675>

---

## 利用を終了する場合

ターミナルから `docker-compose stop` コマンドを入力してください。
<br>_※Windows をシャットダウンしても自動的に終了します。ローカル環境で他の Docker を利用したい場合は、.env ファイルで別のローカル IP を指定するか、先に終了しておく必要があります。_

---

## 2 回目以降に利用する場合

ターミナルから `docker-compose up -d` コマンドを実行します。<br>
_※WordPress のプラグインやデータベースの内容を本番環境に合わせたい場合は、本番環境から All-in-One WP Migration プラグインを利用して、最新のエクスポートファイルを入手してください。_

---

## 最新のエクスポートファイルの入手方法

1. 本番環境の WordPress 管理画面を開きます。
2. 左メニューの All-in-One WP Migration からエクスポートを開きます。
3. 高度なオプションをクリックして開き、「必須プラグインをエクスポートしない」「プラグインをエクスポートしない」「データベースをエクスポートしない」以外を全てチェックします。
4. エクスポート先から「ファイル」を選択するとエクスポートファイルが生成されますのでダウンロードします。

---

## メディアファイルを補完したい場合

All-in-One WP Migration プラグインを利用してメディアもエクスポートできますが、運用後しばらく経過した WordPress 環境の場合、エクスポートファイルが非常に大きくなる為、メディアファイルは必要分だけダウンロードして、下記コマンドを参考にコンテナにコピーしてください。<br>
（例）デスクトップの wp-content/uploads フォルダにダウンロード済みの場合

```bash
WEB=$(docker ps | grep _wordpress | awk '{print $12}')
docker cp ~/Desktop/wp-content/uploads/. $WEB:/var/www/html/wp-content
```

---

## その他

- デフォルトで Xdebug が有効になっていますので、vscode の左ペインの「実行とデバッグ」から「Listen for Xdebug」を実行して利用してください。
- WordPress の実行コンテナ内で作業したい場合は、ターミナルから `docker-compose exec wordpress bash` でコンテナ内に入ることができます。
- WordPress の実行コンテナ内では [WP-CLI](https://developer.wordpress.org/cli/commands/) を利用できます。
- WordPress の実行コンテナ内でテキストファイルを編集したい場合は、コンテナ内で Vim をインストールしてください。

```bash
apt-get update
apt-get install vim
```
