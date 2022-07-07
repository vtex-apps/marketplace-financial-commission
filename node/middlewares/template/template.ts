import GetBody from '../../templates'

export async function templateMethod(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { template },
  } = ctx

  const templateResponse = await template.getTemplate()

  if (templateResponse) {
    ctx.body = { template: templateResponse }
  } else {
    const templateBody = await GetBody(ctx)
    const templateCreated = await template.publishTemplate(templateBody)

    ctx.body = { template: templateCreated }
  }

  ctx.set('Cache-Control', 'no-cache')
  await next()
}
