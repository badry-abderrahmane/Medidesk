
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Requiring needed vue instances 
 * Store , Router
 */
import { store } from './store';
import { router } from './router';

/**
 * Initiating Window Event with Vue
 */
window.Event = new Vue();

/**
 * Loading Components
 */

require('./components');
require('./forms');
require('./shows');
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('full-app', require('./layouts/app.vue'));

const app = new Vue({
    store,
    router,
    data(){
      return {
        table: '',
      }
    },
    mounted(){
      this.$store.dispatch('LOAD_TYPECLIENTS_LIST')
      this.$store.dispatch('LOAD_CLIENTS_LIST')
    //   this.$store.dispatch('LOAD_ACTIONS_LIST')
    //   this.$store.dispatch('LOAD_TYPECOMMS_LIST')
    //   this.$store.dispatch('LOAD_ETATS_LIST')
      this.$store.dispatch('LOAD_USERS_LIST')
    //   this.$store.dispatch('LOAD_ROLES_LIST')
    //   this.$store.dispatch('LOAD_TICKETS_LIST')
  
    //   this.$store.dispatch('LOAD_ROLE')
    //   this.$store.dispatch('LOAD_USER')
    //   this.$store.dispatch('LOAD_TICKETS')
  
    },
    created(){
      
      
      Event.$on('init-slimscroll-chat', () => {
        this.slimThisChat();
      });
  
      Event.$on('init-tooltip-all', () => {
        this.tooltipAll();
      });
  
      Event.$on('publish-success-message', (message) => {
        this.notifSuccess(message);
      });
      Event.$on('publish-info-message', (message) => {
        this.notifInfo(message);
      });
      Event.$on('publish-warning-message', (message) => {
        this.notifWarning(message);
      });
      Event.$on('publish-danger-message', (message) => {
        this.notifDanger(message);
      });
  
    },
    methods:{
      /**
      * Notif Functions
      *
      **/
      notifSuccess(message){
        $.toast({
         heading: message,
         text: '',
         position: 'bottom-center',
         loaderBg:'#ff6849',
         icon: 'success',
         hideAfter: 3500,
         stack: 6
       });
      },
      notifWarning(message){
        $.toast({
         heading: message,
         text: '',
         position: 'bottom-center',
         loaderBg:'#ff6849',
         icon: 'warning',
         hideAfter: 3500,
         stack: 6
       });
      },
      notifInfo(message){
        $.toast({
         heading: message,
         text: '',
         position: 'bottom-center',
         loaderBg:'#ff6849',
         icon: 'info',
         hideAfter: 3000,
         stack: 6
       });
      },
      notifDanger(message){
        $.toast({
         heading: message,
         text: '',
         position: 'bottom-center',
         loaderBg:'#ff6849',
         icon: 'error',
         hideAfter: 3500,
         stack: 6,
       });
      },
      
      /**
      * DataTables Functions
      *
      **/
      destroyThis(tableid){
        this.table.destroy();
      },
      datatableThis(tableid){
        this.table = $('table.display').DataTable({
          "bDestroy": true,
          dom: 'Bfrtip',
          buttons: [
             'excel', 'pdf',
             // { extend: 'pageLength', text:'Nombre de lignes'},
             { extend: 'print', text:'<i class="fa fa-print"></i>'}
          ],
          "language": {
                "lengthMenu": "Afficher _MENU_ lignes par page",
                "sSearch":         "Recherche&nbsp;:",
                "zeroRecords": "Aucun enregistrement pour le moment. ",
                "info": "Page _PAGE_ de _PAGES_",
                "infoEmpty": "Pas d'enregistrement.",
                "infoFiltered": "( _MAX_ enregistrements filtrés)",
                "oPaginate": {
                    "sFirst":      "Premier",
                    "sPrevious":   "Pr&eacute;c&eacute;dent",
                    "sNext":       "Suivant",
                    "sLast":       "Dernier"
                },
            }
        });
        //this.loadTooltips();
      },
      tooltipAll(){
        $('[data-toggle="tooltip"]').tooltip()
      }
    }
  }).$mount('#app');
