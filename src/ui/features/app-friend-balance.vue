<template>
  <div>
    <h3>Balance:</h3>
    <div v-for="friend in friendBalance" class="balanceList" :key="friend.id">
      <div class="friendBalanceName">{{ friend.fullname }}:</div>
      <div class="friendBalanceAmount" v-bind:class="{ negative: friend.balance < 0 }">
        {{ friend.balance.toFixed(2) }}€
      </div>
    </div>
    <div v-if="!friendBalance.length">
      Ningún gasto Añadido
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Inject } from '../../domain/di/inject'
import { TYPES } from '../../types'
import { GetBalanceQry } from '../../application/queries/get-balance-qry'

@Component({ name: 'AppFriendBalance' })
export default class AppFriendBalance extends Vue {
  @Inject(TYPES.GET_FRIEND_BALANCE_QRY)
  readonly getFriendBalanceQry!: GetBalanceQry

  get friendBalance() {
    return this.getFriendBalanceQry.execute()
  }
}
</script>

<style scoped>
.balanceList {
  display: flex;
}

.friendBalanceName {
  flex: 50%;
  padding: 5px;
}

.friendBalanceAmount {
  flex: 50%;
  padding: 5px;
  color: green;
}
.friendBalanceAmount.negative {
  color: red;
}
</style>
