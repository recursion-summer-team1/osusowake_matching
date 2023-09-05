# ベースとなるイメージを指定
FROM node:12

# 作業ディレクトリを指定
WORKDIR /var/backend

# 依存関係のコピーとインストール
COPY backend/package*.json ./
RUN npm install

# nodemonをインストール
RUN npm install nodemon -g

# アプリケーションのソースをコピー
COPY ./backend/ ./

# nodemonを使ってアプリを起動
CMD ["nodemon", "var/backend/bin/www"]
