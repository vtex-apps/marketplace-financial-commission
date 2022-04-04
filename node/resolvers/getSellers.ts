export const sellers = async (
  _: unknown,
  __: unknown,
  { clients: { SellerIO } }: Context
): Promise<Dashboards> => {
  const respsellers = await SellerIO.sellers()

  return respsellers
}
