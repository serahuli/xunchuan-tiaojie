<template>
  <div class="left-wrap">
    <Box class="conflict-wrap" title="调解统计">
      <MediateRecords slot="container" />
    </Box>
    <Phone slot="container" class="phone-wrap" />
    <Records slot="container" class="records-wrap" />
  </div>
</template>

<script>
import Box from '@/components/Box.vue'
import MediateRecords from '@/components/MediateRecords.vue'
import Phone from './Phone.vue'
import Records from './Records.vue'

export default {
  name: 'Center',
  components: { Box, Phone, Records, MediateRecords },
}
</script>

<style scoped lang="scss">
@import '../../styles/utils.scss';
.phone-wrap {
  margin-top: vh(20);
}
.records-wrap {
  margin-top: vh(40);
}
</style>