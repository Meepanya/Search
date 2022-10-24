export type LocalAuthData = {
  username: string;
  password: string;
};

export type LocalUserData = {
  username: string;
  password: string;
  token: string;
};

export type ResponseUserData = {
  username: string;
  token: string;
};

export type LocalUserError = {
  Error: string;
};
