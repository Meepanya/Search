var CryptoJS = require("crypto-js");
import sha256 from "crypto-js/sha256";

export const userBase64url = () => {
  const HMACSHA256 = (stringToSign, secret) => sha256(stringToSign + secret);

  const header = {
    alg: "HS256",
    typ: "JWT",
    kid: "vpaas-magic-cookie-1fc542a3e4414a44b2611668195e2bfe/4f4910",
  };
  const encodedHeaders = btoa(JSON.stringify(header));

  // The second part of the token is the payload, which contains the claims.
  // Claims are statements about an entity (typically, the user) and
  // additional data. There are three types of claims:
  // registered, public, and private claims.
  const claims = {
    role: "user",
  };
  const encodedPlayload = btoa(JSON.stringify(claims));

  // create the signature part you have to take the encoded header,
  // the encoded payload, a secret, the algorithm specified in the header,
  // and sign that.
  const signature = HMACSHA256(
    `${encodedHeaders}.${encodedPlayload}`,
    "mysecret"
  );
  const encodedSignature = btoa(signature);

  const jwt = `${encodedHeaders}.${encodedPlayload}.${encodedSignature}`;

  return jwt;
};
