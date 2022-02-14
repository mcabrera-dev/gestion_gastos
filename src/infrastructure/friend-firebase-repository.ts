import { Injectable } from '../domain/di/injectable'
import { FriendRepository } from '../domain/friend/friend-repository'
import { Friend, FriendBalance } from '../domain/friend/friend'
import { collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore/lite'
import { Inject } from '../domain/di/inject'
import { TYPES } from '../types'
import { db } from './firebase'
import { CostRepository } from 'src/domain/cost/cost-repository'
import { Payment } from 'src/domain/payment/payment'

@Injectable()
export class FriendFirebaseRepository implements FriendRepository {
  constructor(@Inject(TYPES.COST_REPOSITORY) private readonly costRepository: CostRepository) { }

  getFriendPayments(): Payment[] {
    throw new Error('Method not implemented.')
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

  findAll(): Friend[] {
    const allfriends: Friend[] = []
    const friendCol = collection(db, 'friends')
    async function getFriens() {
      await getDocs(friendCol)
        .then(friends => {
          friends.forEach(function (childSnapshot) {
            const key = childSnapshot.id
            const data = childSnapshot.data()
            const currentFriend: Friend = {
              id: key,
              fullname: data.fullname
            }
            allfriends.push(currentFriend)
          })
        })
        .catch(e => console.log('error', e))
    }
    getFriens()

    return allfriends
  }

  findById(id: string): Friend {
    const friend: Friend = {
      id: '',
      fullname: ''
    }
    const friendCol = doc(db, 'friends', id)
    getDoc(friendCol)
      .then(f => {
        friend.id = f.id
        friend.fullname = f.get('fullname')
      })
      .catch(e => console.log('error', e))

    return friend
  }

  create(friend: Friend): void {
    const friendCol = collection(db, 'friends')
    addDoc(friendCol, friend)
  }
}
