import { applyDecorators, UseGuards } from "@nestjs/common";
import { E_UserRole } from "../Enums/user.enums";
import { E_TokenType } from "../Enums/token.enum";
import { SetAccessRoles } from "./roles.decorator";
import { SetTokenType } from "./token.decorator";
import { AuthenticationGuard } from "../Guards/Authentication/authentication.guard";
import { AuthorizationGuard } from "../Guards/Authorization/authorization.guard";


export function Auth(
    accessRoles: E_UserRole[] = [],
    tokenType: E_TokenType = E_TokenType.ACCESS
) {

    return applyDecorators(
        SetAccessRoles(accessRoles),
        SetTokenType(tokenType),
        UseGuards(AuthenticationGuard,AuthorizationGuard)
    )

}