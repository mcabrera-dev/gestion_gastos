<template>
  <ul>
    <li
      v-for="friend in friends"
      :key="friend.id"
      :class="{ completed: friend.completed }"
    >
      {{ friend.fullname }}
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Inject } from '../../domain/di/inject'
import { TYPES } from '../../types'
import { GetFriendsQry } from '../../application/queries/get-friends-qry'

@Component({ name: 'AppFriendList' })
export default class AppFriendList extends Vue {
  @Inject(TYPES.GET_FRIENDS_QRY)
  readonly getFriendsQry!: GetFriendsQry

  get friends() {
    return this.getFriendsQry.execute()
  }
}
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
