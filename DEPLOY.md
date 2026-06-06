# デプロイ手順メモ

git add .
git commit -m "更新内容"
git push origin main

## 通常更新（推奨）

このリポジトリは `main` ブランチへの `push` で自動デプロイされます。

1. 変更をコミット
2. `main` に push
3. GitHub Actions が自動実行
   - `npm ci`
   - `npm run generate`
   - `.output/public/` を FTP アップロード

ワークフロー定義: `.github/workflows/deploy-sftp.yml`

## 手動更新（ローカルから）

```bash
npm run deploy
```

内部的には以下を実行します。

- `npm run generate`
- `lftp -f scripts/deploy.lftp`

## 注意点

- 自動デプロイは `main` ブランチ push が条件
- FTP 接続情報は GitHub Actions 側では Secrets を使用
- `scripts/deploy.lftp` に認証情報を直書きしない運用を推奨
