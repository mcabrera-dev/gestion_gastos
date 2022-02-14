import { CreateFriendCmd } from '../create-friend-cmd'
import { capture, instance, mock, when } from 'ts-mockito'
import { StateManager } from '../../state-manager'
import { FriendRepository } from '../../../domain/friend/friend-repository'

describe('CreateFriendCmd', () => {
  it('should create a new friend with an initial id', () => {
    const { stateManager, createFriendCmd } = setup()

    createFriendCmd.internalExecute('foo')

    const [actual] = capture(stateManager.patch).last()
    expect(actual).toEqual({ friends: [{ fullname: 'foo', id: '1' }] })
  })

  it('should create a new friend with a consecutive id', () => {
    const { stateManager, createFriendCmd } = setup()
    when(stateManager.state).thenReturn({
      friends: [{ fullname: 'irrelevant', id: '3' }],
      costs: [],
      friendBalance: [],
      payments: []
    })

    createFriendCmd.internalExecute('foo')

    const [actual] = capture(stateManager.patch).last()
    expect(actual.friends).toContainEqual({ fullname: 'foo', id: '4' })
  })
})

function setup() {
  const stateManager = mock<StateManager>()
  const friendRepository = mock<FriendRepository>()

  when(stateManager.state).thenReturn({
    costs: [],
    friends: [],
    friendBalance: [],
    payments: []
  })
  return {
    stateManager,
    createFriendCmd: new CreateFriendCmd(instance(stateManager), instance(friendRepository))
  }
}
