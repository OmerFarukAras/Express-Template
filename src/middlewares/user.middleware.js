import jwt from "jsonwebtoken";

import { User } from "@models/user.model.js";

import Logger from "@services/logger.js";
const logger = new Logger();

export async function GetUserWithToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) return null;
    return GetUserWithID(decoded.id).then(async (user) => {
      if (!user) return null;
      user = await getUserWithoutCreditentials(user);
      return user;
    });
  });
}

export async function GetUserWithID(id) {
  return User.findOne({ _id: id })
    .then((doc) => {
      return doc;
    })
    .catch((err) => {
      return null;
    });
}

export async function GetUserWithUsername(username) {
  return User.findOne({ username: username })
    .then((doc) => {
      return doc;
    })
    .catch((err) => {
      return null;
    });
}

export async function GetUserWithEmail(email) {
  return User.findOne({ email: email })
    .then((doc) => {
      return doc;
    })
    .catch((err) => {
      return null;
    });
}

export async function CreateUser(username, password, email) {
  if (await GetUserWithUsername(username)) {
    return { error: "User already exists" };
  }

  if (await GetUserWithEmail(email)) {
    return { error: "Mail already exists" };
  }

  let user = new User({
    username,
    password,
    email,
    role: 0,
    created_at: Date.now(),
    updated_at: Date.now(),
  });

  return await user
    .save()
    .then((doc) => {
      let userWithoutPassword = getUserWithoutCreditentials(doc);
      logger.debug("User created: ", userWithoutPassword);
      return userWithoutPassword;
    })
    .catch((err) => {
      return err;
    });
}

export async function CreateToken(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
}

export async function ValidateToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) return false;
    return decoded;
  });
}

export async function getUserWithoutCreditentials(doc) {
  let { password, __v, ...userWithoutPassword } = doc.toObject();
  return userWithoutPassword;
}
