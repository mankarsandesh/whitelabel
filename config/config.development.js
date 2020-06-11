const config = {
  version: "1",
  authUser: `${process.env.AUTH_USER}`,
  authPassword: `${process.env.AUTH_PASS}`,
  apiDomain: process.env.API_DOMAIN,
  socketUrl: process.env.SOCKET_URL,
  baseUrl: process.env.BASE_URL,
  secretKey: "CC21128A312FAF7817C93D1B51CB9",
  secureStorageSecretKey: process.env.SECURE_STORAGE_SECRET_KEY,
  sessionExpiryTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  isMaintenance: process.env.MAINTENANCE_MODE,
  header: {
    authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh"
  },
  userRegisterAuth: {
    url: `${process.env.BASE_URL}/webUserLogin`
  },
  userLoginAuth: {
    url: `${process.env.BASE_URL}/webUserLogin`
  },
  userForgotPassword: {
    url: `${process.env.BASE_URL}/webUserLogin`
  },
  stockUrl: {
    getStock: `${process.env.BASE_URL}/getStock`
  }
};
export default config;
