<template lang="html">
    <button class="fluid ui button" @click="showModal">
        <i class="plus square icon"></i>
        {{ text }}
    </button>
</template>

<script>
export default {
  props: ["text","guid"],
  methods:{
        showModal(){
            Event.$emit('show-modal', this.guid);
        }
  }
}
</script>

<style lang="css">
</style>
