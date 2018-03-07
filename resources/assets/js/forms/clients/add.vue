<template lang="html">
    <form v-on:submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)" class="ui form">
        <div class="three fields">
            
            <div class="field">
                <label>Type client</label>
                <basic-select :options="typeclients"
                            :selected-option="selectedTypeclient"
                            placeholder="Choisir .."
                            @select="onSelectTypeclient">
                </basic-select>
                <small class="helper" v-if="form.errors.has('typeclient_id')" v-text="form.errors.get('typeclient_id')"></small>
            </div>
            
            <input-basic v-model="form" name="name" label="Raison sociale"/>

            <div class="field">
                <label>Secteur</label>
                <basic-select :options="secteurs"
                            :selected-option="selectedSecteur"
                            placeholder="Choisir .."
                            @select="onSelectSecteur">
                </basic-select>
                <small class="helper" v-if="form.errors.has('secteur')" v-text="form.errors.get('secteur')"></small>
            </div>

        </div>
        <div class="three fields">
            <input-basic v-model="form" name="phone" label="Numéro téléphone"/>
            <input-basic v-model="form" name="fax" label="Numéro Fax"/>
            <input-basic v-model="form" name="email" label="Email"/>
        </div>
        <div class="two fields">
            
            <input-basic v-model="form" name="adress" label="Adresse"/>

            <div class="field">
                <label for="Clients" class="control-label mb-10">Responsable</label>
                <multi-select :options="users"
                               :selected-options="selectedUsers"
                               placeholder="Choisir un responsable"
                               @select="onSelectUser">
                </multi-select>
                <div class="helper" v-if="form.errors.has('user_id')" v-text="form.errors.get('user_id')"></div>
              </div>
            </div>
            
        </div>
        
        <div class="ui column centered grid">
            <div class="column four wide"><button class="ui button fluid brown" type="submit"><i class="save  icon"></i>Enregistrer</button></div>
            <div class="four column centered row"></div>
        </div>
    </form>
</template>

<script>
import { BasicSelect } from 'vue-search-select'
import { MultiSelect } from 'vue-search-select'
import _ from 'lodash'
import { Form } from './../../api/form.js'
import secteurs from './../data/secteurs.js'

export default {
    components: {
        BasicSelect,
        MultiSelect
    },
    data(){
        return{
            form : new Form({
                id:'',
                name:'',
                typeclient_id:'',
                phone:'',
                fax:'',
                email:'',
                adress:'',
                secteur:'',
                users:[],
            }),
            selectedUsers: [],
            lastSelectedUsers: {},
            selectedTypeclient: {},
            secteurs: secteurs,
            selectedSecteur: {},
        }
    },
    computed:{
        typeclients: function(){
            return this.$store.state.typeclients
        },
        users: function(){
            return this.$store.state.users
        },
    },
    methods: {
      onSelectUser(selectedUsers, lastSelectedUsers) {
        this.selectedUsers = selectedUsers
        this.lastSelectedUsers = lastSelectedUsers
      },
      onSelectSecteur(item){
          this.selectedSecteur = item
      },
      onSelectTypeclient (item) {
        this.selectedTypeclient = item
      },
      // deselect option
      reset () {
        this.selectedUsers = [] // reset
      },
      // select option from parent component
      selectOption () {
        this.selectedUsers = _.unionWith(this.selectedUsers, [this.users[0]], _.isEqual)
      },
      onSubmit(){
        this.prepareUsers();
        this.form.typeclient_id = this.selectedTypeclient.value
        this.form.secteur = this.selectedSecteur.value
        this.form.post('/clients')
        .then(data => {
            this.$store.dispatch('LOAD_CLIENTS_LIST')
            Event.$emit('publish-success-message', data.message);
            Event.$emit('load-clients-list');
            Event.$emit('close-modal');
        })
        .catch(errors =>{
            console.log(errors);
        });
      },
      prepareUsers(){
        let users = []
        this.selectedUsers.map(function(value,key){
          users.push(value.value)
        })
        this.form.users = users;
      },
    }
}
</script>

<style lang="css">
.search {
    max-height: 38px !important;
}
</style>
