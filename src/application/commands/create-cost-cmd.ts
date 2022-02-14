import { Command } from '../../domain/use-cases/command'
import { StateManager } from '../state-manager'
import { TYPES } from '../../types'
import { Inject } from '../../domain/di/inject'
import { Cost, ListCost } from '../../domain/cost/cost'
import { Injectable } from '../../domain/di/injectable'
import { CostRepository } from 'src/domain/cost/cost-repository'
import { NewCost } from 'src/domain/cost/cost'
import { FriendRepository } from 'src/domain/friend/friend-repository'

@Injectable()
export class CreateCostCmd extends Command<NewCost> {
  constructor(
    @Inject(TYPES.STATE_MANAGER) private readonly stateManager: StateManager,
    @Inject(TYPES.COST_REPOSITORY) private readonly costRepository: CostRepository,
    @Inject(TYPES.FRIEND_REPOSITORY) private readonly friendRepository: FriendRepository
  ) {
    super()
  }

  internalExecute(cost: NewCost): void {
    const costs = this.stateManager.state.costs
    const currentId =
      costs
        .map(cost => cost.id)
        .slice()
        .sort()
        .reverse()[0] ?? 0

    const newCost: Cost = {
      id: (Number(currentId) + 1).toString(),
      description: cost.description,
      amount: cost.amount,
      friendId: cost.friendId,
      date: cost.date
    }
    this.costRepository.create(newCost)

    const lcost: ListCost = {
      id: newCost.id,
      date: newCost.date,
      description: newCost.description,
      amount: newCost.amount,
      friend: this.friendRepository.findById(newCost.friendId)
    }

    const orderCosts = [...costs, lcost].sort((a, b) => (a.date < b.date ? 1 : -1))

    this.stateManager.patch({ costs: orderCosts })
  }
}
