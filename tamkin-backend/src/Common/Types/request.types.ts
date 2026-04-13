import { I_User } from "../Interfaces/user.interface";
import { I_Decoded } from "./token.types";

export interface I_Request extends Request {
    user?: I_User;
    decoded:I_Decoded
}