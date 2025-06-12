import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
  (data: unknown, req: ExecutionContext) => {
    const ctx = req.switchToHttp()
    const request = ctx.getRequest()
    return request.user
  },
)
