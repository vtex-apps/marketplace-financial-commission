export const getTemplate = async (_: unknown, __: unknown, ctx: Context) => {
  const {
    clients: { template },
  } = ctx

  const response = await template.getTemplate()

  return response.Templates.email.Message
}
