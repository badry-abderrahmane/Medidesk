<template lang="html">
    <form class="ui form">
        <div class="three fields">
            <input-basic name="type_client" label="Type client"/>
            <input-basic name="name" label="Raison sociale"/>
            <input-basic name="secteur" label="Secteur d'activité"/>
        </div>
        <div class="three fields">
            <input-basic name="phone" label="Numéro téléphone"/>
            <input-basic name="fax" label="Numéro Fax"/>
            <input-basic name="email" label="Email"/>
        </div>
        <div class="two fields">
            
            <input-basic name="adress" label="Adresse"/>
            
            <input-basic name="responsable" label="Responsable"/>
        </div>
        
        <div class="ui column centered grid">
            <div class="column four wide"><button class="ui button fluid brown" type="submit"><i class="save  icon"></i>Enregistrer</button></div>
            <div class="four column centered row"></div>
        </div>
    </form>
</template>

<script>
export default {
  
}
</script>

<style lang="css">
</style>
