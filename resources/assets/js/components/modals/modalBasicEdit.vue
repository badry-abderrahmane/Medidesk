
<template lang="html">
    <div class="ui modal" :id="guid">
        <i class="close icon"></i>
        <div class="header">
            {{ title }}
        </div>
        <slot name="body"></slot>
    </div>
</template>

<script>
export default {
    props:["title","guid"],
    created(){
        $('#'+this.guid).modal();
        
        Event.$on('show-modal-edit', (data) => {
            Event.$emit('load-instance', data.instance);
            $('#'+data.guid).modal('show');
        });

        Event.$on('close-modal', () => {
            $('.ui.modal').modal('hide');
        });
    },
}
</script>

<style lang="css">
</style>
