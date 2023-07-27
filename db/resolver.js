import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//crea y  firma un JWT
const createToken = (user, keySecret, expiresIn) => {
  console.log(user);
  const { id, email } = user;

  return jwt.sign({ id, email }, keySecret, { expiresIn });
};

const resolvers = {
  //Query: {},
  Mutation: {
    //register user
    createUser: async (_, { input }) => {
      const { email, password } = input;

      //si el usuario existe
      const userExists = await Usgiter.findOne({ email });

      //si el usuario existe
      if (userExists) {
        throw new Error("El usuario ya esta registrado");
      }

      try {
        //hashear password
        const salt = await bcryptjs.genSalt(10);
        input.password = await bcryptjs.hash(password, salt);

        //registrar nuevo usuario
        const newUser = new User(input);
        newUser.save();

        return "Usuario creado correctamente!";
      } catch (error) {
        console.log(error);
      }
    },

    //login user
    authenticateUser: async (_, { input }) => {
      const { email, password } = input;

      //si el usuario existe
      const userExists = await User.findOne({ email });

      //si el usuario no existe
      if (!userExists) {
        throw new Error("El usuario no existe");
      }

      //si el password existe
      const passwordCorrect = await bcryptjs.compare(
        password,
        userExists.password
      );

      if (!passwordCorrect) {
        throw new Error("Password Incorrecto");
      }

      //dar acceso a la app
      return {
        token: createToken(userExists, process.env.KEY_SECRET, "2hr"),
      };
    },
  },
};

export default resolvers;
