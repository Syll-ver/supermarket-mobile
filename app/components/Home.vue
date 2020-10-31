<template>
    <Page class="" actionBarHidden="true">
      <GridLayout class="page">
        <GridLayout class="form">
            <!-- <Label text="LouGeh Supermarket" class="titles logo" /> -->

            

            <StackLayout class="login">

              <StackLayout>
                <Label 
                  class="app-title" 
                  text="Lou Geh" />
                <Label class="app-subtitle" text="Supermarket" />
              </StackLayout>

              <TextField v-bind:class=" [ inputUname == true ? 'login-input' : 'redBorder' ]"  maxLength="10" keyboardType="email" v-model="user.username" />
              <TextField v-bind:class=" [ inputPass == true ? 'login-input' : 'redBorder' ]" secure="true" v-model="user.password" />
              
              <Button text="Login" class="login-button btn" @tap="logme()"  />
            </StackLayout>

        </GridLayout>

        
        <!-- <GridLayout class="fab-btn">
          <Button class="fab" text="+" @tap="onButtonTap" />
        </GridLayout> -->

         
      <GridLayout 
        v-show="showLoadingBG"
        class="activityIndicatorBg">
        <GridLayout 
          rows="*,auto"
          class="activityIndicator" >
            <ActivityIndicator 
              row="0"
              :busy="showLoading" 
              color="#05C5AA" 
              class="indLog"
              horizontalAlignment="center" />
            <Label 
              row="1"
              color="#05C5AA"
              fontSize="14"
              horizontalAlignment="center"
              v-model="this.activityIndicator" />
        </GridLayout>
      </GridLayout>

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
          username: "Admin",
          password: "emp",
        },
        inventory: [],
        showLoading: false,
        showLoadingBG: false,
        activityIndicator: "",
        Dashboard: Dashboard,
        inputUname: true,
        inputPass: true
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

            

          if((this.user.username != "") && 
          (this.user.password != "")){
            this.inputUname = true;
            this.inputPass = true;
            this.showLoadingBG = true;
            this.showLoading = true;
            this.activityIndicator = "Logging in..."
            
          await axios({
            method: "POST",
            url: this.$root.server+`/new/login`, 
            header: {
                "Content-Type": "application/json"
            },
            data: { ...this.user },
            }).then(result => {

              console.log("here", result);

              if(result.data == this.user.username){
                // this.showLoading = false;

                this.activityIndicator = "Fetching users..."

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


                this.activityIndicator = "Fetching inventory items..."        

                // get inventory items
                axios.get(this.$root.server+`/inventory`)
                .then(inventory => {
                this.$root.inventory = inventory.data
                console.log("inventory: ", this.$root.inventory);
                console.log("==============================");
                })
                .catch(err => console.log(error));

                this.activityIndicator = "Fetching roles..."

                // get roles
                axios.get(this.$root.server+`/roles`)
                .then(role => {
                  this.$root.roles = role.data
                  // console.log("roles: ", this.$root.roles);
                  // console.log("==============================");
                })
                .catch(err => console.log(err));

                  this.activityIndicator = "Fetching suppliers..."

                // get suppliers
                axios.get(this.$root.server+`/supplier`)
                .then(supplier => {
                  this.$root.suppliers = supplier.data
                  // console.log("suppliers: ", this.$root.roles);
                  // console.log("==============================");
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

                  this.activityIndicator = "Fetching transactions..."

                // get delivery
                axios.get(this.$root.server+`/delivery_item/all`)
                .then(delivery => {
                  this.$root.delivery = delivery.data
                  // console.log("delivery: ", this.$root.delivery);
                  // console.log("==============================");
                })
                .catch(err => console.log(err)); 

                  this.activityIndicator = "Almost there..."

                // get sales
                axios.get(this.$root.server+`/viewsales`)
                .then(sale => {
                  this.$root.sales = sale.data
                  // console.log("sales: ", this.$root.sales);
                  // console.log("==============================");
                })
                .catch(err => console.log(err));

                this.activityIndicator = "Done!"

                this.showLoading = false;
                this.showLoadingBG = false;

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
              .catch(err => {
                
                this.showLoadingBG = false;
                this.showLoading = false;
                this.activityIndicator = "";

                if(err => 'Error: Request failed with status code 401'){
                  alert('Invalid username or password')
                  .then(() => {
                    this.user.username = "";
                    this.user.password = "";
                    console.log("Alert dialog closed.");
                  });
                }
              })
          } else {
            this.showLoadingBG = false;
            this.showLoading = false;
            this.activityIndicator = "";
            console.log("no credentials");

            if(this.user.username == ""){
              this.inputUname = false;
            } else {
              this.inputUname = true;
            }

            if(this.user.password == ""){
              this.inputPass = false;
            } else {
              this.inputPass = true;
            }
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
    font: 50;
    color: #009688;

    // padding-left: 150;
  }

  .app-subtitle {
    align-items: center;
    word-spacing: 1cm;
    text-align: center;
    text-transform: uppercase;
    font-size: 20;
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

  .redBorder {
    background-color: #e4e4e4;
    border-radius: 15;
    padding-left: 15;
    text-decoration: none;
    font-size: 13;
    border-color: red;
    
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

  .activityIndicatorBg {
    background: rgba(255, 255, 255, 0.6);
    // opacity: 0.2;
  }

  .activityIndicator {
    background-color: rgba(228, 228, 228, 0.8);
    border-radius: 25;
    height: 130;
    width: 280;
    margin-top: 80;
    // opacity: 0.8;
  }
    
</style>
