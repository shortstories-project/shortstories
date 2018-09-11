import { find, findIndex, propEq, merge, update } from 'ramda'

const findAndUpdate = (id: string, newValue: any, array: any[]) => {
  const findedItem = find(propEq('id', id))(array)
  const updatedItem = merge(findedItem, newValue)
  return update(findIndex(propEq('id', id))(array), updatedItem, array)
}

export default findAndUpdate
