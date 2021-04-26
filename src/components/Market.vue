<template>
  <div class="market my-2">
    <img :src="market.square" alt="" class="w-100">
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'Market',
  props: {
    market: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({

    })
    return { state }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
