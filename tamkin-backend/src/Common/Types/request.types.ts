import { LanguageCode } from '../Interfaces/Language/languages-config.interface';
import { IUser } from '../Interfaces/User/user.interface';
import { IDecoded } from './token.types';

export interface IRequest extends Request {
  user?: IUser;
  decoded: IDecoded;
  userLanguage: LanguageCode
}
