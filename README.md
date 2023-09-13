# Osusowake Matching
フードロス改善を目的に、5人で開発した「おすそ分けマッチングアプリ」.
## 目次
- [Osusowake Matching](#osusowake-matching)
  - [目次](#目次)
  - [サービス](#サービス)
    - [概要](#概要)
    - [デモ](#デモ)
    - [ターゲットユーザー](#ターゲットユーザー)
  - [機能](#機能)
  - [チーム開発](#チーム開発)
    - [メンバー構成](#メンバー構成)
    - [タスク管理方法](#タスク管理方法)
    - [開発の進め方](#開発の進め方)
  - [使用技術](#使用技術)
  - [設計](#設計)
    - [ワイヤーフレーム](#ワイヤーフレーム)
    - [DB（ER図）](#dber図)
    - [API](#api)
      - [Userテーブル関連](#userテーブル関連)
      - [Foodテーブル関連](#foodテーブル関連)
      - [Dealテーブル関連](#dealテーブル関連)
      - [Chatテーブル関連](#chatテーブル関連)
      - [Friendshipテーブル関連](#friendshipテーブル関連)

## サービス
### 概要
自分のいらない食品を投稿し、友達にシェアできる. 友達はその投稿を見て、欲しい食品にリクエストを送信し、マッチングが成立すれば受け取れる.
### デモ

### ターゲットユーザー
友達や家族などとおすそ分けをしたい人
## 機能
- オーナーが出品
  - 食品の情報を入力し投稿
- ユーザーの食品一覧に表示
- ユーザーは欲しい食品にリクエスト可能
  - 食品一覧画面から詳細画面に遷移
  - チャットの初回メッセージ共にリクエストを送信
- チャット
  - 取引一覧画面からチャット画面に遷移
  - チャット画面で取引詳細をやり取り可能
  - 出品者側は取引完了ボタンを押せる

## チーム開発
### メンバー構成
- バックエンド2人
- フロントエンド2人
- フルスタック1人
### タスク管理方法
GitHub Issuesを使って管理.<br>ラベル付けをして、優先順位別に管理.
### 開発の進め方
- Notion, Miroを使ってドキュメントを作成
- バックエンドチームはDB・API設計から開始

## 使用技術
- Frontend
  - React
  - TypeScript
  - daisy UI
  - Vite
- Backend
  - Node.js
  - express.js
  - MySQL
- Development environment
  - Docker: 起動時に自動的に実行されるSQLスクリプトを設定し、チーム開発を柔軟に
  - Eslint
  - Prettier
  - GitHub
## 設計
### ワイヤーフレーム

### DB（ER図）
```mermaid
erDiagram
    User ||--o{ Food : "HAS"
    User ||--o{ Deal : "REQUESTS"
    Food ||--o{ Deal : "IS_DEALT"
    User ||--o{ Chat : "SENDS"
    Deal ||--o{ Chat : "PART_OF"
    User ||--o{ FriendShip : "IS_FOLLOWEE"
    User ||--o{ FriendShip : "IS_FOLLOWER"
    class User {
        int userId
        string userName
        string email
        string password
        datetime createdAt
    }
    class Food {
        int foodId
        string foodName
        string foodImageUrl
        bool isSoldout
        date expirationDate
        float quantity
        string unit
        string description
        datetime createdAt
        datetime updatedAt
    }
    class Deal {
        int dealId
        bool isComplete
        datetime createdAt
    }
    class Chat {
        int chatId
        int senderId
        string content
        datetime createdAt
    }
    class FriendShip {
        int friendShipId
    }
```
### API
#### Userテーブル関連
| 操作 | メソッド | 処理の内容 | エンドポイント | リクエストパラメータ | レスポンス内容 |
| --- | --- | --- | --- | --- | --- |
| 取得 | GET | 特定のユーザー情報の取得 | /users/:id | userID (URL parameter) | User info or error message |
| 新規登録 | POST | 新しいユーザーの作成 | /users/signup | userName, email, password | Confirmation message and Token or error |
| ログイン | POST | ユーザーログイン処理 | /users/login | email, password | Token or error message |
| 変更 | PUT | ユーザー情報の更新 | /users/:id | userID (URL parameter), userName?, email?, password? | Confirmation message or error |
| 削除 | DELETE | ユーザーの削除 | /users:id | userID (URL parameter) | Confirmation message or error |

#### Foodテーブル関連
| 操作 | メソッド | 処理の内容 | エンドポイント | リクエストパラメータ | レスポンス内容 |
| --- | --- | --- | --- | --- | --- |
| 新規登録 | POST | 新しい食品の登録 | /foods | userId, foodName, foodImageUrl?, isSoldout?, expirationDate, quantity, unit, description? | Confirmation message or error |
| 一覧取得（自分） | GET | 自分が出した食品一覧 | /foods/self/:userid | userId | Array of Food objects or error |
| 一覧取得 | GET | 全ての食品のリスト取得(フォローしているユーザーの食品一覧) | /foods/:id | オプション（userId） | Array of Food objects or error |
| 単体取得 | GET | 特定の食品の詳細取得 | /foods/soro/:id | foodId (URL parameter) | Food object or error message |
| 削除 | DELETE | 特定の食品の削除 | /foods/:id | foodId (URL parameter) | Confirmation message or error |
| 変更 | PUT | 特定の食品の情報更新（isSoldOutの更新など） | /foods/:id | foodId (URL parameter), userId?, foodName?, foodImageUrl?, isSoldout?, expirationDate?, quantity?, unit?, description? | Confirmation message or error |

#### Dealテーブル関連
| 操作 | メソッド | 処理の内容 | エンドポイント | リクエストパラメータ | レスポンス内容 |
| --- | --- | --- | --- | --- | --- |
| 新規登録 | POST | リクエスターと食品の登録 | /deals | userID, foodId | deal object or error message |
| 一覧取得
（リクエスト側） | GET | 自分がリクエストした取引を取得 | /deals/requester/:id | userId | Array of deal objects or error message |
| 一覧取得
（オーナー側） | GET | 自分が出品した取引を取得 | /deals/owner/:id | userId | Array of deal objects or error message |
| 変更 | PUT | isCompleteの更新（同じfoodのすべてのレコードに対して行う） | /deals/:id | dealId(URL parameter),
isComplete
 | Confirmation message or error |

 #### Chatテーブル関連
 | 操作 | メソッド | 処理の内容 | エンドポイント | リクエストパラメータ | レスポンス内容 |
| --- | --- | --- | --- | --- | --- |
| 追加 | POST | 新しいチャットメッセージの追加 | /chats | dealId, senderId, content | Confirmation message or error |
| 一覧取得 | GET | dealIdに関連するチャットの一覧取得 | /chats/:dealid | dealId (URL parameter) | Array of Chat objects or error |
| 削除 | DELETE | 特定のチャットメッセージの削除 | /chats/:dealid | dealId (URL parameter) | Confirmation message or error |

#### Friendshipテーブル関連
| 操作 | メソッド | 処理の内容 | エンドポイント | リクエストパラメータ | レスポンス内容 |
| --- | --- | --- | --- | --- | --- |
| フォローする | POST | ユーザーをフォローする | /friendships | { "followeeId": <int>, "followerId": <int> } | { "success": true/false } |
| 友達一覧取得 | GET | 相互フォローのユーザー一覧を取得 | /friendships/:userId | - | { "friends": [<userId1>, <userId2>, ...] } |
| フォロー解除 | DELETE | 特定のユーザーのフォローを解除 | /friendships | { "followeeId": <int>, "followerId": <int> } | Success or Error message |