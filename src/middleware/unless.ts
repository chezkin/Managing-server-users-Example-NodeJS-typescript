import { Request, Response, NextFunction, RequestHandler } from "express";


export const unless = function(path : string[], middleware : (req: Request, res: Response, next: NextFunction) => void ) {
    return function(req: Request, res: Response, next: NextFunction) {
        if (path.includes(req.path)) {
            return next();
        } else {
            return middleware(req, res, next);
        }
    };
};