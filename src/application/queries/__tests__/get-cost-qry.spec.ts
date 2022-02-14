import { GetCostsQry } from '../get-costs-qry'
import { instance, mock, verify, when } from 'ts-mockito'
import { StateManager } from '../../state-manager'
import { CostRepository } from '../../../domain/cost/cost-repository'
import { FriendRepository } from 'src/domain/friend/friend-repository'

describe('GetCostsQry', () => {
  it('should get the costs', () => {
    const { stateManager, getCostsQry } = setup()
    const dateIrrelevant = new Date()
    when(stateManager.state).thenReturn({
      costs: [
        {
          id: '1',
          amount: 100,
          friend: { id: '1', fullname: 'irrelevant' },
          description: 'irrelevant',
          date: dateIrrelevant
        }
      ],
      friends: [],
      friendBalance: [],
      payments: []
    })

    const actual = getCostsQry.internalExecute()

    expect(actual).toEqual([
      {
        id: '1',
        amount: 100,
        friend: { id: '1', fullname: 'irrelevant' },
        description: 'irrelevant',
        date: dateIrrelevant
      }
    ])
  })

  it("should find the costs and get them if there weren't any previously", () => {
    const { stateManager, getCostsQry, costRepository } = setup()
    const dateIrrelevant = new Date()
    when(stateManager.state)
      .thenReturn({
        costs: [],
        friends: [],
        friendBalance: [],
        payments: []
      })
      .thenReturn({
        costs: [
          {
            id: '1',
            amount: 100,
            friend: { id: '1', fullname: 'irrelevant' },
            description: 'irrelevant',
            date: dateIrrelevant
          }
        ],
        friends: [],
        friendBalance: [],
        payments: []
      })
    when(costRepository.findAll()).thenReturn([
      {
        id: '1',
        amount: 100,
        friendId: '1',
        description: 'irrelevant',
        date: dateIrrelevant
      }
    ])

    const actual = getCostsQry.internalExecute()

    expect(actual).toEqual([
      {
        id: '1',
        amount: 100,
        friend: { id: '1', fullname: 'irrelevant' },
        description: 'irrelevant',
        date: dateIrrelevant
      }
    ])
    verify(costRepository.findAll()).once()
  })
})

function setup() {
  const stateManager = mock<StateManager>()
  const costRepository = mock<CostRepository>()
  const friendRepository = mock<FriendRepository>()
  return {
    stateManager,
    costRepository,
    getCostsQry: new GetCostsQry(
      instance(stateManager),
      instance(costRepository),
      instance(friendRepository)
    )
  }
}
