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
// import 'dotenv/config'; // Ensure JWT_SECRET is loaded

// const auth = (req, res, next) => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             token = req.headers.authorization.split(' ')[1];
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);

//             req.userId = decoded.userId;
//             req.userEmail = decoded.email;

//             next();
//         } catch (error) {
//             console.error('Auth error:', error.message);
//             res.status(401).json({ success: false, message: 'Not authorized, token failed.' });
//         }
//     }

//     if (!token) {
//         res.status(401).json({ success: false, message: 'Not authorized, no token.' });
//     }
// };

// export default auth; // Use default export