import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// some TS new expression? This makes sure the env is there otherwise it will exit
const secreteKey = process.env.JWT_SECRET!;
export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'] as string;
    if (!token) {
      return res.status(403).json({ message: 'No token provided.' });
    }
    else{
        if(token !== secreteKey) 
            return res.status(401).json({ message: 'Failed to authenticate token.' });
        else{
            next();
        }
    }
}
