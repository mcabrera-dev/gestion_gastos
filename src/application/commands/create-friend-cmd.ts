import { Command } from '../../domain/use-cases/command'
import { StateManager } from '../state-manager'
import { TYPES } from '../../types'
import { Inject } from '../../domain/di/inject'
import { Friend } from '../../domain/friend/friend'
import { Injectable } from '../../domain/di/injectable'
import { FriendRepository } from '../../domain/friend/friend-repository'

@Injectable()
export class CreateFriendCmd extends Command<string> {
  constructor(
    @Inject(TYPES.STATE_MANAGER) private readonly stateManager: StateManager,
    @Inject(TYPES.FRIEND_REPOSITORY) private readonly friendRepository: FriendRepository
  ) {
    super()
  }

  internalExecute(fullname: string): void {
    const friends = this.stateManager.state.friends
    const currentId =
      friends
        .map(friend => friend.id)
        .slice()
        .sort()
        .reverse()[0] ?? 0

    const newFriend: Friend = {
      id: (Number(currentId) + 1).toString(),
      fullname
    }
    this.friendRepository.create(newFriend)
    this.stateManager.patch({ friends: [...friends, newFriend] })
  }
}
