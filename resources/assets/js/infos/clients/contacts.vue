<template>
    <div class="ui  width center aligned padded grid">
        <div class="row">
            <div class="wide column">
                <table-data-embed :headers="headers" :data="contacts" instanceName="contact" :parentId="clientid" />
            </div>
            
        </div>
        
    </div>
</template>

<script>
export default {
    props:["contacts","clientid"],
    data(){
        return {
            headers: [
                { id: 1, text:'#ID'},
                { id: 2, text:'Nom'},
                { id: 3, text:'Civilité'},
                { id: 4, text:'Adresse'},
                { id: 5, text:'Tel'},
                { id: 6, text:'Email'},
                { id: 7, text:'Fonction'},
            ],
        }
    },
    
}
</script>

<style lang="css">
</style>

