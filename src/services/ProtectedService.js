import {
  MERCHANTS_LIST,
  USERS_LIST,
  ADMIN_USERS_LIST,
  MERCHANT_SUB_ACCOUNTS,
  NEW_SUB_ACCOUNTS,
  NEW_SUB_USER,
  GET_BANKS,
  MERCHANT_PROFILE,
  MERCHANT_BANKS,
  NEW_MERCHANT_BANKS,
  CUSTOMER_LIST,
  CONFIRM_MERCHANT,
  TRANSACTIONS_LIST,
  TRANSACTION_ITEM,
  QUERY_DEMO,
  WALLET_HISTORY,
  WALLET_BALANCE,
  WALLET_TOPUP,
  ADD_HOOKS,
  REMITA_SETTLEMENT,
  ACCOUNT_QUERY,
  FUND_TRANSFER,
  LINE_CHART,
  UN_SUM,
  REQ_TWO_FA,
  ENABLE_TWO_FA,
  DISABLE_TWO_FA,
  APP_TWO_FA_AUTH,
  CHANGE_PASS,
  DISABLE_TWO_FA_REQ,
  // UPLOAD_DOCUMENT,
} from '../constants/defaultValues';
import * as request from './baseRequest';


const axios = require('axios');

export const GetMerchantsService = (data) => {
  return request.getAuthRequest(
    `${MERCHANTS_LIST}?PageNumber=${data.pageIndex}&PageSize=${data.pageSize}`
  );
};
export const GetAllUsers = (data) => {
  //   console.log(data.id??);
  //   return data.id? request.getAuthRequest(`${USERS_LIST}?PageNumber=${data.pageIndex}&PageSize=${data.pageSize}`) : request.getAuthRequest(`${USERS_LIST}/${data.id}?PageNumber=${data.pageIndex}&PageSize=${data.pageSize}`);
  return request.getAuthRequest(
    `${USERS_LIST}/${data.id}?PageNumber=${data.pageIndex}&PageSize=${data.pageSize}`
  );
};
export const GetAdminUsers = (data) => {
  //   return request.getAuthRequest(`${ADMIN_USERS_LIST}/${data.id}?PageNumber=${data.pageIndex}&PageSize=${data.pageSize}`);
  return request.getAuthRequest(
    `${ADMIN_USERS_LIST}?PageNumber=${data.pageIndex}&PageSize=${data.pageSize}`
  );
};
export const GetMerchantSubAccounts = (data) => {
  // if(data.id > 0){
  //   return request.getAuthRequest(
  //     `${MERCHANT_SUB_ACCOUNTS}/${data.id}`
  //   );
  // } else {
  //   return request.getAuthRequest(
  //     `${MERCHANT_SUB_ACCOUNTS}?PageNumber=${data.pageIndex}&PageSize=${data.pageSize}`
  //   );
  // }
  return data.id > 0 ? request.getAuthRequest(
    `${MERCHANT_SUB_ACCOUNTS}/${data.id}`) : request.getAuthRequest(
      `${MERCHANT_SUB_ACCOUNTS}?PageNumber=${data.pageIndex}&PageSize=${data.pageSize}`);
  //   return request.getAuthRequest(`${MERCHANT_SUB_ACCOUNTS}/${data.id}?PageNumber=${data.pageIndex}&PageSize=${data.pageSize}`);
};

export const GetAllCustomers = (data) => {
  return request.getAuthRequest(
    `${CUSTOMER_LIST}/${data.id}?PageNumber=${data.pageIndex}&PageSize=${data.pageSize}`
  );
};

export const GetTransactionSettlements = (data) => {
  return request.getAuthRequest(
    `${REMITA_SETTLEMENT}?PageNumber=${data.pageIndex}&PageSize=${data.pageSize}&Id=${data.id}&StartDate=${data.startDate.toISOString()}&EndDate=${data.endDate.toISOString()}`
  );
};

export const GetTransactions = (data) => {
  return request.getAuthRequest(
    `${TRANSACTIONS_LIST}?Id=${data.id}&SubId=${data.id}&PageNumber=${data.pageIndex}&PageSize=${data.pageSize}&StartDate=${data.startDate.toISOString()}&EndDate=${data.endDate.toISOString()}`
  );
};

export const GetTransactionDetails = (data) => {
  return request.getAuthRequest(
    `${TRANSACTION_ITEM}?TransactionId=${data.tId}&Zid=${data.zId}&MerchantStatus=${data.status}&SubId=${data.sId}`
  );
};

export const GetWalletHistory = (data) => {
  return request.getAuthRequest(
    `${WALLET_HISTORY}/${data.id}?PageNumber=${data.pageIndex}&PageSize=${data.pageSize}`
  );
};

export const GetWalletBalance = (id) => {
  const dataId = id ? `/${id}` : '';
  return request.getAuthRequest(
    // `${WALLET_BALANCE}/${data.id}?PageNumber=${data.pageIndex}&PageSize=${data.pageSize}`
    `${WALLET_BALANCE}${dataId}`
  );
};

export const GetLineChartService = (data) => {
  return request.getAuthRequest(`${LINE_CHART}?StartDate=${data.startDate.toISOString()}&EndDate=${data.endDate.toISOString()}`);
}
export const GetUnSumService = () => {
  return request.getAuthRequest(`${UN_SUM}`);
}

