#!/bin/bash

# WordPressの標準インストール処理
# ※--admin_password='password'の行を削除するとパスワードを自動生成(ターミナルに表示される)
wp core install \
--url='http://localhost:8080/wp/' \
--title='サイトのタイトル' \
--admin_user='admin' \
--admin_password='password' \
--admin_email='info@cab-net.jp' \
--skip-email \
--allow-root

# サイトの言語設定
wp language core install 'ja' --activate --allow-root

# 編集者ユーザーを作成(ユーザー名、メール、パスワードは適宜変更)
# ※--user_pass='password'を削除するとパスワードを自動生成(ターミナルに表示される)
wp user create 'editor_user' 'postmaster@cab-net.jp' --user_pass='password' --role='editor' --allow-root

# キャッチフレーズの設定(必要なら記入)
wp option update blogdescription '' --allow-root

# 不要なインストール済みプラグインを削除
wp plugin delete hello.php --allow-root
wp plugin delete akismet --allow-root

# 初期プラグインのインストール(必要に応じてコメントアウト)
wp plugin install wp-multibyte-patch --activate --allow-root
wp plugin install all-in-one-wp-migration --activate --allow-root
wp plugin install wp-head-cleaner --activate --allow-root

# 投稿/カテゴリー関連プラグイン
wp plugin install advanced-schedule-posts --activate --allow-root
wp plugin install intuitive-custom-post-order --activate --allow-root
wp plugin install public-post-preview --activate --allow-root

# テーマ/テンプレート関連プラグイン
wp plugin install breadcrumb-navxt --activate --allow-root
wp plugin install wp-pagenavi --activate --allow-root

# 管理画面カスタマイズ関連プラグイン
wp plugin install wp-total-hacks --activate --allow-root
wp plugin install admin-menu-editor --activate --allow-root
wp plugin install add-admin-css --activate --allow-root
wp plugin install add-admin-javascript --activate --allow-root
wp plugin install radio-buttons-for-taxonomies --activate --allow-root
wp plugin install peters-login-redirect --allow-root

# エディター関連プラグイン
wp plugin install tinymce-advanced --activate --allow-root
wp plugin install classic-editor --activate --allow-root
wp plugin install html-editor-syntax-highlighter --activate --allow-root

# メディア関連プラグイン
wp plugin install ewww-image-optimizer --activate --allow-root
wp plugin install enable-media-replace --activate --allow-root

# カスタム投稿タイプ関連プラグイン
wp plugin install custom-post-type-ui --activate --allow-root
wp plugin install custom-post-type-permalinks --activate --allow-root

# REST API関連プラグイン
wp plugin install wp-rest-filter --activate --allow-root
wp plugin install acf-to-rest-api --activate --allow-root

# セキュリティ・バックアップ関連プラグイン
wp plugin install siteguard --allow-root
wp plugin install backwpup --allow-root

# 有料版プラグイン(zipファイルからインストール)を有効化
# https://cab-work.backlog.jp/alias/wiki/89675
wp plugin activate advanced-custom-fields-pro --allow-root
wp plugin activate admin-columns-pro --allow-root
wp plugin activate ac-addon-acf --allow-root

# サイトを見るときにツールバーを表示する設定を解除
wp user meta update 1 show_admin_bar_front false --allow-root

# タイムゾーンと日付/日時形式設定
wp option update timezone_string 'Asia/Tokyo' --allow-root
wp option update date_format 'Y年n月j日' --allow-root
wp option update time_format 'H:i:s' --allow-root

# ディスカッション設定
wp option update default_ping_status 'closed' --allow-root
wp option update default_pingback_flag 0 --allow-root
wp option update default_comment_status 'closed' --allow-root
wp option update moderation_notify 0 --allow-root
wp option update comments_notify 0 --allow-root

# メディア設定
wp option update thumbnail_size_w 400 --allow-root
wp option update thumbnail_size_h 400 --allow-root
wp option update medium_size_w 800 --allow-root
wp option update medium_size_h 800 --allow-root
wp option update large_size_w 1280 --allow-root
wp option update large_size_h 1280 --allow-root

# パーマリンク設定
wp option update permalink_structure /%category%/%post_id% --allow-root

# テーマの削除(最新の1つは残す)
#wp theme delete twentysixteen --allow-root
#wp theme delete twentyseventeen --allow-root
wp theme delete twentynineteen --allow-root
wp theme delete twentytwenty --allow-root
#wp theme delete twentytwentyone --allow-root

# マウントしたテーマの有効化(theme名は適宜変更)
# ※自作テーマを有効化する場合は最後に実行する
#wp theme activate 'sample' --allow-root

# インストール後、ルートフォルダ以下の権限を変更
chown -R www-data:www-data /var/www/html
