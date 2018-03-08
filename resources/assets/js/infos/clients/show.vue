<template>
    <div>
        <tab-basic :tabs="tabs">
            <div slot="tab_1">
                <Informations :client="client" />
            </div>
            <div slot="tab_2">
                <Contacts :contacts="contacts" :clientid="client.id"/>
            </div>
            <div slot="tab_3">
                <Adresses />
            </div>
            <div slot="tab_4">
                <Tickets />
            </div>
        </tab-basic>
    </div>
</template>

<script>
import Informations from './informations'
import Contacts from './contacts'
import Adresses from './adresses'
import Tickets from './tickets'

export default {
    components: {
        Informations,
        Contacts,
        Adresses,
        Tickets,
    },
    data(){
        return {
            tabs: [
                {id: '1', name: '<i class="id card outline icon"></i>Informations'},
                {id: '2', name: '<i class="phone square icon"></i>Contacts'},
                {id: '3', name: '<i class="home icon"></i>Adresses'},
                {id: '4', name: '<i class="ticket alternate icon"></i>Tickets'}
            ],
            client:{ typeclient:{ value:'' }},
            contacts:[]
        }
    },
    created(){
        
        Event.$on('load-instance-show', (instance) => {
            this.getClient(instance)
        });
    },
    methods:{
        getClient(clientId){
            this.client = { typeclient:{ value:'' }}
            axios.get('/clients/'+clientId)
                .then(response => {
                Event.$emit('load-parent-instance-embeded', response.data.id);
                this.client = response.data;
                this.makeContacts(response.data.contacts)
            });
        },
        makeContacts(contacts){
            this.contacts = []
            contacts.forEach((value,key) =>{
                let contact = {  
                                id: value.id , 
                                name: value.name , 
                                civilite: value.civilite , 
                                adress: value.adress , 
                                phone: value.phone,
                                email: value.email,
                                fonction: value.fonction,
                            }
                this.contacts.push(contact)
            })
        }
    }
   
}
</script>

<style lang="css">
</style>