export const VerifyWalletTopupService = (data) => {
  return request.getAuthRequest( 
    // `${WALLET_TOPUP}?transactionRef=${data}&key=test_ZTgxNTYxMzUwODYyODU3NzM5MmI4OTdjZmZmMGYyY2FkNGU5Nzc5ZDAwM2NlOWIyZTE3YzEwMTQwNDIwNTA0OA`
    `${WALLET_TOPUP}?transactionRef=${data}&key=live_ZmMxMzJiOGQ4MjZkODc4Y2ZiYjk5NTYxMTE5ODNkYjE5NzRiNjQzNTI4MmFiNGU4YTRkMzE0NzIwNDVhYzhmMQ`
    // `${WALLET_TOPUP}?transactionRef=${data}&key=live_MTllZWJmMjU0YTgzODYxOGNmZDQ4NWMzMjgzNzgxNDYyMzE1MjQ1MjI1ODM3MTExMWFlODk0NTQwN2JiNjkyMQ`
  );
};

export const VerifyPaymentService = (data) => {
  return request.getRequest(
    // `${QUERY_DEMO}?transactionRef=${data}&key=test_e815613508628577392b897cfff0f2cad4e9779d003ce9b2e17c101404205048` 
    // `${QUERY_DEMO}?transactionRefId=${data}&key=live_ZmE3MzNkZjczOWJkM2YzYzYwNDFiMGViMzRiOWE1MTQ2YmI0MzVmZWM4NzBmYTcxM2EzOTk5MTQ1NjAzMjM0Mw`
    // `${QUERY_DEMO}?transactionRefId=${data}&key=test_ZTgxNTYxMzUwODYyODU3NzM5MmI4OTdjZmZmMGYyY2FkNGU5Nzc5ZDAwM2NlOWIyZTE3YzEwMTQwNDIwNTA0OA`
    `${QUERY_DEMO}?transactionRefId=${data}&key=test_ZTgxNTYxMzUwODYyODU3NzM5MmI4OTdjZmZmMGYyY2FkNGU5Nzc5ZDAwM2NlOWIyZTE3YzEwMTQwNDIwNTA0OA`
    // `${QUERY_DEMO}?transactionRefId=${data}&key=live_MTllZWJmMjU0YTgzODYxOGNmZDQ4NWMzMjgzNzgxNDYyMzE1MjQ1MjI1ODM3MTExMWFlODk0NTQwN2JiNjkyMQ`
  );
};

export const VerifyBillPaymentService = (data) => {
  return request.getRequest(
    // `${QUERY_DEMO}?transactionRefId=${data}&key=live_ZmMxMzJiOGQ4MjZkODc4Y2ZiYjk5NTYxMTE5ODNkYjE5NzRiNjQzNTI4MmFiNGU4YTRkMzE0NzIwNDVhYzhmMQ`
    `${QUERY_DEMO}?transactionRefId=${data}&key=test_ZTgxNTYxMzUwODYyODU3NzM5MmI4OTdjZmZmMGYyY2FkNGU5Nzc5ZDAwM2NlOWIyZTE3YzEwMTQwNDIwNTA0OA`
  );
};

export const VerifyBeneficiaryService = (data) => {
  return request.postAuthRequest(`${ACCOUNT_QUERY}`, data);
}

export const GetBanksService = () => {
  return request.getAuthRequest(`${GET_BANKS}`);
};

export const GetMerchantBanksService = () => {
  return request.getAuthRequest(`${MERCHANT_BANKS}`);
};

export const GetMerchantProfileService = () => {
  return request.getAuthRequest(`${MERCHANT_PROFILE}`);
};

export const NewSubMerchant = (data) => {
  return request.postAuthRequest(NEW_SUB_ACCOUNTS, data);
};

export const NewSubAccount = (data) => {
  return request.postAuthRequest(NEW_SUB_USER, data);
};

export const NewMerchantBank = (data) => {
  return request.postAuthRequest(NEW_MERCHANT_BANKS, data);
};

export const NewPaymentService = (data) => {
  return request.postAuthRequest(FUND_TRANSFER, data);
};

export const ConfirmMerchant = (data) => {
  return request.postAuthRequest(CONFIRM_MERCHANT, data);
};

export const AddWebHooks = (data) => {
  return request.postAuthRequest(ADD_HOOKS, data);
};

export const ChangePassword = async (data) => {
  return request.postAuthRequest(CHANGE_PASS, data);
};

export const TwoFaEnable = (provider) => {
  return request.getAuthRequest(`${REQ_TWO_FA}?provider=${provider}`);
};

export const DoTwoFaEnable = (data) => {
  return request.postAuthRequest(ENABLE_TWO_FA, data);
};

export const DoTwoFaDisable = (data) => {
  return request.postAuthRequest(DISABLE_TWO_FA, data);
};

export const GetDisableAuthCode = (provider) => {
  return request.getAuthRequest(`${DISABLE_TWO_FA_REQ}?provider=${provider}`);
};

export const TwoFActorAuthorize = async(data, token) => {
  console.log(data);
  console.log(token);
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      //   "Content-Type": "application/json",
      },
    };

    
    try {
      const res = await axios.post(APP_TWO_FA_AUTH, data, config);
      console.log(res);
      return res;
  } catch (er) {
      console.log(er.response);
      console.log(er);
      return er.response.data;        
  }
  // return request.postAuthRequest(APP_TWO_FA_AUTH, data);
};
