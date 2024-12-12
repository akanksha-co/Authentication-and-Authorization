const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.Decode = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Token missing",
            });
        }
        const token = authHeader.split(' ')[1]; 

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid or expired token",
                });
            }
            req.auth = { user: decoded };
            return res.status(200).json({
                success: true,
                message: "Token decoded successfully",
                data: { user: decoded }
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

exports.isInstructor = (req, res, next) => {
    try {
        if (!req.auth || req.auth.user.Role !== 'Instructor') {
            return res.status(403).json({
                success: false,
                message: "This is a protected route for Admins",
            });
        }

        next(); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


exports.isStudents = (req, res, next) => {
    try {
    
        if (!req.auth || !req.auth.user.Role) {
            return res.status(401).json({
                success: false,
                message: "You are a visitor, please log in",
            });
        }

        
        if (req.auth.user.Role === 'Student') {
            return next(); 
        } else {
            return res.status(403).json({
                success: false,
                message: "This is a protected route for Students",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
