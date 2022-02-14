import { Injectable } from '../domain/di/injectable'
import { CostRepository } from '../domain/cost/cost-repository'
import { Cost } from '../domain/cost/cost'
import { Id } from '../domain/cost/id'
import { CostNotFoundError } from '../domain/cost/cost-not-found-error'
import { collection, getDocs, addDoc } from 'firebase/firestore/lite'
import { db } from './firebase'

@Injectable()
export class CostFirebaseRepository implements CostRepository {
  private readonly costs = new Map<Id, Cost>()

  async findAll(): Promise<Cost[]> {
    const allcosts: Cost[] = []
    const costCol = collection(db, 'costs')
    await getDocs(costCol)
      .then(costs => {
        costs.forEach(function (childSnapshot) {
          const key = childSnapshot.id
          const data = childSnapshot.data()
          console.log('childSnapshot', childSnapshot.data().friendId)
          const currentCost: Cost = {
            id: key,
            amount: data.amount,
            friendId: data.friendId.id,
            description: data.description,
            date: data.date
          }
          allcosts.push(currentCost)
        })
      })
      .catch(e => console.log('error', e))
    return allcosts
  }

  update(id: string, cost: Partial<Cost>): void {
    const oldCost = this.costs.get(id)

    if (oldCost === undefined) {
      throw new CostNotFoundError()
    }

    const updatedCost: Cost = {
      ...oldCost,
      ...cost
    }

    this.costs.set(id, updatedCost)
  }

  create(cost: Cost): void {
    const costCol = collection(db, 'costs')
    addDoc(costCol, cost)
  }
}
