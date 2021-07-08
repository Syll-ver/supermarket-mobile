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
  import Dashboard from "./Admin/Inventory/Inventory";
  import axios from 'axios';

  export default {
    data(){
      return {
        isLoggingIn: true,
        user: {
          username: "admin",
          password: 1234,
        },
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
        if(this.user.username != "" || this.user.password != "") {
          this.activityIndicator = "Logging in..."

          await axios({
            method: "POST",
            url: this.$root.server+`/login`,
            data: {
              username: this.user.username,
              password: this.user.password
            }
          }).then(result => {
            console.log(result);

            this.$root.localStorage.username = this.user.username;
            this.$root.localStorage.user_details = JSON.stringify(result.data.user_details);
            this.$root.localStorage.user_role = JSON.stringify(result.data.user_role);
            this.$root.localStorage.user_actions = JSON.stringify(result.data.user_actions);
            this.$root.localStorage.SessionId = result.data.SessionId;
            console.log(this.$root.localStorage);
            this.$navigateTo(Dashboard);
          })
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
