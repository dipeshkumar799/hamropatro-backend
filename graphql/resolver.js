import bcrypt from "bcrypt"; //to hash the password
import User from "../models/User.js";
import connectDB from "../db.js";
connectDB();
import { Types } from "mongoose"; //to define id in mongoose like (_id: new Types.ObjectId(id))
// Call the connectDB function to connect to MongoDB

const resolvers = {
  Query: {
    users: async (_, { id }) => {
      const user = await User.findById(id); //findById means to find data bassess of id
      console.log(user);

      if (!user) {
        throw new Error("user  not found");
      }
      if (!user.isLoggedIn) {
        throw new Error("user is not logged in please loged in");
      }

      return User.find(); //find() use for to return whole Data
    },

    user: async (_, { id }) => {
      const user = await User.findOne({ id }); //findOne means to find data  in the  basess of  any propertiies(like id,email);
      console.log(user);

      if (!user) {
        throw new Error("user not found");
      }
      if (!user.isLoggedIn) {
        throw new Error("User is not loggedin please login");
      }
      return user;
    },

    upDatemanyData: async (_, { id }) => {
      const user = await User.updateMany(
        { _id: new Types.ObjectId(id) },
        {
          firstName: "skdzxclf",
          lastName: "jdkzcxsa",
        }
      );
      console.log(user);
      return user;
    },
    deleteData: async (_, { id }) => {
      const user = await User.deleteOne(
        { _id: new Types.ObjectId(id) },
        { firstName: "dipesh" }
      );
      console.log(user);
      return user;
    },
  },

  Mutation: {
    signUp: async (_, { firstName, lastName, email, password }) => {
      const user = await User.findOne({ email: email });
      console.log(user);
      if (user) {
        throw new Error("user already exist please login");
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const userInstance = await User.create({
        email,
        password: hash,
        firstName,
        lastName,
        isLoggedIn: true,
      });

      return await userInstance.save();
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email: email }).select(
        "password email"
      );
      console.log(user);

      if (!user) {
        throw new Error("User not found");
      }
      const isValid = await bcrypt.compare(password, user.password);
      console.log(isValid);

      if (!isValid) {
        throw new Error("password doesnot match");
      }

      user.isLoggedIn = true;

      const userUpDate = await user.save();
      console.log(userUpDate);
      userUpDate.password = null;
      return userUpDate;
    },

    logout: async (_, { id }) => {
      const user = await User.findById(id);
      console.log(user);
      if (!user) {
        throw new Error("User not found");
      }
      if (!user.isLoggedIn) {
        throw new Error("user not loggedin");
      }
      user.isLoggedIn = false;
      const deleteData = await user.save();
      deleteData.password = null;
      return deleteData;
    },

    update: async (_, { id, firstName, lastName }) => {
      const user = await User.findById(id);
      console.log(user);
      if (!user) {
        throw new Error("user not found");
      }
      if (!user.isLoggedIn) {
        throw new Error("user not loggedin");
      }
      const updateUser = await User.updateOne(
        { _id: new Types.ObjectId(id) },
        { firstName, lastName }
      );
      console.log(updateUser);
      return { ...user, firstName, lastName };
    },

    deleteData: async (_, { id }) => {
      const user = await User.findById(id);
      console.log(user);
      if (!user) {
        throw new Error("user not found");
      }
      if (!user.isLoggedIn) {
        throw new Error("user not loggedin");
      }
      const deleteUser = await User.deleteOne({ _id: new Types.ObjectId(id) });
      console.log(deleteUser);

      return `User ${user.firstName} ${user.lastName} deleted successfully`;
    },
  },
};
export default resolvers;
