export const getSellers = async (
  _: unknown,
  __: unknown,
  { clients: { SellerIO } }: Context
): Promise<Dashboards> => {
  const respsellers = await SellerIO.getSellers()

  return respsellers
}
