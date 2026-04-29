export enum OTPTypeEnum {
  CONFIRM_EMAIL = 'ConfirmEmail',
  RESET_PASSWORD = 'ResetPassword',
  LOGIN_OTP = 'LoginOtp',
  ENABLE_2FA = 'Enable2FA',
  DISABLE_2FA = 'Disable2FA',
  UPDATE_EMAIL = 'UpdateEmail',
}

export enum OTPStatusEnum {
  ACTIVE = 'Active',
  USED = 'Used',
  EXPIRED = 'Expired',
}
