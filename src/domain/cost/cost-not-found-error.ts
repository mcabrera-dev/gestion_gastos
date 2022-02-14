export class CostNotFoundError extends Error {
  constructor() {
    super('The cost with the given Id was not found')
  }
}
