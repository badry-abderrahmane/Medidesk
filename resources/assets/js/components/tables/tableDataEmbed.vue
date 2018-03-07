<template lang="html">
    <div>
        <div class="row">
            <button class="ui teal button" v-if="show != 'list'" @click="listInstance()"><i class="list alternate icon"></i>Liste des contacts</button>
            <button class="ui teal button" v-if="show != 'add'" @click="addInstance()"><i class="plus square icon"></i>Nouveau contact</button>
        </div>
        <table id="table-data" class="ui celled table" cellspacing="0" width="100%" v-show="show == 'list'">
            <thead>
                <tr>
                    <th v-for="header in headers">{{ header.text }}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in data">
                    <td v-for="cell in row" v-html="cell"></td>
                    <td>
                        <a class="pointer" @click="editInstance(row.id)"><i class="yellow edit icon"></i></a>
                        <a  class="pointer" @click="$router.push({path: 'clients/show/'+row.id})"><i class="  red trash alternate icon"></i></a>
                    </td>
                </tr>
            </tbody>
        </table>
        
        <div v-show="show == 'edit'">
            <component :is="'form-'+instanceName+'-edit'" :instanceId="inActionId"></component>
        </div>
        <div v-show="show == 'add'">
            <component :is="'form-'+instanceName+'-add'" :instanceId="inActionId"></component>
        </div>
        <div v-show="show == 'delete'">
            <component :is="'form-'+instanceName+'-delete'" :instanceId="inActionId"></component>
        </div>
    </div>
    
</template>

<script>
export default {
  props: ["headers","data","instanceName"],
  data(){
      return {
          show: 'list',
          inActionId: ''
      }
  },
  created(){
      Event.$on('show-instance-list', () => {
        this.listInstance();
      });

      
  },
    methods:{
        listInstance(){
            this.show = 'list'
        },
        addInstance(){
            this.show = 'add'
        },
        editInstance(instanceId){
            Event.$emit('load-instance-embeded', instanceId);
            this.inActionId = instanceId
            this.show = 'edit'
        }
    }
}
</script>

<style lang="css">
.dt-buttons{
    margin-bottom: 10px !important;
}
.dataTables_paginate{
    margin-top: 10px !important;
}
.pointer{
    cursor:pointer;
}
</style>
