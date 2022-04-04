export const dashboard = async (
  _: unknown,
  __: unknown,
  { clients: { DashboardIO } }: Context
): Promise<Dashboards> => {
  const respsellers = await DashboardIO.dashboard()

  return respsellers
}

