<template lang="html">
    <table id="table-data" class="ui celled table" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th v-for="header in headers">{{ header.text }}</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in data">
                <td v-for="cell in row">{{ cell }}</td>
                <td>
                    <a  class="pointer" @click="$router.push({path: 'clients/show/'+row.id})"><i class="  blue eye icon"></i></a>
                    <a  class="pointer" @click="$router.push({path: 'clients/show/'+row.id})"><i class="  yellow edit icon"></i></a>
                    <a  class="pointer" @click="$router.push({path: 'clients/show/'+row.id})"><i class="  red trash alternate icon"></i></a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
  props: ["headers","data"],
  data(){
      return {
          table: '',
      }
  },
  created(){
      Event.$on('init-datatable', (tableid) => {
        this.datatableThis(tableid);
      });
      Event.$on('fill-filter', (param) => {
        //this.table.fnFilter(param);
        this.table.search( param ).draw();
      });
  },
  methods:{
      datatableThis(tableid){
        this.table = $('#table-data').DataTable({
            "bDestroy": true,
            "info": false,
            lengthChange: false,
            buttons: [ 'copy', 'excel', 'pdf', 'colvis' ],
            dom: 'Brtip',
            "language": {
                "zeroRecords": "Aucun enregistrement pour le moment. ",
                "oPaginate": {
                    "sFirst":      "Premier",
                    "sPrevious":   "Pr&eacute;c&eacute;dent",
                    "sNext":       "Suivant",
                    "sLast":       "Dernier"
                },
            }
        });
        
        this.table.buttons().container().appendTo( $('div.eight.column:eq(0)', this.table.table().container()) );
        
      },

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
