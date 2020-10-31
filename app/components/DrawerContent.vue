<template lang="html">
    <GridLayout rows="auto, *"
      class="nt-drawer__content" >
        <StackLayout row="0" class="nt-drawer__header banner">
            <Image class="nt-drawer__header-image fas t-36" src.decode="font://&#xf2bd;"/>
            <Label class="nt-drawer__header-brand" :text="this.$root.localStorage.username"/>
            <Label class="nt-drawer__header-footnote" :text="this.$root.localStorage.role_name"/>
        </StackLayout>

        <ScrollView row="1" class="nt-drawer__body">
            <StackLayout>
                <!-- <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Home' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Home)">
                    <Label col="0" :text="'fa-home'|fonticon" class="nt-icon fas"/>
                    <Label col="1" text="Home" class="p-r-10"/>
                </GridLayout> -->

                <GridLayout v-if="(this.$root.localStorage.role_name==='admin')" columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Inventory' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Inventory)">
                    <Label col="0" :text="'fa-boxes'|fonticon" class="nt-icon fas"/>
                    <Label col="1" text="Inventory" class="p-r-10"/>
                </GridLayout>

                <GridLayout v-if="(this.$root.localStorage.role_name==='admin')" columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Suppliers' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Suppliers)">
                    <Label col="0" :text=" 'fa-truck-loading' | fonticon " class="nt-icon fas"/>
                    <Label col="1" text="Suppliers" class="p-r-10"/>
                </GridLayout>

                <GridLayout v-if="(this.$root.localStorage.role_name==='admin')" columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Roles' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Roles)">
                    <Label col="0" :text=" 'fa-user-tag' | fonticon " class="nt-icon fas"/>
                    <Label col="1" text="Roles" class="p-r-10"/>
                </GridLayout>

                <GridLayout v-if="(this.$root.localStorage.role_name==='admin')" columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Users' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Users)">
                    <Label col="0" text.decode="&#xf015;"
                      :text=" 'fa-users' | fonticon "
                     class="nt-icon fas"/>
                    <Label col="1" text="Users" class="p-r-10"/>
                </GridLayout>

                <StackLayout 
                  v-if="(this.$root.localStorage.role_name==='admin')"  class="hr" 
                  color="#05C5AA"/>

                <GridLayout v-if="(this.$root.localStorage.role_name==='admin')" columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Delivery' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Delivery)">
                    <Label col="0" :text="'fa-truck' | fonticon" class="nt-icon fas"/>
                    <Label col="1" text="Delivery" class="p-r-10"/>
                </GridLayout>

                <GridLayout v-if="(this.$root.localStorage.role_name==='custodian')" columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Delivery' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Delivery)">
                    <Label col="0" :text="'fa-truck' | fonticon" class="nt-icon fas"/>
                    <Label col="1" text="Delivery" class="p-r-10"/>
                </GridLayout>

                <GridLayout v-if="(this.$root.localStorage.role_name==='admin')" columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Sales' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Sales)">
                    <Label col="0" :text=" 'fa-cash-register' | fonticon" class="nt-icon fas" />
                    <Label col="1" text="Sales" class="p-r-10"/>
                </GridLayout>

                <GridLayout v-if="(this.$root.localStorage.role_name==='cashier')" columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Sales' ? ' -selected': '')"
                            @tap="onNavigationItemTap(Sales)">
                   <Label col="0" :text=" 'fa-cash-register' | fonticon" class="nt-icon fas" />
                    <Label col="1" text="Sales" class="p-r-10"/>
                </GridLayout>

                <StackLayout 
                  v-if="(this.$root.localStorage.role_name==='admin')"  class="hr" 
                  color="#05C5AA"/>

                <GridLayout columns="auto, *"
                            :class="'nt-drawer__list-item' + (selectedPage === 'Logout' ? ' -selected': '')"
                            @tap="logout(Logout)">
                    <Label col="0" class="nt-icon fas" :text=" 'fa-sign-out-alt' | fonticon " />
                    <Label col="1" text="Logout" class="p-r-10"/>
                </GridLayout>

            </StackLayout>
        </ScrollView>
    </GridLayout>
</template>

<script>
  import Home from "./Dashboard";
  import Inventory from "./Admin/Inventory/Inventory";
  import Suppliers from "./Admin/Suppliers/Suppliers";
  import Roles from "./Admin/Roles/Roles";
  import Users from "./Admin/Users/Users";
  import Featured from "./Featured";
  import Search from "./Search";
  import Settings from "./Settings";
  import Delivery from "./Transactions/Delivery/Delivery";
  import Sales from "./Transactions/Sales/Sales";
  import Logout from "./Home";
  import * as utils from "~/shared/utils";
  import SelectedPageService from "~/shared/selected-page-service";

  export default {
    created(){
      // this.$root.localStorage = this.$root.localStorage;
      // console.log("theUser", this.$root.localStorage);
    },
    mounted() {
      SelectedPageService.getInstance().selectedPage$
        .subscribe((selectedPage) => this.selectedPage = selectedPage);
    },
    data() {
      return {
        Home: Home,
        Inventory: Inventory,
        Suppliers: Suppliers,
        Roles: Roles,
        Users: Users,
        Featured: Featured,
        Search: Search,
        Settings: Settings,
        Delivery: Delivery,
        Sales: Sales,
        Logout: Logout,
        selectedPage: ""
      };
    },
    components: {
      Home,
      Inventory,
      Suppliers,
      Roles,
      Users,
      Featured,
      Search,
      Settings,
      Delivery,
      Sales,
      Logout
    },
    methods: {
      onNavigationItemTap(component) {
        this.$navigateTo(component, {
          clearHistory: true
        });
        utils.closeDrawer();
      },
      logout(component){
        // this.$root.localStorage = null;
        

        this.$navigateTo(component, {
          clearHistory: true
        });
        utils.closeDrawer();
        
      }
    },
    
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
    .banner {
      border-radius: 0 0 30 0;
    }
</style>
