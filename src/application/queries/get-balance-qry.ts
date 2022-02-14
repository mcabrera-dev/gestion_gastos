import { StateManager } from '../state-manager'
import { TYPES } from '../../types'
import { Inject } from '../../domain/di/inject'
import { Friend, FriendBalance } from '../../domain/friend/friend'
import { Injectable } from '../../domain/di/injectable'
import { Query } from '../../domain/use-cases/query'
import { FriendRepository } from '../../domain/friend/friend-repository'

@Injectable()
export class GetBalanceQry extends Query<Friend[]> {
  constructor(
    @Inject(TYPES.STATE_MANAGER) private readonly stateManager: StateManager,
    @Inject(TYPES.FRIEND_REPOSITORY) private readonly friendRepository: FriendRepository,
  ) {
    super()
  }

  internalExecute(): FriendBalance[] {
    if (
      this.stateManager.state.friends &&
      this.stateManager.state.costs &&
      this.stateManager.state.friendBalance
    ) {
      const friendBalance = this.friendRepository.getFriendBalance()
      this.stateManager.patch({ friendBalance })
    }
    return this.stateManager.state.friendBalance
  }
}
