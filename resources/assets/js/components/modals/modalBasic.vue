
<template lang="html">
    <div class="ui modal">
        <i class="close icon"></i>
        <div class="header">
            {{ title }}
        </div>
        <slot name="body"></slot>
    </div>
</template>

<script>
export default {
    props:["title"],
    created(){
        $('.ui.modal').modal();
        
        Event.$on('show-modal', (param) => {
            $('.ui.modal').modal('show');
        });
    },
}
</script>

<style lang="css">
</style>
