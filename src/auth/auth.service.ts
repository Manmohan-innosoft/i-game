import { Injectable , UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
@Injectable()

export class AuthService {

    constructor(private jwtService: JwtService){}
    
     // Temporary user for learning
  private user = {
    id: 101,
    username: 'mohit',
    password: 'test123',
    role: 'admin',
  };

  async login(username: string, password: string) {
    // Step 1: Validate credentials
    if (
      username !== this.user.username ||
      password !== this.user.password
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
        sub: this.user.id,
        username: this.user.username,
        role: this.user.role,
    };

    return {
        access_token: await this.jwtService.signAsync(payload),
    };
}
}
