export const stats = async (
  _: unknown,
  __: unknown,
  { clients: { StatsIO } }: Context
): Promise<Stats> => {
  const respsellers = await StatsIO.stats()

  return respsellers
}
