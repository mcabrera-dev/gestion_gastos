import { StateManager } from '../state-manager'
import { TYPES } from '../../types'
import { Inject } from '../../domain/di/inject'
import { ListCost } from '../../domain/cost/cost'
import { Injectable } from '../../domain/di/injectable'
import { Query } from '../../domain/use-cases/query'
import { CostRepository } from '../../domain/cost/cost-repository'
import { FriendRepository } from 'src/domain/friend/friend-repository'

@Injectable()
export class GetCostsQry extends Query<ListCost[]> {
  constructor(
    @Inject(TYPES.STATE_MANAGER) private readonly stateManager: StateManager,
    @Inject(TYPES.COST_REPOSITORY) private readonly costRepository: CostRepository,
    @Inject(TYPES.FRIEND_REPOSITORY) private readonly frientRepository: FriendRepository
  ) {
    super()
  }
  internalExecute(): ListCost[] {
    const listCosts: ListCost[] = []
    if (this.stateManager.state.costs.length === 0) {
      const costs = this.costRepository.findAll()
      const orderCost = costs.sort((a, b) => (a.date < b.date ? 1 : -1))
      orderCost.forEach(cost => {
        const lcost: ListCost = {
          id: cost.id,
          date: cost.date,
          description: cost.description,
          amount: cost.amount,
          friend: this.frientRepository.findById(cost.friendId)
        }
        listCosts.push(lcost)
      })

      this.stateManager.patch({ costs: listCosts })
    }
    return this.stateManager.state.costs
  }
}
