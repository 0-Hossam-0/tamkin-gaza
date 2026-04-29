import { IsNotEmpty, IsString } from "class-validator";

export class ConfirmEmailDto {
    @IsString({ message: 'validation:global.is_string' })
    @IsNotEmpty({ message: 'validation:global.is_not_empty' })
    code: string;
}