<template>
  <div class="topic-header-panel pointer-event-auto">
    <div class="title">
      {{ title }}
    </div>
    <div
      v-if="subTitle"
      class="subtitle"
    >
      ——{{ subTitle }}
    </div>
  </div>
</template>

<script>
import { } from 'vue'
export default {
  name: 'TopicHeaderPanel',
  props: {
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
  },
  setup () {

    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
