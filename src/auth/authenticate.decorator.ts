import {UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

import RulesGuard from '../user-rules/rules.guard';

export class AuthenticateJwtGuard extends AuthGuard('jwt') {}
// eslint-disable-next-line @typescript-eslint/naming-convention
const CommonAuthGuard = (): MethodDecorator & ClassDecorator => UseGuards(
  AuthenticateJwtGuard,
  RulesGuard
);
export default CommonAuthGuard;
