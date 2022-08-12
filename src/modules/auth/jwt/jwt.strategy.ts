import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/modules/users/entity/user.entity';
import { UserRepository } from 'src/modules/users/repository/user.repository';
import { JTWPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(UserRepository) private userRepository: UserRepository) {
    super({
      secretOrKey: 'ProvisionalSecret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JTWPayload) {
    const { email } = payload;
    const user: User = await this.userRepository.user.findOne({
      where: { email },
      relations: ['roles', 'roles.role'],
    });
    if (!user) {
      throw new UnauthorizedException();
    } else {
      const activeRole = user.getActiveRole();
      user.permissions = await this.userRepository.getUserPermissionsByRole(
        activeRole.id,
      );
      return user;
    }
  }
}
