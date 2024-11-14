import { SetMetadata } from '@nestjs/common';
export const AccessRights = (...roles: string[]) => SetMetadata('roles', roles);