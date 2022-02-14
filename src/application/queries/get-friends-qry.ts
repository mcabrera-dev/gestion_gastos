import { StateManager } from '../state-manager'
import { TYPES } from '../../types'
import { Inject } from '../../domain/di/inject'
import { Friend } from '../../domain/friend/friend'
import { Injectable } from '../../domain/di/injectable'
import { Query } from '../../domain/use-cases/query'
import { FriendRepository } from '../../domain/friend/friend-repository'

@Injectable()
export class GetFriendsQry extends Query<Friend[]> {
  constructor(
    @Inject(TYPES.STATE_MANAGER) private readonly stateManager: StateManager,
    @Inject(TYPES.FRIEND_REPOSITORY) private readonly friendRepository: FriendRepository
  ) {
    super()
  }

  internalExecute(): Friend[] {
    if (this.stateManager.state.friends.length === 0) {
      const friends = this.friendRepository.findAll()
      this.stateManager.patch({ friends })
    }
    return this.stateManager.state.friends
  }
}
