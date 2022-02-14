export class FriendNotFoundError extends Error {
  constructor() {
    super('The friend with the given Id was not found')
  }
}
