import { instance, mock, verify, when } from 'ts-mockito'
import { StateManager } from '../../state-manager'
import { FriendRepository } from '../../../domain/friend/friend-repository'
import { GetBalanceQry } from '../get-balance-qry'

describe('GetBalanceQry', () => {
  it('should get the balance', () => {
    const { stateManager, getBalanceQry, friendRepository } = setup()
    const dateIrrelevant = new Date()
    when(stateManager.state).thenReturn({
      friends: [
        { id: '1', fullname: 'irrelevant' },
        { id: '2', fullname: 'irrelevant' }
      ],
      costs: [
        {
          id: '1',
          amount: 100,
          friend: { id: '1', fullname: 'irrelevant' },
          description: 'irrelevant',
          date: dateIrrelevant
        },
        {
          id: '2',
          amount: 100,
          friend: { id: '1', fullname: 'irrelevant' },
          description: 'irrelevant',
          date: dateIrrelevant
        }
      ],
      friendBalance: [
        { id: '1', fullname: 'irrelevant', balance: 100 },
        { id: '2', fullname: 'irrelevant', balance: -100 }
      ],
      payments: []
    })

    const actual = getBalanceQry.internalExecute()
    expect(actual).toEqual([
      { id: '1', fullname: 'irrelevant', balance: 100 },
      { id: '2', fullname: 'irrelevant', balance: -100 }
    ])

    verify(friendRepository.getFriendBalance()).once()
  })
})

function setup() {
  const stateManager = mock<StateManager>()
  const friendRepository = mock<FriendRepository>()
  return {
    stateManager,
    friendRepository,
    getBalanceQry: new GetBalanceQry(instance(stateManager), instance(friendRepository))
  }
}
