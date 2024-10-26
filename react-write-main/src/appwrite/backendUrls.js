export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const V1 = "v1";

export const VERSION = `/api/${V1}`;

export const LOGIN_URI = `${BACKEND_URL}${VERSION}/signin`;

export const LOGOUT_URI = `${BACKEND_URL}${VERSION}/signout`;

export const CREATE_POST_URI = `${BACKEND_URL}${VERSION}/post`;

export const DELETE_POST_URI = `${BACKEND_URL}${VERSION}/post`;

export const UPDATE_POST_URI = `${BACKEND_URL}${VERSION}/post`;

export const SIGN_UP_URI = `${BACKEND_URL}${VERSION}/signup`;

export const GET_USER = `${BACKEND_URL}${VERSION}/user`

export const GET_POSTS = `${BACKEND_URL}${VERSION}/posts`;

export const GET_POST_BY_ID = `${BACKEND_URL}${VERSION}/post`;

