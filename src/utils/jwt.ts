import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET as accessTokenSecret } from "../config";


export const signJwt = (payload: object, options?: jwt.SignOptions): string => {
  return jwt.sign(payload, accessTokenSecret, {
    ...options,
  });
};

export const verifyJwt = (
  token: string,
  options?: jwt.VerifyOptions
): object | null => {
    return jwt.verify(token, accessTokenSecret, {
      ...options,
    }) as object;
};
