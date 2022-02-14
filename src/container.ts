import { interfaces } from 'inversify'
import { container } from 'inversify-props'
import { TYPES } from './types'
import { Logger } from './domain/use-cases/logger'
import { Application } from './ui/application'
import Vue, { VueConstructor } from 'vue'
import { StateManager } from './application/state-manager'
import { VueStateManager } from './infrastructure/vue-state-manager'
import { Runner } from './domain/runner/runner'
import { ExecutorLink } from './domain/runner/executor-link'
import { LoggerLink } from './domain/runner/logger-link'
import { ConsoleLogger } from './infrastructure/console-logger'
import { CreateFriendCmd } from './application/commands/create-friend-cmd'
import { GetFriendsQry } from './application/queries/get-friends-qry'
import { CreateCostCmd } from './application/commands/create-cost-cmd'
import { FriendRepository } from './domain/friend/friend-repository'
import { FriendInMemoryRepository } from './infrastructure/friend-in-memory-repository'
import { CostRepository } from './domain/cost/cost-repository'
import { CostInMemoryRepository } from './infrastructure/cost-in-memory-repository'
import { GetCostsQry } from './application/queries/get-costs-qry'
import { GetBalanceQry } from './application/queries/get-balance-qry'
import { GetOptimunPaymnetsQry } from './application/queries/get-optimum-payments-qry'

export class Container {
  private static _instance: Container | null = null
  private readonly _container: interfaces.Container

  private constructor() {
    container
      .bind<Logger>(TYPES.LOGGER)
      .to(ConsoleLogger)
      .inSingletonScope()
    container.bind<Window>(TYPES.WINDOW).toConstantValue(window)
    container
      .bind<StateManager>(TYPES.STATE_MANAGER)
      .to(VueStateManager)
      .inSingletonScope()
    container
      .bind<Application>(TYPES.APPLICATION)
      .to(Application)
      .inSingletonScope()
    container.bind<VueConstructor>(TYPES.VUE).toConstantValue(Vue)
    container
      .bind<CreateFriendCmd>(TYPES.CREATE_FRIEND_CMD)
      .to(CreateFriendCmd)
      .inSingletonScope()
    container
      .bind<CreateCostCmd>(TYPES.CREATE_COST_CMD)
      .to(CreateCostCmd)
      .inSingletonScope()
    container
      .bind<GetFriendsQry>(TYPES.GET_FRIENDS_QRY)
      .to(GetFriendsQry)
      .inSingletonScope()
    container
      .bind<GetBalanceQry>(TYPES.GET_FRIEND_BALANCE_QRY)
      .to(GetBalanceQry)
      .inSingletonScope()
    container
      .bind<GetOptimunPaymnetsQry>(TYPES.GET_OPTIMUN_PAYMENTS_QRY)
      .to(GetOptimunPaymnetsQry)
      .inSingletonScope()
    container
      .bind<GetCostsQry>(TYPES.GET_COST_QRY)
      .to(GetCostsQry)
      .inSingletonScope()
    container
      .bind<Runner>(TYPES.RUNNER)
      .to(Runner)
      .inSingletonScope()
    container
      .bind<ExecutorLink>(TYPES.EXECUTOR_LINK)
      .to(ExecutorLink)
      .inSingletonScope()
    container
      .bind<LoggerLink>(TYPES.LOGGER_LINK)
      .to(LoggerLink)
      .inSingletonScope()
    container
      .bind<FriendRepository>(TYPES.FRIEND_REPOSITORY)
      .to(FriendInMemoryRepository)
      .inSingletonScope()
    container
      .bind<CostRepository>(TYPES.COST_REPOSITORY)
      .to(CostInMemoryRepository)
      .inSingletonScope()


    this._container = container
  }

  static instance() {
    if (this._instance === null) {
      Container._instance = new Container()
    }

    return this._instance!._container
  }
}
