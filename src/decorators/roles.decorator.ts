import { SetMetadata } from '@nestjs/common';

import type { Role } from '../modules/user/role.enum';

export const ROLES_KEY = 'role';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Roles = (...role: Role[]) => SetMetadata(ROLES_KEY, role);
