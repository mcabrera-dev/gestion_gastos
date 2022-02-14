<template>
  <div>
    <h3>Gastos:</h3>
    <div v-for="cost in costs" class="costListItem" :key="cost.id">
      <div class="item costFriendName">{{ cost.friend.fullname }}</div>
      <div class="item friendBalanceAmount">{{ cost.amount }}€</div>
      <div class="item friendBalanceName">{{ cost.description }}</div>
      <div class="item friendBalanceAmount">
        {{
          cost.date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
        }}
      </div>
    </div>
    <div v-if="!costs.length">
      Ningún gasto Añadido
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Inject } from '../../domain/di/inject'
import { TYPES } from '../../types'
import { GetCostsQry } from '../../application/queries/get-costs-qry'

@Component({ name: 'AppCostList' })
export default class AppCostList extends Vue {
  @Inject(TYPES.GET_COST_QRY)
  readonly getCostsQry!: GetCostsQry

  get costs() {
    return this.getCostsQry.execute()
  }
}
</script>

<style scoped>
.costListItem {
  background-color: #485260;
  padding: 10px 30px;
  border-radius: 25px;
  margin: 5px;
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 50%;
}
</style>
