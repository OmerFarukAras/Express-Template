***_Basic Auth System and posting system with Express & mongoose (Now only user system active.)_***

*This project using esm-module-alias*


Routes
---

- */api/user/register*
- */api/user/login*
- */api/user/*

---

- */api/test*

---

How To run: 

Firstly set .env file

```env
MONGO_URL=your_mongourl
JWT_SECRET=your_secret_using_in_jwt
```
Then
```shell 
npm install

node --loader esm-module-alias/loader --no-warnings main.js
```