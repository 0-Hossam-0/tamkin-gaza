import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Matches, Validate } from "class-validator";
import { IsCountryCode } from "./country.validate";
import { USER_REGEX } from "../Regex/User/user.regex";

export class UserValidators {
    @Matches(USER_REGEX.fullName, { message: 'validation:user.invalid_full_name' })
    @IsString({ message: 'validation:global.is_string' })
    @IsNotEmpty({ message: 'validation:global.is_not_empty' })
    fullName:string;

    @IsStrongPassword({}, { message: 'validation:global.is_strong_password' })
    @IsString({ message: 'validation:global.is_string' })
    @IsNotEmpty({ message: 'validation:global.is_not_empty' })
    password:string;

    @IsEmail({}, { message: 'validation:global.is_email' })
    @IsString({ message: 'validation:global.is_string' })
    @IsNotEmpty({ message: 'validation:global.is_not_empty' })
    email:string;

    @IsString({ message: 'validation:global.is_string' })
    @IsNotEmpty({ message: 'validation:global.is_not_empty' })
    confirmPassword:string;

    @Validate(IsCountryCode, { message: 'validation:user.invalid_country_code' })
    @IsString({ message: 'validation:global.is_string' })
    @IsNotEmpty({ message: 'validation:global.is_not_empty' })
    nationality:string;
}