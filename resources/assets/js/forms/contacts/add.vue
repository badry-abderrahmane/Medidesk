<template lang="html">
  <div><br>
    <form v-on:submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)" class="ui form">
        <div class="three fields">
            
            <div class="field">
                <label>Client</label>
                <basic-select :options="clients"
                            :selected-option="selectedClient"
                            placeholder="Choisir .."
                            @select="onSelectClient" />
                <small class="helper" v-if="form.errors.has('client_id')" v-text="form.errors.get('client_id')"></small>
            </div>
            
            <input-basic v-model="form" name="name" label="Nom et prénom"/>
            <input-basic v-model="form" name="email" label="Email"/>

        </div>
        <div class="three fields">
            <div class="field">
                <label>Civilité</label>
                <model-select :options="cilivilites" v-model="form['civilite']" />
                <small class="helper" v-if="form.errors.has('civilite')" v-text="form.errors.get('civilite')"></small>
            </div>
            <input-basic v-model="form" name="phone" label="Numéro téléphone"/>
            <input-basic v-model="form" name="fonction" label="Fonction"/>
        </div>
        <div class="">
            <input-basic v-model="form" name="adress" label="Adresse"/>
        </div>
        <br>
        <div class="ui column centered grid">
            <div class="column four wide"><button class="ui button fluid brown" type="submit"><i class="save  icon"></i>Enregistrer</button></div>
            <div class="four column centered row"></div>
        </div>
    </form>
    
  </div>
</template>

<script>
import { BasicSelect } from 'vue-search-select'
import { MultiSelect } from 'vue-search-select'
import { ModelSelect } from 'vue-search-select'
import _ from 'lodash'
import { Form } from './../../api/form.js'

export default {
    components: {
        BasicSelect,
        MultiSelect,
        ModelSelect
    },
    data(){
        return {
            form : new Form({
                id: '',
                client_id: '',
                name: '',
                civilite: '',
                adress: '',
                phone: '',
                email: '',
                fonction: '',
            }),
            cilivilites: [{value:'H',text:'Homme'},{value:'F',text:'Femme'}],
            selectedClient: {}
        }
    },
    computed:{
        clients: function(){
            return this.$store.state.clients
        },
        
    },
    methods:{
        onSelectClient(item){
            this.selectedClient = item
        },
        onSubmit(){
            this.form.client_id = this.selectedClient.value
            this.form.post('/contacts')
            .then(data => {
                Event.$emit('publish-success-message', data.message);
                Event.$emit('load-instance-show', this.selectedClient.value);
                Event.$emit('show-instance-list');
            })
            .catch(errors =>{
                console.log(errors);
            });
      },
        
    }
}
</script>

<style lang="css">

</style>
