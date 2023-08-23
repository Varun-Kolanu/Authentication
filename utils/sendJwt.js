import jwt from "jsonwebtoken";

export const sendJwt = (user,res,message,statusCode = 200) => {
    const token = jwt.sign({email: user.user_email}, process.env.JWT_SECRET);
    res
    .status(statusCode)
    .json({
        success: true,
        token,
        message
    })
}