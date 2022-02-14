<template>
  <div class="inputContainer">
    <label>
      <slot></slot>
    </label>
    <input :value="value" @input="input" :type="type" class="input">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component({ name: 'AppInput' })
export default class AppInput extends Vue {
  @Prop({ required: true })
  value!: string

  @Prop({ required: false })
  type: string | undefined

  @Emit()
  input(event: Event) {
    return (event.target as HTMLInputElement)?.value
  }
}
</script>

<style scoped>
.inputContainer {
  display: flex;
  flex-direction: column;
}
.input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
</style>
