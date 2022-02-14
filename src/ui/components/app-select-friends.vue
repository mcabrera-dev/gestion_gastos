<template>
  <div class="inputContainer">
    <label>
      <slot></slot>
    </label>
    <select v-model="selected">
      <option v-for="friend in friends" v-bind:value="friend.id">{{ friend.fullname }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Inject } from '../../domain/di/inject'
import { TYPES } from '../../types'
import { GetFriendsQry } from '../../application/queries/get-friends-qry'

@Component({ name: 'AppSelectFriend' })
export default class AppSelectFriend extends Vue {
  @Inject(TYPES.GET_FRIENDS_QRY)
  readonly getFriendsQry!: GetFriendsQry

  get friends() {
    return this.getFriendsQry.execute()
  }
}
</script>
