import { ListCost } from 'src/domain/cost/cost'
import { Friend, FriendBalance } from 'src/domain/friend/friend'
import { Payment } from 'src/domain/payment/payment'

export class State {
  friends: Friend[] = []
  costs: ListCost[] = []
  friendBalance: FriendBalance[] = []
  payments: Payment[] = []
}
