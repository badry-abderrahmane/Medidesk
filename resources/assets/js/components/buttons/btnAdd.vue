<template lang="html">
    <button class="fluid ui button" @click="showModal">
        <i class="plus square icon"></i>
        {{ text }}
    </button>
</template>

<script>
export default {
  props: ["text"],
  methods:{
        showModal(){
            Event.$emit('show-modal', 'tableAdd');
        }
  }
}
</script>

<style lang="css">
</style>
