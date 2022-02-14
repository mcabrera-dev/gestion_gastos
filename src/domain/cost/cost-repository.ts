import { Cost } from './cost'
import { Id } from './id'

export interface CostRepository {
  findAll(): Cost[]
  update(id: Id, friend: Partial<Cost>): void
  create(cost: Cost): void
}
