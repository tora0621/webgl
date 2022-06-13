#!/bin/bash

# ルートフォルダ以下の権限を変更
chown -R www-data:www-data /var/www/html

# Apacheを起動
apache2-foreground
