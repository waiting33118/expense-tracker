# 家庭記帳本

這是一個使用 Mongodb + Express + Node.js + Passport 所打造的家庭記帳本網站

**作品連結**

[https://still-fortress-72307.herokuapp.com/](https://still-fortress-72307.herokuapp.com/)

## 專案畫面

**登入畫面/LoginPage**
![專案畫面](/public/images/project_screenshot1.png)

**註冊畫面/RegisterPage**
![專案畫面](/public/images/project_screenshot2.png)

**首頁/MainPage**
![專案畫面](/public/images/project_screenshot3.png)

**修改畫面/EditPage**
![專案畫面](/public/images/project_screenshot4.png)

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

#### 預設測試帳號 Default Testing Account

```
   email:  test1@gmail.com
password:  123456
   email:  test2@gmail.com
password:  123456
```

## 環境建置

```
"bcryptjs": "^2.4.3",
"body-parser": "^1.19.0",
"connect-flash": "^0.1.1",
"dotenv": "^8.2.0",
"express": "^4.17.1",
"express-handlebars": "^4.0.4",
"express-session": "^1.17.1",
"method-override": "^3.0.0",
"mongoose": "^5.9.14",
"passport": "^0.4.1",
"passport-local": "^1.0.0"
```

## 產品功能(User Story)

- 使用者可以瀏覽自己所有的支出以及消費總額
- 使用者可以**新增**單筆花費紀錄
- 使用者可以**修改**記帳紀錄
- 使用者可以**刪除**記帳紀錄
- 使用者可以使用**篩選器**查看**各類別**和**各月份**的消費紀錄與總額
- 遊客必須先註冊帳號才可使用此服務

## Contributor

- [x] TonyChung
