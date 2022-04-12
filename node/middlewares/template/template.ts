import templateBody from '../../templates'

export async function templateMethod(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { template },
  } = ctx

  const templateResponse = await template.getTemplate()

  ctx.set('Cache-Control', 'no-cache')
  if (templateResponse) {
    ctx.body = { template: templateResponse }
  } else {
    // Create template
    const templateCreated = await template.publishTemplate(templateBody)

    ctx.body = { template: templateCreated }
  }

  await next()
}
