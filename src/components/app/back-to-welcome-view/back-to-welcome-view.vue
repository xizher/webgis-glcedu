<template>
  <div
    class="back-to-welcome-view pointer-event-auto"
    @click="back"
  />
</template>

<script>
import { } from 'vue'
import { useRouter } from 'vue-router'
import './back-to-welcome-view.scss'
export default {
  name: 'BackToWelcomeView',
  setup () {
    const router = useRouter()
    function back () {
      router.back()
    }

    return {
      back
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
