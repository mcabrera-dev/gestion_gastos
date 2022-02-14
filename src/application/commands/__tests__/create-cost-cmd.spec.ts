import { CreateCostCmd } from '../create-cost-cmd'
import { capture, instance, mock, when } from 'ts-mockito'
import { StateManager } from '../../state-manager'
import { CostRepository } from '../../../domain/cost/cost-repository'
import { FriendRepository } from 'src/domain/friend/friend-repository'

describe('CreateCostCmd', () => {
  it('should create a new cost with an initial id', () => {
    const { stateManager, createCostCmd } = setup()
    const dateIrrelevant = new Date()

    createCostCmd.internalExecute({
      amount: 100,
      friendId: '1',
      description: 'irrelevant',
      date: dateIrrelevant
    })
    const [actual] = capture(stateManager.patch).last()
    expect(actual).toEqual({
      costs: [
        {
          amount: 100,
          friend: { id: '1', fullname: 'irrelevant' },
          description: 'irrelevant',
          date: dateIrrelevant,
          id: '1'
        }
      ]
    })
  })

  it('should create a new cost with a consecutive id', () => {
    const { stateManager, createCostCmd } = setup()
    const dateIrrelevant = new Date()
    when(stateManager.state).thenReturn({
      costs: [
        {
          id: '3',
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

    createCostCmd.internalExecute({
      amount: 100,
      friendId: '1',
      description: 'irrelevant',
      date: dateIrrelevant
    })

    const [actual] = capture(stateManager.patch).last()
    expect(actual.costs).toContainEqual({
      amount: 100,
      friend: { id: '1', fullname: 'irrelevant' },
      description: 'irrelevant',
      date: dateIrrelevant,
      id: '4'
    })
  })
})

function setup() {
  const stateManager = mock<StateManager>()
  const costRepository = mock<CostRepository>()
  const friendRepository = mock<FriendRepository>()

  when(stateManager.state).thenReturn({
    costs: [],
    friends: [{ id: '1', fullname: 'irrelevant' }],
    friendBalance: [],
    payments: []
  })
  when(friendRepository.findById('1')).thenReturn({ id: '1', fullname: 'irrelevant' })
  return {
    stateManager,
    friendRepository,
    createCostCmd: new CreateCostCmd(
      instance(stateManager),
      instance(costRepository),
      instance(friendRepository)
    )
  }
}
