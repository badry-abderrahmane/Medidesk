<template lang="html">
    <a  class="pointer" @click="showModal"><i class="blue eye icon"></i></a>
</template>

<script>
export default {
  props: ["instance","guid"],
  methods:{
        showModal(){
            Event.$emit('show-modal-show', { guid: this.guid, instance: this.instance });
        }
  }
}
</script>

<style lang="css">
</style>
