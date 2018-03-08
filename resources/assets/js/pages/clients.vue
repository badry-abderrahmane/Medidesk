<template lang="html">
  <div>
    <div class="ui  width center aligned padded grid">
        <div class="row">
            <div class="three wide column">
                <button-add text="Nouveau Client" :guid="guid+1"/>
                <menu-list-count :list="list"/>
            </div>
            <div class="thirteen wide column">
                <table-data v-if="!clientsLoading" :headers="headers" :data="clients" :guid="guid" instanceName="clients"/>
                <div v-else>Loading clients</div>
            </div>
        </div>
    </div>
    <modal-basic-show title="Informations client" :guid="guid">
        <div class="content" slot="body">
            <show-client />
        </div>
    </modal-basic-show>
    <modal-basic-add title="Nouveau client" :guid="guid+1">
        <div class="content" slot="body">
            <form-client-add />
        </div>
    </modal-basic-add>
    <modal-basic-edit title="Modification client" :guid="guid+2">
        <div class="content" slot="body">
            <form-client-edit />
        </div>
    </modal-basic-edit>
    <modal-basic-delete />
        
  </div>
</template>

<script>
export default {
    data(){
        return {
            headers: [
                { id: 1, text:'#ID'},
                { id: 2, text:'Nom'},
                { id: 3, text:'Type'},
                // { id: 4, text:'Tel'},
                { id: 5, text:'Secteur'},
                { id: 6, text:'Responsables'},
            ],
            list: [
                { id: 1, text:'Potentiel', name: 'PO.' ,count: 0},
                { id: 2, text:'Prospect', name: 'PR.'  , count: 0},
                { id: 3, text:'Suspendu', name: 'SS.'  , count: 0},
            ],
            clients:[],
            clientsLoading: true,
        }
    },
    
    mounted(){
        this.getClients()
        Event.$on('load-clients-list', () => {
            Event.$emit('destroy-datatable');
            this.getClients()
        });
    },
    computed:{
        guid:function(){
            return 'xxxxxxxx-xxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });
        },
    },
    methods:{
        getClients(){
            this.clientsLoading = true
            this.clients = [];
            axios.get('/clients')
                .then(response => {
                response.data.forEach((value,key) =>{
                    let responsables = '';
                    if(value.users.length > 0){
                        value.users.forEach((v,k) => {
                            responsables = responsables+'<div class="ui label"><i class="user icon"></i>'+v.name+'</div>'
                        })
                    }
                    
                    
                    let type = this.getTypeHtml(value.typeclient.value)
                    let client = {  id: value.id , 
                                    name: value.name , 
                                    type: type , 
                                    // phone: value.phone , 
                                    secteur: value.secteur , 
                                    responsable: responsables
                                }
                    this.list.forEach((val,k) => {
                        if(val.text == value.typeclient.value){
                            val.count++;
                        }
                    })
                    this.clients.push(client)
                })
                this.clientsLoading = false
                Vue.nextTick(function () {
                    Event.$emit('init-datatable', 'tableAdd');
                })
                
            });
        },
        
        getTypeHtml(type){
            switch (type) {
                case 'Potentiel':
                    return '<div class="ui teal label"><i class="bell icon"></i>PO.</div>'
                    break;
                case 'Prospect':
                    return '<div class="ui label"><i class="bell outline icon"></i>PR.</div>'
                    break;
                case 'Suspendu':
                    return '<div class="ui red label"><i class="bell slash icon"></i>SS.</div>'
                break;

                default:
                    return '<div class="ui glod label"><i class="user icon"></i>'+type+'</div>'
                    break;
            }
            
        }
        
    }
}
</script>

<style lang="css">
</style>
