import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TenantService } from './tenant.service';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private readonly tenantService: TenantService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request);
    const subdomain = request.user.subdomain;
    await this.tenantService.setTenantBy(subdomain);
    return true;
  }
}
