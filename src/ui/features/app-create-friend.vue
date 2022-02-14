<template>
  <div>
    <form @submit="event => event.preventDefault()">
      <app-input v-model="friendText">Añadir Amigo</app-input>
      <app-button @clicked="createFriend">Añadir</app-button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppInput from '../components/app-input.vue'
import { Inject } from '../../domain/di/inject'
import { TYPES } from '../../types'
import { CreateFriendCmd } from '../../application/commands/create-friend-cmd'
import AppButton from '../components/app-button.vue'

@Component({ name: 'AppCreateFriend', components: { AppButton, AppInput } })
export default class AppCreateFriend extends Vue {
  @Inject(TYPES.CREATE_FRIEND_CMD)
  createFriendCmd!: CreateFriendCmd

  friendText = ''

  createFriend() {
    this.createFriendCmd.execute(this.friendText)
    this.friendText = ''
  }
}
</script>
