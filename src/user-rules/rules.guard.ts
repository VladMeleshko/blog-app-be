import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from '@nestjs/common';
import {Reflector} from '@nestjs/core';

@Injectable()
export default class RulesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rules = this.reflector.get<string[]>('rules', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!rules) {
      return true;
    }
    const hasRule = user.role.rules.some(role => rules.includes(role.value));
    if (!hasRule) {
      throw new ForbiddenException('Forbidden operation');
    }
    return hasRule;
  }
}
