<template lang="html">
    <form class="ui form">
        <div class="three fields">
            <div class="field">
                <label>Type client</label>
                <basic-select :options="typeclients"
                            :selected-option="selectedTypeclient"
                            placeholder="Choisir .."
                            @select="onSelectTypeclient">
                </basic-select>
                <small class="helper">test</small>
            </div>
            
            
            <input-basic name="name" label="Raison sociale"/>
            <div class="field">
                <label>Secteur</label>
                <basic-select :options="secteurs"
                            :selected-option="selectedSecteur"
                            placeholder="Choisir .."
                            @select="onSelectSecteur">
                </basic-select>
                <small class="helper">test</small>
            </div>
        </div>
        <div class="three fields">
            <input-basic name="phone" label="Numéro téléphone"/>
            <input-basic name="fax" label="Numéro Fax"/>
            <input-basic name="email" label="Email"/>
        </div>
        <div class="two fields">
            
            <input-basic name="adress" label="Adresse"/>
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
import { Form } from './../api/form.js'
import secteurs from './data/secteurs.js'

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
            selectedSecteur: '',
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
      if (this.clientId) {
        axios.get('/clients/'+this.clientId)
          .then(response => {
            this.form.load(response.data);
            this.getResponsables()
            this.getTypeClient()
        });
      }
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
        if (this.form.id == '') {
          this.form.typeclient_id = this.selectedTypeclient.value
          this.form.secteur = this.selectedSecteur.value
          this.form.post('/clients')
            .then(data => {
              this.$store.dispatch('LOAD_CLIENTS_LIST')
              Event.$emit('publish-success-message', data.message);
              this.goback();
            })
            .catch(errors =>{
              console.log(errors);
            });
        }else{
          this.form.put('/clients')
            .then(data => {
              this.$store.dispatch('LOAD_CLIENTS_LIST')
              Event.$emit('publish-success-message', data.message);
              this.goback();
            })
            .catch(errors => {
              console.log(errors);
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
      goback(){
          this.$router.go(-1);
      }
    }
}
</script>

<style lang="css">
.search {
    max-height: 38px !important;
}
</style>
