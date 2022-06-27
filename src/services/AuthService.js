
import {
    ACCOUNT_SIGNUP,
    LOGIN_URL,
    // BASE_URL,
    EMAIL_CONFIRM,
    FORGOT_PASSWORD,
    PASSWORD_RESET,
    MERCHANT_TYPE_LIST,
    LIST_BILL_CAT,
    LIST_BILL_SERVICE,
    LIST_BILL_SERVICE_VARIETIES,
    INIT_PAY,
    QR_PAY,
    VERIFY_CUSTOMER,
    // APP_SETTINGS
  } from "../constants/defaultValues";

  import * as request from './baseRequest';

  export const LoginService = (data) =>{
      return request.postRequest(LOGIN_URL, data);
  }
 
  export const RegisterService = (data) =>{
    return request.postRequest(ACCOUNT_SIGNUP, data);
  }

  export const ConfirmEmailService = (data) =>{
      return request.postRequest(EMAIL_CONFIRM, data);
  }

  export const ForgotPasswordService = (data) =>{
      return request.postRequest(FORGOT_PASSWORD, data);
  }

  export const PasswordResetService = (data) =>{
      return request.postRequest(PASSWORD_RESET, data);
  }
  export const GetBusinessTypes = () => {
    //   return request.getAuthRequest(`${ADMIN_USERS_LIST}/${data.id}?PageNumber=${data.pageIndex}&PageSize=${data.pageSize}`);
    return request.getAuthRequest(
      `${MERCHANT_TYPE_LIST}`
    );
};




export const ListServicesCat = () =>{
  return request.getRequest(LIST_BILL_CAT);
}
export const ListServicesById = (data) =>{
  return request.getRequest(`${LIST_BILL_SERVICE}?id=${data}`);
}
export const ListServiceVarieties = (data) =>{
  return request.getRequest(`${LIST_BILL_SERVICE_VARIETIES}?id=${data}`);
}
export const GetPaymentRef = (data) =>{
    return request.postRequest(INIT_PAY, data);
}
export const ValidatePayer = (data) =>{
    return request.postRequest(VERIFY_CUSTOMER, data);
}
export const PayWithQrService = (data) =>{
    return request.postRequest(QR_PAY, data);
}