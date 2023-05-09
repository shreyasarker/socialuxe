import Cookie from 'js-cookie';
import { v4 as uuid } from 'uuid';

const cookieName = process.env.REACT_APP_COOKIE_NAME;
const encryptionToken =  Cookie.get(cookieName) ? Cookie.get(cookieName) : uuid();

const tokenHelper = () => {
  if(!Cookie.get(cookieName)) {
    Cookie.set(cookieName, encryptionToken, { secure: true, expires: 180 });
  }
  return {encryptionToken};
};

export default tokenHelper;