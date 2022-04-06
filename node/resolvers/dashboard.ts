export const dashboard = async (
  _: unknown,
  __: unknown,
  { clients: { DashboardIO } }: Context
): Promise<Dashboards> => {
  console.info('eN EL RESOLVERRRRRR')
  const respsellers = await DashboardIO.dashboard()

  return respsellers
}
