export const dashboard = async (
  _: unknown,
  __: unknown,
  { clients: { OrdersIO } }: Context
): Promise<Dashboards> => {
  const respsellers = await OrdersIO.orders()

  return respsellers
}
