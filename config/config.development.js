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
    authorization: `${process.env.BASIC_AUTH}`
  },
  mainServer: {
    url: `${process.env.MAIN_GAME}`
  },
  portalProviderID: {
    url: `${process.env.portalProviderID}`
  },
  userRegisterAuth: {
    url: `${process.env.BASE_URL}/register`
  },
  userLoginAuth: {
    url: `${process.env.BASE_URL}/loginWebUser`
  },
  getUserProfile: {
    url: `${process.env.BASE_URL}/getUserProfile`
  },
  userForgotPassword: {
    url: `${process.env.BASE_URL}/forgotPassword`
  },
  userVerifyOtp: {
    url: `${process.env.BASE_URL}/verifyOtp`
  },
  userResetPassword: {
    url: `${process.env.BASE_URL}/resetPassword`
  },
  userUpdateDetails: {
    url: `${process.env.BASE_URL}/updateUserProfile`
  },
  userToPupBalance: {
    url: `${process.env.BASE_URL}/userToPupBalance`
  },
  registerBankDetail: {
    url: `${process.env.BASE_URL}/registerBankDetail`
  },
  userUpdateBankDetail: {
    url: `${process.env.BASE_URL}/updateBankDetail`
  },
  getUserBankDetails: {
    url: `${process.env.BASE_URL}/getUserBankDetail`
  },
  userChangePassword: {
    url: `${process.env.BASE_URL}/changePassword`
  },
  userWithdrawalRequest: {
    url: `${process.env.BASE_URL}/userWithdrawalRequest`
  },
  userTransactionHistory: {
    url: `${process.env.BASE_URL}/transactionHistory`
  },
  deleteUserBankDetail: {
    url: `${process.env.BASE_URL}/deleteUserBankDetail`
  },
  ECGameLogin :{
    url: `${process.env.BASE_URL}/ecGameLogin`
  },
  defaultLanguageLocale: "cn",
  language: {
    cn: "chinese",
    us: "english",
    th: "thai",
    la: "lao"
  },
};
export default config;
