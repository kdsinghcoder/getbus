import UserSchema from "../models/user.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    // TO DO VALIDATION
    try {
        const userExist = await UserSchema.findOne({ email: email });
        if (userExist) {
            console.log("User alreafy exist");
        } else {
            const user = new UserSchema({ name, email, password });
            const userRegister = await user.save();
            if (userRegister) {
                console.log("new user created");
                res.status(200).json({ message: "User Created" });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export const signinUser = async (req, res) => {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
        console.log("enter a all fields");
        return res.status(400).json({ error: "plzz enter all fields" });
    }
    try {
        const userInDb = await UserSchema.findOne({ email: email });
        if (!userInDb) {
            res.status(400).json({ error: "User do not exist" });
        } else {
            const isMatch = await bcrypt.compare(password, userInDb.password);

            //jwt tocken generation
            token = await userInDb.generateAuthToken();
            console.log(token);

            //set up cookie
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
            });
            // console.log(isMatch + "Is match");
            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credientials" });
            } else {
                res.status(200).json({ Message: "Welcome" });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export const isLogedIn = async (req, res) => {
    console.log("welcome to feed page");
    res.send(req.rootUser);
};

export const logout = async (req, res) => {
    console.log("hellow from logout");
    res.clearCookie("jwtoken");
    res.status(200).send("User Logedout");
};
