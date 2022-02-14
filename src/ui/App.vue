<template>
  <main>
    <div class="mainContainer">
      <div class="header">
        <h1>Gestion de gastos compartidos</h1>
        <p>A través de está app podrás gestionar los gastos compartidos de tu grupo de amigos.</p>
      </div>
      <div class="content">
        <div class="contentWrapper">
          <div class="friendContainer">
            <app-friend-balance></app-friend-balance>
            <hr class="rounded" />
            <app-create-friend></app-create-friend>
          </div>
          <div class="costContainer">
            <app-cost-list></app-cost-list>
            <hr class="rounded" />
            <app-create-cost></app-create-cost>
            <app-optimun-payments-list></app-optimun-payments-list>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppFriendBalance from './features/app-friend-balance.vue'
import AppCreateFriend from './features/app-create-friend.vue'
import AppCreateCost from './features/app-create-cost.vue'
import AppCostList from './features/app-cost-list.vue'
import AppOptimunPaymentsList from './features/app-optimun-payments-list.vue'

@Component({
  components: {
    AppCreateFriend,
    AppFriendBalance,
    AppCreateCost,
    AppCostList,
    AppOptimunPaymentsList
  }
})
export default class App extends Vue {}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap');

* {
  margin: 0;
  box-sizing: border-box;
}
html {
  font-size: 62.5%;
}
img {
  width: 100%;
  vertical-align: middle;
}
body {
  background-color: #0d192c;
  font-family: 'Outfit', sans-serif;
  color: white;
}
hr.rounded {
  margin: 20px;
  margin-top: 40px;
  border-radius: 5px;
}

.mainContainer {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: normal;
  align-items: normal;
  align-content: normal;
  margin-top: 62px;
}
.header {
  display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: auto;
  order: 0;
  padding: 30px;
  text-align: center;
  font-size: 20px;
}
.content {
  display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: stretch;
  order: 0;
}

.friendContainer {
  display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: auto;
  width: 35%;
  order: 0;

  margin: 0 1rem;
  font-size: 1.6rem;
  padding-bottom: 32px;
  background-color: #15263f;
  color: #8bacd9;
  border-radius: 16px;
  padding: 24px;
}

.costContainer {
  display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: stretch;
  order: 0;
  border-radius: 5px;
  padding: 1rem;
  margin: 0 1rem;
  width: 65%;

  margin: 0 1rem;
  font-size: 1.6rem;
  padding-bottom: 32px;
  background-color: #15263f;
  color: #8bacd9;
  border-radius: 16px;
  padding: 24px;
}

.contentWrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: normal;
  align-items: normal;
  align-content: normal;
}
</style>
