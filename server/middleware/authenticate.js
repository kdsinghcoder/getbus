import jwt from "jsonwebtoken"
import userSchema from "../models/user.js"


const Authenticate = async (req, res, next) => {

    try {
        const token = req.cookies.jwtoken;
        if(!token){
            throw new Error('User Not Found');
        }
        const varifyToken = jwt.verify(token, process.env.SECRET_KEY)

        const rootUser = await userSchema.findOne({ _id: varifyToken._id, "tokens.token":token });
        if (!rootUser) {
            throw new Error('User Not Found');
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();
    } catch (error) {
        res.status(401).send("no token")
        console.log(error);
    }

}
export default Authenticate;