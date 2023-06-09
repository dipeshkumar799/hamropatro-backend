import bcrypt from "bcrypt"; // to hash the password
import User from "../models/User.js";
import newOTP from "otp-generators";
import sendEmail from "../utils/email.js";
import connectDB from "../utils/db.js";
import getForex from "../forex/forex.js";
import { Types } from "mongoose"; //to define id in mongoose like (_id: new Types.ObjectId(id))
import scrapeWebsite from "../utils/golldsilver.js";
import GoldSilver from "../models/GoldSilver.js";
import Chat from "../models/Chat.js";
import { PubSub } from "graphql-subscriptions";
import Conversation from "../models/Conversation.js";
import { ad2bs, bs2ad } from "ad-bs-converter";
import processFiles from "../utils/multer.js";
import Note from "../models/Note.js";
import getBillionarie from "../billioniries/billioniries.js";
import Billion from "../models/Billionar.js";
import Event from "../models/Event.js";

const pubsub = new PubSub();
connectDB();
// Call the connectDB function to connect to MongoDB

const resolvers = {
  Query: {
    users: async (_, { id }) => {
      const user = await User.findById(id).exec(); //findById means to find data-bassess of id

      if (!user) {
        throw new Error("user  not found");
      }
      if (!user.isLoggedIn) {
        throw new Error("user is not logged in please loged in");
      }

      return User.find(); //find() use for to return whole Data
    },

    user: async (_, { id }) => {
      const user = await User.findOne({ id }).exec(); //findOne means to find data  in the  basess of  any propertiies(like id,email);
      console.log(user);

      if (!user) {
        throw new Error("user not found");
      }
      if (!user.isLoggedIn) {
        throw new Error("User is not loggedin please login");
      }
      return user;
    },

    getForexs: async () => {
      const getForexData = await getForex();
      return getForexData;
    },

    goldSilver: async () => {
      const goldSilvers = await scrapeWebsite();
      const newGoldSilver = await GoldSilver.create({
        goldHallmarkTola: goldSilvers.goldHallmarkTolaPrice,
        goldTejabitola: goldSilvers.goldTejabiTolaPrice,
        silvertola: goldSilvers.silverTolaPrice,
        goldHallmarkGram: goldSilvers.goldHallmarkGramPrice,
        goldTejabiGram: goldSilvers.goldTejabiGramPrice,
        silverGram: goldSilvers.silverGramPrice,
      });
      await newGoldSilver.save();
      const goldSilverList = await GoldSilver.find().exec();
      return goldSilverList;
    },

    conversations: async (_, { conversationId }) => {
      const conversation = await Conversation.findById({
        id: conversationId,
      }).exec();
      return conversation.messages;
    },
    convertToBS: (_, { year, month, day }) => {
      const formattedDate = `${year}/${month}/${day}`;
      const convertedDate = ad2bs(formattedDate);

      return {
        year: convertedDate.en.year,
        month: convertedDate.en.month,
        day: convertedDate.en.day,
      };
    },
    convertToAD: (_, { year, month, day }) => {
      const formattedDate = `${year}/${month}/${day}`;
      const convertedDate = bs2ad(formattedDate);

      return {
        year: convertedDate.year,
        month: convertedDate.month,
        day: convertedDate.day,
      };
    },
    notes: async () => {
      const getAllNotes = await Note.find().exec();
      return getAllNotes;
    },
    note: async (_, { _id }) => {
      const getSingleNote = await Note.findById({ _id }).exec();
      return getSingleNote;
    },
    getBillionaries: async () => {
      const getBillionarieAll = await getBillionarie();
      const billionaires = getBillionarieAll.map((billionaire) => {
        return {
          name: billionaire.person.name,
          country: billionaire.country,
          countryOfCitizenship: billionaire.countryOfCitizenship,
        };
      });
      return await Billion.insertMany(billionaires);
    },
    events: async () => {
      const evNt = await Event.find();
      return evNt;
    },
  },

  Mutation: {
    uploadFiles: async (_, { files }) => {
      try {
        // Process the uploaded files
        const response = await processFiles(files);
        return response;
      } catch (error) {
        throw new Error("File upload failed");
      }
    },

    signUp: async (_, { firstName, lastName, email, password, otp }) => {
      const user = await User.findOne({ email: email }).exec();
      console.log(user);
      if (user) {
        throw new Error("user already exist please login");
      }

      const OTP = newOTP.generate(6, {
        alphabets: false,
        upperCase: false,
        specialChar: false,
      });

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const userInstance = await User.create({
        email,
        password: hash,
        firstName,
        lastName,
        otp: OTP,
        isLoggedIn: false,
      });
      console.log(userInstance);

      const messageId = await sendEmail(
        email,
        "signup otp",
        `Your otp code is ${OTP}`
      );
      if (!messageId) {
        throw new Error("Email couldn't be sent");
      }

      return await userInstance.save();
    },

    verifyOtp: async (_, { email, otp }) => {
      const user = await User.findOne({ email, otp }).exec();
      if (!user) {
        throw new Error("Make sure email and otp is correct");
      }

      user.isLoggedIn = true;
      return user.save();
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email: email })
        .select("password email")
        .exec();
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

    forgetPassword: async (_, { email }) => {
      const user = await User.findOne({ email }).exec();
      if (!user) {
        throw new Error("account counldn't be found");
      }
      const OTP = newOTP.generate(6, {
        alphabets: false,
        upperCase: false,
        specialChar: false,
      });

      const otpSent = await sendEmail(
        email,
        "forget  otp",
        `Your otp code is ${OTP}`
      );
      if (!otpSent) {
        throw new Error("Email couldn't be sent");
      }
      user.otp = OTP;
      user.isLoggedIn = false;
      user.save();
      return "your opt has gone in your mail";
    },
    changePassword: async (_, { email, currentpassword, newpassword }) => {
      const user = await User.findOne({ email }).exec();
      if (!user) {
        throw new Error("invalid email");
      }
      const isValid = await bcrypt.compare(newpassword, currentpassword);
      console.log(isValid);

      if (!isValid) {
        throw new Error("password doesnot match");
      }
      const hash = await bcrypt.hash(newpassword, saltRounds);
      user.password = hash;
      user.isLoggedIn = true;
      user.save();
      return "your password  was changed";
    },

    logout: async (_, { id }) => {
      const user = await User.findById(id).exec();
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
      const user = await User.findById(id).exec();
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
      ).exec();
      console.log(updateUser);
      return { ...user, firstName, lastName };
    },

    deleteData: async (_, { id }) => {
      const user = await User.findById(id).exec();

      if (!user) {
        throw new Error("user not found");
      }
      if (!user.isLoggedIn) {
        throw new Error("user not loggedin");
      }
      const deleteUser = await User.deleteOne({
        _id: new Types.ObjectId(id),
      }).exec();

      return `User ${user.firstName} ${user.lastName} deleted successfully`;
    },
    sendMessage: async (
      _,
      { senderId, recipientId, content, conversationId }
    ) => {
      const conversation = await Conversation.findById({
        _id: conversationId,
      }).exec();

      if (!conversation) {
        throw new Error("Conversation must exist");
      }
      const chatInstance = await Chat.create({
        content,
        senderId,
        recipientId,
        conversation,
        createdAt: new Date().toISOString(),
      });
      const chat = await chatInstance.save();
      pubsub.publish(`NEW_MESSAGE_${recipientId}`, { newMessage: chat });
      return chat;
    },

    createConversation: async (_, { participantIds }) => {
      const conversationInstance = await Conversation.create({
        participants: participantIds,
        messages: [],
      });
      const conversation = await conversationInstance.save();

      return conversation;
    },
    createNote: async (_, { title, content, status, colorPalatte }) => {
      try {
        const noteInstance = await Note.create({
          title,
          content,
          status,
          colorPalatte,
        });

        const newNote = await noteInstance.save();
        return newNote;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to create note");
      }
    },
    // New resolver for deleting a note
    deleteNote: async (_, { _id }) => {
      const deletedNote = await Note.findById(_id).exec();
      console.log(deletedNote);
      if (!deletedNote) {
        throw new Error("Note not found"); // Throw an error if the note was not found
      }
      const Notedelete = await Note.deleteOne({ _id }).exec();
      console.log(Notedelete);
      return Notedelete;
    },
    updateNote: async (_, { _id, title, content }) => {
      const noteInstance = await Note.findById({ _id }).exec();
      if (!noteInstance) {
        throw new Error("ID is not found");
      }
      const updateNote = await Note.updateOne(
        { _id },
        { title, content }
      ).exec();

      return { ...noteInstance };
    },
    createBillionaire: async (_, { name, country, countryOfCitizen }) => {
      //   const Billionariess = await Billiondata.filter();
      const billionaire = await Billion.create({
        name,
        country,
        countryOfCitizen,
      });

      return await billionaire.save();
    },
    createEvent: (_, { title, description, date }) => {
      const event = new Event({ title, description, date });
      return event.save();
    },
  },

  Subscription: {
    newMessage: {
      subscribe: (_, { recipientId }) => {
        return pubsub.asyncIterator(`NEW_MESSAGE_${recipientId}`);
      },
    },
  },
};

export default resolvers;
