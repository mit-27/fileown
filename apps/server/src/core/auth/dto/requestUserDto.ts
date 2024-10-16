import { NewUser } from '@fileown/shared';
import { Request } from 'express';

export interface RequestUserDto extends Request {
    user: NewUser;
}