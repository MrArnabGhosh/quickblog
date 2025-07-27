import jwt from 'jsonwebtoken'


const auth = (req,res,next)=>{
    const token = req.headers.authorization

    try {
        jwt.verify(token,process.env.JWT_SECRET)
        next()
    } catch (error) {
        res.json({success:false,message:"Invalid token"})
    }
}

export default auth

// import jwt from 'jsonwebtoken';
// import User from '../models/UserModel.js'; // You NEED to import your User model here

// const auth = async (req, res, next) => { // Make it async because we'll be making a DB call
//     let token;

//     // 1. Check if the Authorization header exists and starts with 'Bearer'
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             // Extract the token (remove "Bearer " prefix)
//             token = req.headers.authorization.split(' ')[1];

//             // 2. Verify the token using your JWT_SECRET
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             // 'decoded' now contains { userId: '...', email: '...', iat: ..., exp: ... }

//             // 3. Find the user in the database based on the userId from the token
//             //    AND ATTACH THE USER OBJECT (including _id) TO THE REQUEST. This is the key step!
//             req.user = await User.findById(decoded.userId).select('-password'); // Select everything except the password

//             // 4. Check if a user was actually found for that ID
//             if (!req.user) {
//                 // If the user ID in the token doesn't correspond to an actual user in DB
//                 return res.status(401).json({ success: false, message: 'User not found for this token. Account might be deleted.' });
//             }

//             // If everything is good, proceed to the next middleware/controller
//             next();
//         } catch (error) {
//             // Handle specific JWT errors for more informative responses
//             if (error.name === 'TokenExpiredError') {
//                 return res.status(401).json({ success: false, message: 'Not authorized, token expired. Please log in again.' });
//             } else if (error.name === 'JsonWebTokenError') {
//                 return res.status(401).json({ success: false, message: 'Not authorized, invalid token.' });
//             } else {
//                 console.error("Auth Middleware Error:", error); // Log any unexpected errors
//                 return res.status(401).json({ success: false, message: 'Not authorized, token validation failed.' });
//             }
//         }
//     } else {
//         // If no token or incorrect format in the header
//         return res.status(401).json({ success: false, message: 'Not authorized, no token provided or incorrect format (e.g., "Bearer <token>").' });
//     }
// };

// export default auth;


