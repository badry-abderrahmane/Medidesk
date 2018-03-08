
<template lang="html">
    <div class="ui modal" id="delete_instance">
        <i class="close icon"></i>
        <div class="header">
            {{ title }}
        </div>
        <div class="content">
            <div class="ui negative message">
                <i class="close icon"></i>
                <div class="header">
                    Etes-vous sûr de vouloir supprimer cet instance?
                </div>
                <p>{{ message }}</p>
            </div>
        </div>
        <div class="actions">
            <div class="ui negative button" @click="closeModal">
                Annuler
            </div>
            <div class="ui positive right labeled icon button" @click="deleteInstance">
                Oui, Supprimer
                <i class="checkmark icon"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            title: '',
            message: '',
            instance: '',
            instanceId: '',
        }
    },
    created(){
        $('#delete_instance').modal();
        
        Event.$on('show-modal-delete', (data) => {
            $('#delete_instance').modal('show');
            this.title = data.title
            this.message = data.message
            this.instance = data.instance
            this.instanceId = data.instanceId
        });


        Event.$on('close-modal', () => {
            $('.ui.modal').modal('hide');
        });
    },
    methods:{
        deleteInstance(){
            axios.delete('/'+this.instance+'/'+this.instanceId)
            .then(response => {
                location.reload();
            })
        },
        closeModal(){
            $('#delete_instance').modal('hide');
        }
    }
    
}
</script>

<style lang="css">
</style>
