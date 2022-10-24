export const UserRole = {
  Admin: "Admin",
  Merchant: "Merchant",
};


// QzAwMDAzNTA0Mzh8MTEwMDQxNzg2OTkwfGEwMmU2Mjg1ZmZhY2ZlMTVhNmYzZTVmZTFiMGQzNmMzYThmNDRhZTViZDM4OWMxZDU1YWYwODU1ZjE5YTA4MmYwNjAxZTYyZmRjMzVkMzUyNWI2MjFlYjkxNjZjZmE2NWU5MmUyZTU1MDRjYjJlMGY4ZDBkNjRhOGRmMjBmYjkw

// 220958020a355c907db5a9c7bf1c2a7e112d8788d3f7c838ead43008941969537099731c9ed8f37cc08e27bda7edab1711d7ed4ac873e6f73d824acf6a57cf1d

// S#qhnJ4CYVFu*ah93urfhzWUhcArvkmw


// export const UserRole = {
//   Admin: 0,
//   Editor: 1,
// };

/*
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = 'menu-default';

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = 'en';
export const localeOptions = [
  { id: 'en', name: 'English - LTR', direction: 'ltr' },
  { id: 'es', name: 'Español', direction: 'ltr' },
  { id: 'enrtl', name: 'English - RTL', direction: 'rtl' },
];

export const firebaseConfig = {
  apiKey: 'AIzaSyBBksq-Asxq2M4Ot-75X19IyrEYJqNBPcg',
  authDomain: 'gogo-react-login.firebaseapp.com',
  databaseURL: 'https://gogo-react-login.firebaseio.com',
  projectId: 'gogo-react-login',
  storageBucket: 'gogo-react-login.appspot.com',
  messagingSenderId: '216495999563',
};

export const adminRoot = '/app';
export const appRoot = '/';
export const buyUrl = 'https://1.envato.market/k4z0';
export const searchPath = `${adminRoot}/#`;
export const servicePath = 'https://api.coloredstrategies.com';

export const currentUser = {
  id: 1,
  title: 'Sarah Kortney',
  img: '/assets/img/profiles/l-1.jpg',
  date: 'Last seen today 15:24',
  role: UserRole.Admin,
};

export const themeColorStorageKey = '__theme_selected_color';
export const isMultiColorActive = false;
export const defaultColor = 'light.redruby';
export const isDarkSwitchActive = true;
export const defaultDirection = 'ltr';
export const themeRadiusStorageKey = '__theme_radius';
export const isAuthGuardActive = true;
export const colors = [
  'bluenavy',
  'blueyale',
  'blueolympic',
  'greenmoss',
  'greenlime',
  'purplemonster',
  'orangecarrot',
  'redruby',
  'yellowgranola',
  'greysteel',
];



// export const BASE_URL = "http://icard-api.smadeandsmight.com/api";
// export const BASE_URL = "https://localhost:44331/api"
export const BASE_URL = "https://staging-api.icadpay.com/api";
const BASE_AUTH = `${BASE_URL}/Auth`;
const BASE_ADMIN = `${BASE_URL}/Admin`;
const BASE_MERCHANT = `${BASE_URL}/Merchant`;
const BASE_SETTINGS = `${BASE_URL}/Settings`;
const BASE_REPORT = `${BASE_URL}/Report`;
const BASE_PAYMENT = `${BASE_URL}/Payment`;
// const BASE_PAYMENT = `https://staging-api.icadpay.com`;

export const QUERY_DEMO = `${BASE_URL}/query-status`;

export const MERCHANT_TYPE_LIST = `${BASE_MERCHANT}/merchantCategory`;

export const MERCHANTS_LIST = `${BASE_ADMIN}/allMerchants`;
export const ADMIN_USERS_LIST = `${BASE_ADMIN}/allAdmin`;
export const CONFIRM_MERCHANT = `${BASE_ADMIN}/ConfirmMerchant`;
export const VIEW_DOCUMENT = `${BASE_ADMIN}/document`;
export const REMITA_SETTLEMENT = `${BASE_ADMIN}/allMerchantSettlements`;

export const MERCHANT_PROFILE =  `${BASE_MERCHANT}/merchantProfile`;
export const MERCHANT_BANKS =  `${BASE_MERCHANT}/merchantBank`;
export const NEW_MERCHANT_BANKS =  `${BASE_MERCHANT}/addBankAccount`;
export const NEW_SUB_ACCOUNTS = `${BASE_MERCHANT}/sub/newMerchantSub`;
export const MERCHANT_SUB_ACCOUNTS = `${BASE_MERCHANT}/allMerchantAccounts`;
export const USERS_LIST = `${BASE_MERCHANT}/allUsers`;
export const CUSTOMER_LIST = `${BASE_MERCHANT}/allCustomers`;
export const UPLOAD_DOCUMENT = `${BASE_MERCHANT}/uploadDocument`;
export const TRANSACTIONS_LIST = `${BASE_MERCHANT}/allTransactions`;
export const TRANSACTION_ITEM = `${BASE_MERCHANT}/singleTransaction`;
export const WALLET_HISTORY = `${BASE_MERCHANT}/walletHistory`;
export const WALLET_BALANCE = `${BASE_MERCHANT}/walletBalance`;
export const WALLET_TOPUP = `${BASE_MERCHANT}/walletTopup`;
export const ADD_HOOKS = `${BASE_MERCHANT}/webhooks`; 


const BASE_ALT_BILLER = `${BASE_URL}/AltBiller`;
export const LIST_BILL_CAT = `${BASE_ALT_BILLER}/servicesCategory`;
export const LIST_BILL_SERVICE = `${BASE_ALT_BILLER}/serviceByIdentifier`;
export const LIST_BILL_SERVICE_VARIETIES = `${BASE_ALT_BILLER}/serviceVariety`;
export const INIT_PAY = `${BASE_ALT_BILLER}/initiatePayment`;
export const VERIFY_CUSTOMER = `${BASE_ALT_BILLER}/customerValidation`;


export const ACCOUNT_SIGNUP = `${BASE_AUTH}/merchant/register`;
export const LOGIN_URL = `${BASE_AUTH}/authenticate`;
export const NEW_SUB_USER = `${BASE_AUTH}/createUser`;
// export const APP_TWO_FA_AUTH = `${BASE_AUTH}/appTwoFaAuthorize`;
export const APP_TWO_FA_AUTH = `${BASE_AUTH}/twoFaAuthorize`;
export const SMS_TWO_FA_AUTH = `${BASE_AUTH}/SmsTwoFaAuthorize`;
export const REQ_TWO_FA = `${BASE_AUTH}/requestEnableTwoFA`;
export const ENABLE_TWO_FA = `${BASE_AUTH}/enableTwoFA`;
export const DISABLE_TWO_FA = `${BASE_AUTH}/disableTwoFA`;
export const DISABLE_TWO_FA_REQ = `${BASE_AUTH}/disableTwoAltFA`;


export const EMAIL_CONFIRM = `${BASE_AUTH}/ConfirmEmail`;
export const FORGOT_PASSWORD = `${BASE_AUTH}/ResetPasswordRequest`;
export const PASSWORD_RESET = `${BASE_AUTH}/ResetPassword`;
export const CHANGE_PASS = `${BASE_AUTH}/ChangePassword`;
export const APP_SETTINGS = `${BASE_URL}/register`;


export const ACCOUNT_QUERY = `${BASE_PAYMENT}/accountEnquiry`;
export const FUND_TRANSFER = `${BASE_PAYMENT}/newPayment`;


export const LINE_CHART = `${BASE_REPORT}/transactionSeries`;
export const UN_SUM = `${BASE_REPORT}/transactionSum`;



export const GET_BANKS = `${BASE_SETTINGS}/banks`;


export const QR_PAY = `${BASE_URL}/payWithQr`;

