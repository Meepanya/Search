import {
  LocalAuthData,
  LocalUserData,
  LocalUserError,
  ResponseUserData,
} from "../types/LocalUserData";
import { userBase64url } from "../utils/base64url";

class AuthLocalData {
  private authDictByToken;
  private authDictByUser;

  constructor(authDict) {
    this.authDictByToken = authDict;
    this.authDictByUser = authDict;
  }

  private createToken(): string {
    return userBase64url();
  }

  public createUserData({
    username,
    password,
  }): LocalUserData | LocalUserError {
    if (this.authDictByUser[username]) {
      return {
        Error: "User already exists.",
      };
    }

    const token = this.createToken();
    const userData = {
      username,
      password,
      token,
    };

    this.authDictByToken[token] = userData;
    this.authDictByUser[username] = userData;

    return userData;
  }

  public getUserDataByToken(token): ResponseUserData | null {
    const user = this.authDictByToken[token];

    if (!user) {
      return null;
    }
    return { username: user.username, token: user.token };
  }

  public getUserDataByPassword({
    username,
    password,
  }: LocalAuthData): ResponseUserData | LocalUserError {
    const user = this.authDictByUser[username];

    if (!user) {
      return {
        Error: "User doesn't exist.",
      };
    }

    if (user.password === password) {
      return {
        username,
        token: user?.token,
      };
    }

    if (user.password !== password) {
      return {
        Error: "User password doesn't match.",
      };
    }
  }
}

const authLocalData: AuthLocalData = new AuthLocalData({});

export default authLocalData;
