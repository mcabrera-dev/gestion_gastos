import { Injectable } from '../domain/di/injectable'
import { FriendRepository } from '../domain/friend/friend-repository'
import { Friend, FriendBalance } from '../domain/friend/friend'
import { Id } from '../domain/friend/id'
import { FriendNotFoundError } from '../domain/friend/friend-not-found-error'
import { Inject } from '../domain/di/inject'
import { TYPES } from '../types'
import { CostRepository } from 'src/domain/cost/cost-repository'
import { Payment } from 'src/domain/payment/payment'

@Injectable()
export class FriendInMemoryRepository implements FriendRepository {
  constructor(@Inject(TYPES.COST_REPOSITORY) private readonly costRepository: CostRepository) {}

  getFriendPayments(): Payment[] {
    const payments: Payment[] = []
    const friends = this.findAll()
    const totalCostsByFriend: { friend: Friend; balance: number }[] = []
    const costs = this.costRepository.findAll()
    const sum: number = costs.reduce((a, current) => a + current.amount, 0)
    const mean = sum / friends.length

    friends.forEach(friend => {
      const costsByFriend = costs.filter(c => c.friendId === friend.id)
      const totalFriend: number = costsByFriend.reduce((a, current) => a + current.amount, 0)
      const balance = {
        friend: friend,
        balance: totalFriend - mean
      }
      totalCostsByFriend.push(balance)
    })

    const totalCostsByFriendOrdered = totalCostsByFriend.sort(
      (personA, personB) => personA.balance - personB.balance
    )

    let i = 0
    let j = totalCostsByFriendOrdered.length - 1
    let debt

    while (i < j) {
      debt = Math.min(-totalCostsByFriendOrdered[i].balance, totalCostsByFriendOrdered[j].balance)
      totalCostsByFriendOrdered[i].balance += debt
      totalCostsByFriendOrdered[j].balance -= debt
      payments.push({
        payer: totalCostsByFriendOrdered[i].friend,
        collector: totalCostsByFriendOrdered[j].friend,
        amount: debt
      })

      if (totalCostsByFriendOrdered[i].balance === 0) {
        i++
      }
      if (totalCostsByFriendOrdered[j].balance === 0) {
        j--
      }
    }
    return payments
  }

  getFriendBalance(): FriendBalance[] {
    const friends = this.findAll()
    const costs = this.costRepository.findAll()
    const totalCosts: number = costs.reduce((a, current) => a + current.amount, 0)
    const costFriend = totalCosts / friends.length

    const friendBalance: FriendBalance[] = []

    friends.forEach(friend => {
      const costsByFriend = costs.filter(c => c.friendId === friend.id)
      const totalFriend: number = costsByFriend.reduce((a, current) => a + current.amount, 0)
      const balance: FriendBalance = {
        id: friend.id,
        fullname: friend.fullname,
        balance: totalFriend - costFriend
      }
      friendBalance.push(balance)
    })
    return friendBalance
  }

  private readonly friends = new Map<Id, Friend>()

  findAll(): Friend[] {
    return Array.from(this.friends.values())
  }

  findById(id: string): Friend {
    const friend = this.friends.get(id)

    if (friend === undefined) {
      throw new FriendNotFoundError()
    }
    return friend
  }

  update(id: string, friend: Partial<Friend>): void {
    const oldFriend = this.friends.get(id)

    if (oldFriend === undefined) {
      throw new FriendNotFoundError()
    }

    const updatedFriend: Friend = {
      ...oldFriend,
      ...friend
    }

    this.friends.set(id, updatedFriend)
  }

  create(friend: Friend): void {
    this.friends.set(friend.id, friend)
  }
}
