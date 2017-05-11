export function updateListItem(list, id, update, identifier = 'id') {
  return list.map(i => {
    if (i.get(identifier) === id) {
      return update(i)
    }

    return i
  })
}
