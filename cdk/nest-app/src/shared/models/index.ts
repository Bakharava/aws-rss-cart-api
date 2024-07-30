import { Request } from 'express';
import { HttpStatus } from '@nestjs/common';

import { User } from '../../users';

export interface AppRequest extends Request {
  user?: User;
  status: HttpStatus;
}
