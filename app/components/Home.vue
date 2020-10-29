<template>
    <Page class="" actionBarHidden="true">
      <GridLayout class="page">
        <GridLayout class="form">
            <!-- <Label text="LouGeh Supermarket" class="titles logo" /> -->

            

            <StackLayout class="login">

              <StackLayout>
                <Label class="app-title" text="Lou Geh" />
                <Label class="app-subtitle" text="Supermarket" />
              </StackLayout>

              <TextField class="login-input" hint="Username" maxLength="10" keyboardType="email" v-model="user.username" />
              <TextField class="login-input" secure="true" hint="Password" v-model="user.password" />
              
              <Button text="Login" class="login-button btn" @tap="logme()"  />
            </StackLayout>

        </GridLayout>

        
        <!-- <GridLayout class="fab-btn">
          <Button class="fab" text="+" @tap="onButtonTap" />
        </GridLayout> -->

        
      <ActivityIndicator :busy="showLoading" color="#05C5AA" class="indLog" />

      </GridLayout>
      

    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../shared/selected-page-service";
  import Dashboard from "./Admin/Inventory/Inventory";
  import Delivery from "./Transactions/Delivery/Delivery";
  import Sales from "./Transactions/Sales/Sales";
  import axios from 'axios';
  import { mapActions } from 'vuex';

  export default {
    data(){
      return {
        isLoggingIn: true,
        user: {
          username: "",
          password: "",
        },
        inventory: [],
        showLoading: false,
        Dashboard: Dashboard
      }
    },
    components: {
      Dashboard
    },
    mounted() {
      // SelectedPageService.getInstance().updateSelectedPage("Home");
    },
    computed: {
      message() {
        return "<!-- Page content goes here -->";
      }
    },
    methods: {

        async logme(){
          if(this.user.username != null && this.user.password != null){
            this.showLoading = true;
          await axios({
            method: "POST",
            url: this.$root.server+`/new/login`, 
            header: {
                "Content-Type": "application/json"
            },
            data: { ...this.user },
            }).then(result => {

              if(result.data == this.user.username){
                this.showLoading = false;

                axios.get(this.$root.server+`/users`)
                .then(role => {
                  this.$root.users = role.data

                  for(var i = 0; i < this.$root.users.length; i++){
                  if(result.data == this.$root.users[i].username){
                    this.$root.localStorage = this.$root.users[i];
                  }
                }

                console.log("local storage",this.$root.localStorage);
                  console.log("users: ", this.$root.users);
                  console.log("==============================");


        

              // get inventory items
              axios.get(this.$root.server+`/inventory`)
              .then(inventory => {
              this.$root.inventory = inventory.data
              console.log("inventory: ", this.$root.inventory);
              console.log("==============================");
              })
              .catch(err => console.log(error));

              // get roles
              axios.get(this.$root.server+`/roles`)
              .then(role => {
                this.$root.roles = role.data
                console.log("roles: ", this.$root.roles);
                console.log("==============================");
              })
              .catch(err => console.log(err));

              // get suppliers
              axios.get(this.$root.server+`/supplier`)
              .then(supplier => {
                this.$root.suppliers = supplier.data
                console.log("suppliers: ", this.$root.roles);
                console.log("==============================");
              })
              .catch(err => console.log(error));

              // get users
              // await axios.get(this.$root.server+`/users`)
              // .then(role => {
              //   this.$root.users = role.data
              //   console.log("users: ", this.$root.users);
              //   console.log("==============================");
              // })
              // .catch(err => console.log(err));


              // get delivery
              axios.get(this.$root.server+`/delivery_item/all`)
              .then(delivery => {
                this.$root.delivery = delivery.data
                console.log("delivery: ", this.$root.delivery);
                console.log("==============================");
              })
              .catch(err => console.log(err)); 


              // get sales
              axios.get(this.$root.server+`/viewsales`)
              .then(sale => {
                this.$root.sales = sale.data
                console.log("sales: ", this.$root.sales);
                console.log("==============================");
              })
              .catch(err => console.log(err));

              this.showLoading = false;

                if(this.$root.localStorage.role_name == 'admin' ){
                  this.$navigateTo(Dashboard);
                } else if(this.$root.localStorage.role_name == 'custodian' ){
                  this.$navigateTo(Delivery);
                } else if(this.$root.localStorage.role_name == 'cashier' ){
                  this.$navigateTo(Sales);
                }

                })
                .catch(err => console.log(err));

                
              }

            })
          } else {
            console.log("no credentials");
          }

        }

    }
      
    
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles

  

	.page {
		align-items: center;
		// flex-direction: column;
	}

	.form {
		
		flex-grow: 2;
		vertical-align: middle;
	}

	.logo {

		align-items: center;
		font-weight: bold;
  }

  .title-form {
    align-items: center;
  }

  .app-title {
    align-items: center;
    // border-width: 1 1 1 1;
    text-align: center;
    text-transform: uppercase;
    font: 20;
    // padding-left: 150;
  }

  .app-subtitle {
    align-items: center;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 10;
    // padding-left: 150;
  }
  
  .login {
    align-content: center;
    align-items: center;
    padding-left: 40;
    padding-right: 40;
  }

  .login-input {
    background-color: #e4e4e4;
    border-radius: 15;
    padding-left: 15;
    text-decoration: none;
    font-size: 13;
    border-bottom-color: transparent;
  }

  .login-button {
    margin: 10;
    text-transform: uppercase;
    height: 30;
    width: 280;
    color: aliceblue;
    font-weight: bold;
    // background-color: #e4e4e4;
    border-radius: 20;
  }
    
</style>
