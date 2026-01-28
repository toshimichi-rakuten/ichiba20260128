#!/bin/bash
set -e  # エラーが発生したら停止

echo "🔧 Builder.io環境のセットアップを開始します..."
echo "📦 pnpmを使用して依存関係をインストールします..."

# HUSKYを無効化してインストール（Git hooksのエラーを回避）
HUSKY=0 corepack pnpm install

echo "✅ セットアップが完了しました！"
