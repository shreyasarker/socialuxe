import Cookie from 'js-cookie';
import CryptoJS from 'crypto-js';
import { v4 as uuid } from 'uuid';

const getEncryptionToken = () => {
  const cookieName = process.env.REACT_APP_COOKIE_NAME;
  const encryptionToken =  Cookie.get(cookieName) ? Cookie.get(cookieName) : uuid();
  if(!Cookie.get(cookieName)) {
    Cookie.set(cookieName, encryptionToken, { secure: true, expires: 180 });
  }
  return encryptionToken;
};

export const fetchUser = () => {
  const encrypted = localStorage.getItem('user') ? localStorage.getItem('user') : localStorage.clear();
  if (encrypted) {
    const decrypted = CryptoJS.AES.decrypt(encrypted, getEncryptionToken()).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  }
  return encrypted;
}

export const setUser = (data) => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), getEncryptionToken()).toString();
  localStorage.setItem('user', encrypted);
}

export const destroyUser = () => {
  localStorage.clear();
  Cookie.remove(process.env.REACT_APP_COOKIE_NAME);
}