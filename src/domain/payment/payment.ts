import { Friend } from '../friend/friend'

export interface Payment {
  payer: Friend
  collector: Friend
  amount: number
}
