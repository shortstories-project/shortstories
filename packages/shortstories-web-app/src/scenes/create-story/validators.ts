export const title = value => {
  if (!value) throw 'Title is required.'
}

export const body = value => {
  if (!value) throw 'Text is required.'
  if (value.length < 1000) throw 'Story too short.'
  if (value.length > 5000) throw 'Story too long.'
}
