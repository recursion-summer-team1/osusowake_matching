# Backend

## Develop Environment

開発環境をdocker-composeで構築.

### Requirements

- docker
- node.js

### Linter Formatter
```
npm run lint //eslint
npm run format //prettier
```

### start

```
//nodeモジュールをインポート
npm i
```

```
//buildあり
docker compose up --build
//buildなし
docker compose up
```

### shutdown

```
docker compose down
```

### Hot Reload

nodemonを利用して、編集・保存すると反映される.

### DB

マイグレーションツールはなし.
初回起動時に`mysql/init/`以下にあるSQLファイルが実行される. 再読込みは, `mysql/data/`を削除して初期化.

```
docker compose down # 開発環境が稼働中であれば止める
rm -rfd mysql/data  # `mysql/data/`以下を削除
docker compose up
```

MySQLのコンテナに入りDB操作を行いたい場合

```
docker compose exec db mysql -u root -ppass dbname
```
