import { users, quotes } from "./fakedb.js";
import { randomBytes } from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const User = mongoose.model("User");
const Quote = mongoose.model("Quote");

const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (parent, args) => await User.findOne({ _id: args._id }), //users.find((user) => user._id == args._id),
    quotes: async () => await Quote.find({}),
    quote: async (_, { by }) => await Quote.find({ by }), //quotes.filter((quote) => quote.by == by),
    myprofile: async (_, args, { userId }) => {
      if (!userId) {
        throw new Error("you must be logged in.");
      }
      return await User.findOne({ _id: userId });
    },
  },
  User: {
    quotes: async (ur) => await Quote.find({ by: ur._id }), //its relation of quotes with users. //quotes.filter((quote) => quote.by == ur._id),
  },
  Quote: {
    creator: async (qt) => await User.findOne({ _id: qt.by }), //its relation of quotes with users
  },
  Mutation: {
    signupUser: async (_, { userNew }) => {
      // const id = randomBytes(5).toString("hex");
      // users.push({
      //   _id:id,
      //   ...userNew
      // });
      // return users.find((user) => user._id == id);
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("User is already exist with this email.");
      }
      const hashedPassword = await bcrypt.hash(userNew.password, 10);
      const newUserCreate = new User({
        ...userNew,
        password: hashedPassword,
      });
      return await newUserCreate.save();
    },
    signInUser: async (_, { userSignIn }) => {
      const user = await User.findOne({ email: userSignIn.email });
      if (!user) {
        throw new Error("User don't exist with this email.");
      }
      const doMatch = await bcrypt.compare(userSignIn.password, user.password);
      if (!doMatch) {
        throw new Error("email or password is invalid.");
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return { token };
    },
    updateUser: async (_, { userUpdate }, { userId }) => {
      const user = await User.findOne({ email: userUpdate.email });
      if (user === null) {
        throw new Error("Email is not correct.");
      }
      if (userId !== user._id.toString()) {
        throw new Error(
          "User is not same as you want. Please choose correct email."
        );
      }
      const updatedUser = await User.findOneAndUpdate(
        {
          email: userUpdate.email,
        },
        {
          firstName:
            userUpdate.firstName !== undefined
              ? userUpdate.firstName
              : user.firstName,
          lastName:
            userUpdate.lastName !== undefined
              ? userUpdate.lastName
              : user.lastName,
          password:
            userUpdate.password !== undefined
              ? await bcrypt.hash(userUpdate.password, 10)
              : user.password,
        }
      );
      return await User.findOne({ email: updatedUser.email });
    },
    createQuote: async (_, { name }, { userId }) => {
      if (!userId) {
        throw new Error("you must be logged in.");
      }
      const newQuote = new Quote({
        name,
        by: userId,
      });
      await newQuote.save();
      return "Quote save successfully.";
    },
  },
};

export default resolvers;
