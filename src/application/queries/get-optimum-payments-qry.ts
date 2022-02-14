import { StateManager } from '../state-manager'
import { TYPES } from '../../types'
import { Inject } from '../../domain/di/inject'
import { Injectable } from '../../domain/di/injectable'
import { Query } from '../../domain/use-cases/query'
import { FriendRepository } from '../../domain/friend/friend-repository'
import { Payment } from 'src/domain/payment/payment'

@Injectable()
export class GetOptimunPaymnetsQry extends Query<Payment[]> {
  constructor(
    @Inject(TYPES.STATE_MANAGER) private readonly stateManager: StateManager,
    @Inject(TYPES.FRIEND_REPOSITORY) private readonly friendRepository: FriendRepository
  ) {
    super()
  }

  internalExecute(): Payment[] {
    if (this.stateManager.state.friends.length && this.stateManager.state.costs.length) {
      const payments = this.friendRepository.getFriendPayments()
      this.stateManager.patch({ payments })
    }
    return this.stateManager.state.payments
  }
}
