import {SetMetadata} from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Rules = (...roles: string[]) => SetMetadata('rules', roles);

// for custom decorators I'd prefer to use that case

export default {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Rules
};
