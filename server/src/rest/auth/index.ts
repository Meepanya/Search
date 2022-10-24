import "./localData/authData";

import authBasic from "./get/auth-basic";
import createUser from "./post/create-user";

export const authName: string = "auth";

const connectAuthAPI = ({ app }) => {
  authBasic({ app });
  createUser({ app });
};

export default connectAuthAPI;
