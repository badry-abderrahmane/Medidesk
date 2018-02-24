<template lang="html">
    <div>
        <div class="ui inverted menu">
            <div class="header item">STG DESK</div>

            <a class="item" v-for="page in pages" @click="$router.push(page.path)"><i :class="page.icon"></i>{{ page.name }}</a>

            <div class="right menu">
                <div class="item">
                    <div class="ui transparent inverted icon input">
                        <i class="search icon"></i>
                        <input type="text" placeholder="Recherche">
                    </div>
                </div>
                <div class="ui simple dropdown item">
                    Badry
                    <i class="dropdown icon"></i>
                    <div class="menu">
                        <a class="item" href="#">
                            <i class="cog icon"></i>Paramètres</a>
                        <a class="item" href="#">
                            <i class="sign out icon"></i>Déconnexion</a>
                    </div>
                </div>
            </div>
        </div>

        <router-view></router-view>
        

    </div>
</template>

<script>
    
    export default {
        data(){
            return {
                pages: [
                    { name: 'Tableau de bord', path: '/' , icon: 'tachometer alternate icon'},
                    { name: 'Clients', path: 'clients' , icon: 'building icon'},
                    { name: 'Tickets', path: 'tickets' , icon: 'ticket alternate icon'},
                    { name: 'Boîte de réception', path: 'mailbox' , icon: 'envelope icon'},
                    { name: 'Utilisateurs', path: 'utilisateurs' , icon: 'users icon'},
                    { name: 'Paramètres', path: 'parametres' , icon: 'cogs icon'},
                ]
            }
        }
    }
</script>
<style lang="css">
    .ui.inverted.menu {
        background: #2185d0;
        border-radius: 0;
        margin:  0;
    }
</style>