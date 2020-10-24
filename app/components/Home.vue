<template>
    <Page class="" actionBarHidden="true">
      <FlexboxLayout class="page">
        <StackLayout class="form">
            <!-- <Label text="LouGeh Supermarket" class="titles logo" /> -->

            

            <StackLayout class="login">

              <StackLayout>
                <Label class="app-title" text="Lou Geh" />
                <Label class="app-subtitle" text="Supermarket" />
              </StackLayout>

              <TextField class="login-input" hint="Username" maxLength="10" keyboardType="email" v-model="user.username" />
              <TextField class="login-input" secure="true" hint="Password" v-model="user.password" />
              
              <Button text="Login" class="login-button btn" @tap="onNavigationItemTap(Dashboard)"  />
            </StackLayout>

        </StackLayout>

        
        <!-- <GridLayout class="fab-btn">
          <Button class="fab" text="+" @tap="onButtonTap" />
        </GridLayout> -->

        
      <ActivityIndicator :busy="showLoading" color="white" class="indLog" />

      </FlexboxLayout>
      

    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../shared/selected-page-service";
  import Dashboard from "./Roles";
  import axios from 'axios'
  // import ShowDetails from "./ShowDetails.vue";

  export default {
    data(){
      return {
        isLoggingIn: true,
        user: {
          username: "",
          password: "",
        },
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
      onNavigationItemTap(component) {
      //   this.showLoading = true
      //   await axios({
      //   method: "POST",
      //   url: `http://172.16.4.182:9000/new/login`,
      //   headers: {"Content-Type": "application/json"},
      //   data: {
      //     username: this.user.username,
      //     password: this.user.password
      //   }
      // })
      //   .then(result => {
      //     this.$navigateTo(Dashboard, {
      //       clearHistory: true,
      //       transition: {
      //         name: "fade",
      //         duration: 200
      //       }
      //     });
      //     this.showLoading = false;
      //     this.user = {};
      //   })
      //   .catch(err => {
      //     this.showLoading = false;

      //     if (err.response && err.response.data.errorMsg) {
      //       // TNSFancyAlert.showError(err.response.data.errorMsg);
      //       console.log(err.response.data.errorMsg);
      //     } else {
      //       // TNSFancyAlert.showError(err.message);
      //       console.log(err.message);
      //     }
      //   });

        console.log("user: ", this.user);
        // this.$navigateTo(component)
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
