<template lang="html">
  <div>
    <table class="ui definition table">
      <tbody>
        <tr>
          <td>#ID</td>
          <td><a class="ui grey circular label">{{ client.id }}</a></td>
        </tr>
        <tr>
          <td>Raison Sociale</td>
          <td>{{ client.name }}</td>
        </tr>
        <tr>
          <td>Type</td>
          <td v-html="getTypeHtml(client.typeclient.value)"></td>
        </tr>
        <tr>
          <td>Telephone</td>
          <td>{{ client.phone }}</td>
        </tr>
        <tr>
          <td>Fax</td>
          <td>{{ client.fax }}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{{ client.email }}</td>
        </tr>
        <tr>
          <td>Adresse</td>
          <td>{{ client.adress }}</td>
        </tr>
        <tr>
          <td>Secteur</td>
          <td>{{ client.secteur }}</td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>

export default {
  props:["client"],
  methods:{
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
