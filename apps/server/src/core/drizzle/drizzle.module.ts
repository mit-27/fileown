import { Global, Module } from '@nestjs/common';
export const DRIZZLE = Symbol('drizzle-connection');
import { db } from '@fileown/shared/dist/src/db'

@Global()
@Module({
    providers: [
        {
            provide: DRIZZLE,
            useValue: db
        },
    ],
    exports: [DRIZZLE],
})
export class DrizzleModule { }