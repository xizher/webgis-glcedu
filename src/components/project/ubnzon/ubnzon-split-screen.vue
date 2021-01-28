<template>
  <div>
    UbnzonSplitScreen
  </div>
</template>

<script>
import { } from 'vue'
import { useUrbanizationSplitSceen } from '../../../project/hooks/useTopic'
export default {
  name: 'UbnzonSplitScreen',
  setup () {
    useUrbanizationSplitSceen()

    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
