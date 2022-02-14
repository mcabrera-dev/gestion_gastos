import { Id } from './id'

export interface Friend {
  id: Id
  fullname: string
}

export interface FriendBalance extends Friend {
  balance: number
}

type foo = Friend&{balance:number}
