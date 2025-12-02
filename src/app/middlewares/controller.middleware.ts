import { Request, Response, NextFunction } from "express";

const controller = (service: (req: Request, res: Response) => Promise<any>) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await service(req, res);
      const { data = null } = result || {};
      res.json({
        data
      });
    } catch (error) {
      next(error);
    }
  };
};

export { controller };
