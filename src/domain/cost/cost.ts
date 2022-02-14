import { Friend } from '../friend/friend';
import { Id } from './id'

export interface Cost {
  id: Id
  amount: number
  friendId: Id
  description: string
  date: Date
}

export interface NewCost {
  amount: number
  friendId: Id
  description: string
  date: Date
}

export interface ListCost {
  id: Id
  amount: number
  friend: Friend
  description: string
  date: Date
}

