import { Payment } from '../payment/payment'
import { Friend, FriendBalance } from './friend'
import { Id } from './id'

export interface FriendRepository {
  findAll(): Friend[]
  create(friend: Friend): void
  findById(id: Id): Friend
  getFriendBalance(): FriendBalance[]
  getFriendPayments(): Payment[]
}
