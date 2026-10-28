import { Injectable , UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
@Injectable()

export class AuthService {

    constructor(private readonly jwtService: JwtService, private readonly prismaService: PrismaService  ){}
    
     // Temporary user for learning
  // private user = {
  //   id: 101,
  //   username: 'mohit',
  //   password: 'test123',
  //   role: 'admin',
  // };

  async login(username: string, password: string) {
    // Step 1: Validate credentials

    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    } 



    const payload = {
        sub: user.id,
        username: user.username,
        role: user.role,
    };

    return {
        access_token: await this.jwtService.signAsync(payload),
    };
}
}
