import { SetMetadata } from '@nestjs/common';

export const Unprotected = () => SetMetadata('unprotected', true);