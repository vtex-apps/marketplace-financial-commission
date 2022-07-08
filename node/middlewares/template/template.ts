import GetBody from '../../templates'

export async function templateMethod(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { template },
  } = ctx

  let templateResponse = ''

  const selectTemplate = async (typeIntegrationValue: TypeIntegration) => {
    switch (typeIntegrationValue) {
      case TypeIntegration.external: {
        templateResponse = await template.getTemplateExternal()

        return templateResponse
      }

      case TypeIntegration.internal: {
        templateResponse = await template.getTemplate()

        return templateResponse
      }

      default: {
        templateResponse = await template.getTemplate()

        return templateResponse
      }
    }
  }

  const integration = await typeIntegration(ctx)

  await selectTemplate(integration)

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
