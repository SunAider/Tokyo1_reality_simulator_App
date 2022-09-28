import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

const preauthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (token != null && token != '') {
        admin.auth().verifyIdToken(token.replace('Bearer ', ''))
            .then(async decodedToken => {
                req.body['uid'] = decodedToken.uid;
                next();
            })
            .catch(error => {
                console.error(error);
                accessDenied(req.url, res);
            });
    } else {
        accessDenied(req.url, res);
    }
};

function accessDenied(url: string, res: Response) {
    res.status(403).json({
        statusCode: 403,
        timestamp: new Date().toISOString(),
        path: url,
        message: 'Access Denied'
    });
}

export default preauthMiddleware;
