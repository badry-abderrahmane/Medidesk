<template lang="html">
  <div>
    <div class="ui  width center aligned padded grid">
        <div class="row">
            <div class="three wide column">
                <button-add text="Nouveau Client" />
                <menu-list-count :list="list"/>
            </div>
            <div class="thirteen wide column">
                <table-data :headers="headers" :data="clients"/>
            </div>
        </div>
    </div>
    <modal-basic title="Nouveau client">
        <div class="content" slot="body">
            <form-client />
        </div>
    </modal-basic>
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
                { id: 4, text:'Tel'},
                { id: 5, text:'Secteur'},
                { id: 6, text:'Responsable'},
            ],
            list: [
                { id: 1, text:'Potentiels', name: 'Potentiel' ,count: 0},
                { id: 2, text:'Prospects', name: 'Prospect'  , count: 0},
                { id: 3, text:'Suspendus', name: 'Suspendu'  , count: 0},
            ],
            clients:[]
        }
    },
    mounted(){
        this.getClients()
    },
    methods:{
        getClients(){
            axios.get('/clients')
                .then(response => {
                response.data.forEach((value,key) =>{
                    let client = {  id: value.id , 
                                    name: value.name , 
                                    type: value.typeclient.value , 
                                    phone: value.phone , 
                                    secteur: value.secteur , 
                                    responsable: value.responsable 
                                }
                    this.list.forEach((val,k) => {
                        if(val.name == client.type){
                            val.count++;
                        }
                    })
                    this.clients.push(client)
                })
                Vue.nextTick(function () {
                    Event.$emit('init-datatable', 'tableAdd');
                })
            });
        },
        
        
    }
}
</script>

<style lang="css">
</style>
