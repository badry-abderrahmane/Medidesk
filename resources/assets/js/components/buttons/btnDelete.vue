<template lang="html">
    <a  class="pointer" @click="showModal"><i class="red trash alternate icon"></i></a>
</template>

<script>
export default {
  props: ["instance","instanceid","message","title"],
  methods:{
        showModal(){
            Event.$emit('show-modal-delete', { instance: this.instance, instanceId: this.instanceid, message: this.message, title: this.title});
        }
  }
}
</script>

<style lang="css">
</style>
