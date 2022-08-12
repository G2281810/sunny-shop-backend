import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/users/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { JTWPayload } from '../interfaces/jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository) private usersRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;
    const querybuilder = this.usersRepository.getUserPayload(email);

    querybuilder.addSelect('u.password');
    const user = await querybuilder.getOne();
    if (user && (await bcrypt.compare(password, user.password))) {
      delete user['password'];
      const payload: JTWPayload = JSON.parse(JSON.stringify(user));
      const accessToken: string = await this.jwtService.sign(payload);
      const roleId: number = user.getActiveRole().id;
      const menu = await this.usersRepository.getMenuFromUserRole(roleId);
      const permissions = await this.usersRepository.getUserPermissionsByRole(
        roleId,
      );

      return { accessToken, menu, permissions };
    } else {
      throw new BadRequestException(['email.badCredentials']);
    }
  }
}
