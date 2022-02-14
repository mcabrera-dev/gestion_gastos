import { Injectable } from '../domain/di/injectable'
import { CostRepository } from '../domain/cost/cost-repository'
import { Cost, ListCost } from '../domain/cost/cost'
import { Id } from '../domain/cost/id'
import { CostNotFoundError } from '../domain/cost/cost-not-found-error'

@Injectable()
export class CostInMemoryRepository implements CostRepository {
  private readonly costs = new Map<Id, Cost>()

  findAll(): Cost[] {
    return Array.from(this.costs.values())
  }

  update(id: string, cost: Partial<Cost>): void {
    const oldCost = this.costs.get(id)

    if (oldCost === undefined) {
      throw new CostNotFoundError()
    }

    const updatedCost: Cost = {
      ...oldCost,
      ...cost
    }

    this.costs.set(id, updatedCost)
  }

  create(cost: Cost): void {
    this.costs.set(cost.id, cost)
  }

}
