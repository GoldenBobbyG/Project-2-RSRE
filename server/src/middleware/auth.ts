import {Request, Response, NextFunction} from 'express';

// Extend the Request interface to include the 'user' property
declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload;
        }
    }
}
import * as jwt from 'jsonwebtoken';

interface JWTPayload {
    username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split('')[1];
      const secretKey = process.env.JWT_SECRET_KEY || '';
  
      jwt.verify(token, secretKey, (err, user) => {
        if (err) {
        return res.sendStatus(403);
        }
  
        req.user = user as JWTPayload;
        return next();
      });
    }else {
        res.sendStatus(401);
    }

};