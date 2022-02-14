import { GetFriendsQry } from '../get-friends-qry'
import { instance, mock, verify, when } from 'ts-mockito'
import { StateManager } from '../../state-manager'
import { FriendRepository } from '../../../domain/friend/friend-repository'

describe('GetFriendsQry', () => {
  it('should get the friends', () => {
    const { stateManager, getFriendsQry } = setup()
    when(stateManager.state).thenReturn({
      friends: [{ id: '1', fullname: 'irrelevant' }],
      costs: [],
      friendBalance: [],
      payments: []
    })

    const actual = getFriendsQry.internalExecute()

    expect(actual).toEqual([{ id: '1', fullname: 'irrelevant' }])
  })

  it("should find the friends and get them if there weren't any previously", () => {
    const { stateManager, getFriendsQry, friendRepository } = setup()
    when(stateManager.state)
      .thenReturn({
        friends: [],
        costs: [],
        friendBalance: [],
        payments: []
      })
      .thenReturn({
        friends: [{ id: '1', fullname: 'irrelevant' }],
        costs: [],
        friendBalance: [],
        payments: []
      })
    when(friendRepository.findAll()).thenReturn([{ id: '1', fullname: 'irrelevant' }])

    const actual = getFriendsQry.internalExecute()

    expect(actual).toEqual([{ id: '1', fullname: 'irrelevant' }])
    verify(friendRepository.findAll()).once()
  })
})

function setup() {
  const stateManager = mock<StateManager>()
  const friendRepository = mock<FriendRepository>()
  return {
    stateManager,
    friendRepository,
    getFriendsQry: new GetFriendsQry(instance(stateManager), instance(friendRepository))
  }
}
