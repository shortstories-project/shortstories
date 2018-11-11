export default async function reactionHandler(id, ctx, state) {
  async function createReaction() {
    return await ctx.models.Reaction.create({
      userId: ctx.request.userId,
      storyId: id,
      state,
    })
  }
  async function updateReaction(id, newState) {
    const reaction = await ctx.models.Reaction.findByPk(id)
    return await reaction.update({
      state: newState,
    })
  }
  const reaction = await ctx.models.Reaction.findOne({
    where: {
      userId: ctx.request.userId,
      storyId: id,
    },
  })
  if (reaction && reaction.state === state) {
    return await ctx.models.Reaction.destroy({
      where: {
        id: reaction.id,
      },
    })
  }
  if (reaction && reaction.state !== state) {
    return updateReaction(reaction.id, state)
  }
  return createReaction()
}
