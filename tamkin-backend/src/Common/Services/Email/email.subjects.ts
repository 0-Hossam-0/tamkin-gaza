export const E_EmailSubject = {
  CONFIRM_EMAIL: `Confirm Your ${process.env.APP_NAME} Email Address`,
  RESET_PASSWORD: `Reset Your ${process.env.APP_NAME} Password`,
  LOGIN_OTP: `Your ${process.env.APP_NAME} Login Verification Code`,
  ENABLE_2FA: `Enable Two-Factor Authentication - ${process.env.APP_NAME}`,
  DISABLE_2FA: `Disable Two-Factor Authentication - ${process.env.APP_NAME}`,
  UPDATE_EMAIL: `Confirm Your New ${process.env.APP_NAME} Email`,
} as const;