export interface GOOGLE_SIGN_IN_FAILED {
    MAIN_MESSAGE: string,
    MAIN_INFO: string,
    INVALID_ARGUMENT: {
        INFO: string,
    },
    TOKEN_USED_TOO_LATE: {
        INFO: string
    },
    FAIL_TO_VERIFY_TOKEN:{
        INFO:string
    }
}


export interface LOGIN_FAILED {
    MAIN_MESSAGE: string,
    MAIN_INFO: string,

    INVALID_ARGUMENT: {
        INFO: string,
    },

    TOKEN_USED_TOO_LATE: {
        INFO: string
    },
    
    FAIL_TO_VERIFY_TOKEN:{
        INFO:string
    }
}