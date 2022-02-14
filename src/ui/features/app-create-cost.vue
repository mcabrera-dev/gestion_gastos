<template>
  <div>
    <app-button @clicked="showModal">Añadir Gasto</app-button>

    <app-modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>Añadir gasto</template>
      <template v-slot:body>
        <form @submit="event => event.preventDefault()">
          <app-input v-model="costDescription">Descripción</app-input>
          <app-input v-model="costAmount" type="number">Cantidad(€)</app-input>
          <div class="selectFriendContainer">
            <label>Amigo</label>
            <select class="selectFriend" v-model="costFriendId">
              <option v-for="friend in friends" v-bind:value="friend.id" :key="friend.id">
                {{ friend.fullname }}
              </option>
            </select>
          </div>
          <app-input v-model="costDate" type="date">Fecha</app-input>
        </form>
        <div class="errors">
          <ul>
            <li v-for="error in errors" :key="error.id">
              {{ error }}
            </li>
          </ul>
        </div>
      </template>

      <template v-slot:footer>
        <app-button @clicked="createCost">Crear</app-button>
      </template>
    </app-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppInput from '../components/app-input.vue'
import { Inject } from '../../domain/di/inject'
import { TYPES } from '../../types'
import { CreateCostCmd } from '../../application/commands/create-cost-cmd'
import AppButton from '../components/app-button.vue'
import AppSelectFriend from '../components/app-select-friends.vue'
import { NewCost } from 'src/domain/cost/cost'
import { GetFriendsQry } from 'src/application/queries/get-friends-qry'
import AppModal from '../components/app-modal.vue'

@Component({
  name: 'AppCreateCost',
  components: { AppButton, AppInput, AppSelectFriend, AppModal }
})
export default class AppCreateCost extends Vue {
  @Inject(TYPES.GET_FRIENDS_QRY)
  readonly getFriendsQry!: GetFriendsQry

  get friends() {
    return this.getFriendsQry.execute()
  }

  @Inject(TYPES.CREATE_COST_CMD)
  createCostCmd!: CreateCostCmd

  costDescription = ''
  costAmount = 0
  costFriendId = ''
  errors: string[] = []
  costDate = ''
  isModalVisible = false

  showModal() {
    this.isModalVisible = true
  }
  closeModal() {
    this.isModalVisible = false
  }
  validateCost() {
    let isValid = true
    this.errors = []
    if (!this.costDescription || this.costDescription === '') {
      isValid = false
      this.errors.push('Descripción es obligatoria')
    }
    if (!this.costAmount) {
      isValid = false
      this.errors.push('Cantidad debe ser mayor que 0')
    }
    if (!this.costFriendId || this.costFriendId === '') {
      this.errors.push('Debe seleccionar una persona')
      isValid = false
    }
    if (!this.costDate || this.costDate === '') {
      this.errors.push('Debe seleccionar una fecha')
      isValid = false
    }
    return isValid
  }

  createCost() {
    if (this.validateCost()) {
      console.log(this.costDate)
      const newCost: NewCost = {
        description: this.costDescription,
        amount: Number(this.costAmount),
        friendId: this.costFriendId,
        date: new Date(this.costDate)
      }
      this.createCostCmd.execute(newCost)
      this.costDescription = ''
      this.costAmount = 0
      this.costFriendId = ''
      this.isModalVisible = false
    }
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
