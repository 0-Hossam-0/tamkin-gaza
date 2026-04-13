import { SetMetadata } from "@nestjs/common"
import { E_UserRole } from "../Enums/user.enums";

export const SetAccessRoles = (accessRoles: E_UserRole[] = []) => {
    return SetMetadata("accessRoles", accessRoles);
}