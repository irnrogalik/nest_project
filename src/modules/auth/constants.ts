import { ConfigService } from '../../shared/services/config.service';

export const jwtConstants = {
    secret: new ConfigService().get('JWT_SECRET'),
};
