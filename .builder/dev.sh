#!/bin/bash
set -e  # エラーが発生したら停止

echo "🚀 module-naviアプリの開発サーバーを起動します..."
echo "📍 ポート: 3000"

# module-naviアプリのみを起動
corepack pnpm --filter module-navi dev
