<template>
  <div>
    UbnzonSplitScreen
  </div>
</template>

<script>
import { } from 'vue'
import { useUrbanizationSplitSceen } from '../../../project/hooks/topic/useUrbanization'
export default {
  name: 'UbnzonSplitScreen',
  setup () {

    return useUrbanizationSplitSceen()
  }
}
</script>

<style lang="scss" scoped>

</style>
