export const getSellers = async (
  _: unknown,
  __: unknown,
  { clients: { sellersIO } }: Context
): Promise<Sellers> => {
  const respsellers = await sellersIO.getSellers()

  return respsellers
}
