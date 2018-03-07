<template lang="html">
  <div>
    <form v-if="!loading" v-on:submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)" class="ui form">
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
        
        <div class="ui column centered grid">
            <div class="column four wide"><button class="ui button fluid brown" type="submit"><i class="save  icon"></i>Enregistrer</button></div>
            <div class="four column centered row"></div>
        </div>
    </form>
    
    <div v-if="loading">Loading</div>
  </div>
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
    return {
      loading: true,
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
      clientId: ''
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
  created(){
    Event.$on('load-instance', (instance) => {
      this.clientId = instance
      this.getClient(instance)
    });
  },
  methods:{
    getClient(clientId){
      this.loading = true
      axios.get('/clients/'+clientId)
        .then(response => {
          this.form.load(response.data);
          this.getResponsables()
          this.getSecteurs()
          this.getTypeClient()
          this.loading = false
      });
    },
    onSubmit(){
      this.prepareUsers();
        this.form.put('/clients')
          .then(data => {
            Event.$emit('publish-success-message', data.message);
            Event.$emit('load-clients-list');
            Event.$emit('close-modal');
          })
          .catch(errors => {
            console.log(errors);
          });
    },
    getSecteurs(){
      this.selectedSecteur = {}
      if (this.clientId) {
        this.secteurs.map((value,key)=> {
          if (value.value == this.form.secteur) {
            this.selectedSecteur = value
          }
        });
      }
    },
    prepareUsers(){
      let users = []
      this.selectedUsers.map(function(value,key){
        users.push(value.value)
      })
      this.form.users = users;
    },
    getResponsables(){
      this.selectedUsers = []
      if (this.clientId) {
        this.$store.state.users.map((value,key)=> {
          this.form.users.map((val,ke) => {
            if (value.value == val.id) {
              this.selectedUsers.push(value)
            }
          })
        });
      }
    },
    getTypeClient(){
      this.selectedTypeclient = {}
      if (this.clientId) {
        this.$store.state.typeclients.map((value,key)=> {
          if (value.value == this.form.typeclient_id) {
            this.selectedTypeclient = value
          }
        });
      }
    },
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
    // select option from parent component
    selectOption () {
      this.selectedUsers = _.unionWith(this.selectedUsers, [this.users[0]], _.isEqual)
    },
    
  }
}
</script>

<style lang="css">
.search {
    max-height: 38px !important;
}
</style>
