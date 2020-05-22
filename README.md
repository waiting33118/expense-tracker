# 家庭記帳本

這是一個使用 Mongodb + Express + Node.js 所打造的家庭記帳本網站

作品連結

[pica](https://nodeca.github.io/pica/demo/)

## 專案畫面

首頁

![專案畫面](/public/images/project_screenshot.png)

新增頁面

![專案畫面](/public/images/project_screenshot2.png)

## 安裝&使用

#### 下載專案

```
git clone https://github.com/waiting33118/expense-tracker.git
```

#### 安裝 Package

```
npm install
```

#### 建立預設種子

```
npm run seed
```

#### 使用 nodemon 啟動伺服器

```
npm run dev
```

#### 或正常啟動

```
npm start
```

## 環境建置

- Node.js v12.16.3 -執行環境
- Express V4.17.1 -框架
- Express-handlebars V4.0.4 -模板引擎
- Body-Parser V1.19.0 -解析 POST 資料
- Method-Override V3.0.0 改寫 POST Method
- Mongoose V5.9.14 -mongoDB ODM

## 產品功能(User Story)

- 使用者可以瀏覽所有支出以及消費總額
- 使用者可以**新增**單筆花費紀錄
- 使用者可以**修改**記帳紀錄
- 使用者可以**刪除**記帳紀錄
- 使用者可以使用**篩選器**查看**各類別**的消費紀錄與總額

## Contributor

- [x] TonyChung
