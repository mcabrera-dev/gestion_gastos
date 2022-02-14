<template>
  <div>
    <app-button @clicked="showModal">Liquidar deudas</app-button>

    <app-modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>Pagos necesarios para liquidar deudas</template>
      <template v-slot:body>
        <ul>
          <li v-for="payment in payments" :key="payment.id">
            {{ payment.payer.fullname }} debe a {{ payment.collector.fullname }} {{ payment.amount.toFixed(2) }}€
          </li>
        </ul>
      </template>
      <template v-slot:footer>
        <app-button @clicked="closeModal">OK</app-button>
      </template>
    </app-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Inject } from '../../domain/di/inject'
import { TYPES } from '../../types'
import AppButton from '../components/app-button.vue'
import { GetOptimunPaymnetsQry } from 'src/application/queries/get-optimum-payments-qry'
import AppModal from '../components/app-modal.vue'

@Component({
  name: 'AppOptimunPaymentsList',
  components: { AppButton, AppModal },
})
export default class AppOptimunPaymentsList extends Vue {
  @Inject(TYPES.GET_OPTIMUN_PAYMENTS_QRY)
  readonly GetOptimunPaymnetsQry!: GetOptimunPaymnetsQry

  get payments() {
    return this.GetOptimunPaymnetsQry.execute()
  }
  isModalVisible = false

  showModal() {
    this.isModalVisible = true
  }
  closeModal() {
    this.isModalVisible = false
  }
}
</script>
<style scoped>
.errors {
  margin-top: 1em;
  color: red;
}
.selectFriendContainer {
  display: flex;
  flex-direction: column;
}
.selectFriend {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
</style>
