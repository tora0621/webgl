# ベースイメージにWordPress公式イメージを使用
# https://hub.docker.com/_/wordpress
FROM wordpress

# 必要なパッケージをインストール
RUN set -ex; \
    apt-get update && apt-get install --no-install-recommends -y \
        $PHPIZE_DEPS \
        unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# WordPress開発者向けのコマンドラインツール(WP-CLI)をインストール
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x wp-cli.phar \
    && mv wp-cli.phar /usr/local/bin/wp \
    && wp --info

# 開発者向けの電子メールテストツールをインストール
RUN curl -sSL https://github.com/mailhog/mhsendmail/releases/download/v0.2.0/mhsendmail_linux_amd64 -o mhsendmail \
    && chmod +x mhsendmail \
    && mv mhsendmail /usr/local/bin/mhsendmail

# PHPのデバッグ環境を有効化
ENV PHP_IDE_CONFIG="serverName=wordpress"
#RUN pecl install xdebug && docker-php-ext-enable xdebug
#->pecl/xdebug is already installed and is the same as the released version 3.0.4
RUN docker-php-ext-enable xdebug

# WordPressインストール用スクリプトとApache起動用スクリプトをコピー
COPY ./apache2-start.sh /usr/local/bin/apache2-start.sh
COPY ./wp-install.sh /usr/local/bin/wp-install.sh

# WordPress有料プラグインをプラグインフォルダに解凍
COPY ./plugins/*.zip /var/www/html/wp/wp-content/plugins/
RUN unzip '/var/www/html/wp/wp-content/plugins/*.zip' -d /var/www/html/wp/wp-content/plugins \
    && rm -rf /var/www/html/wp/wp-content/plugins/*.zip
