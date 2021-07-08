<template>
    <Page class="page" actionBarHidden="true">

      <GridLayout class="page__content">
          
          <StackLayout>
            <GridLayout>
                <GridLayout rows="*,auto,*">
                  <GridLayout class="dash-bg-top" row="0">
                    <GridLayout rows="auto,*" opacity="1">
                        <!-- drawer button, lougeh supermarket brand name -->
                      <StackLayout class="m-t-25">
                        <GridLayout row="0" columns="*,auto,*">
                          <Label
                            col="0"
                            class="fas p-20"
                            fontSize="16"
                            color="white"
                            :text=" 'fa-bars' | fonticon "
                            horizontalAlignment="left"
                            @tap="onDrawerButtonTap"
                          />
                          <Label
                            col="1"
                            class="brand-name"
                            text="LOUGEH SUPERMARKET"
                            horizontalAlignment="center"
                          />
                        </GridLayout>
                      </StackLayout>

                      <!-- counters/pills-->  
                      <GridLayout class="m-r-10 m-l-10" row="1" columns="*,*">
                        <GridLayout class="bg-pill" col="0">
                          <Label 
                            horizontalAlignment="center"
                            class="header-title"
                            text="Delivery Transaction" />
                        </GridLayout>
                        <GridLayout class="bg-pill" col="1">
                          <Label
                            horizontalAlignment="center"
                            class="header-title" 
                            text="Suppliers" />
                        </GridLayout>
                      </GridLayout>
                        
                    </GridLayout>
                  </GridLayout>
                  <GridLayout row="1" >
                      <Label class="stock-title header-title" text="Low on stock" />
                  </GridLayout>
                  <GridLayout class="dash-bg-bottom" row="2">
                  </GridLayout>
                </GridLayout>
            </GridLayout>

            </StackLayout>

        <GridLayout v-show="blur" class="blur">
        </GridLayout>

        <ActivityIndicator :busy="showLoading" color="#05C5AA" class="indLog" />

 

      </GridLayout>
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../shared/selected-page-service";
  import axios from "axios";

  export default {
    data(){
      return {
        showLoading: false,
        blur: false,
        listCompany: [],
      }
    },
    async created(){
        this.showLoading = true;
        this.blur = true;

        // get delivery transactions
        // await axios.post(this.$root.server+`/admin/companies`)
        await axios({
          method: "POST",
          url: this.$root.server+`admin/companies`,
          headers: {
            Authorization: this.$root.localStorage.SessionId,
          },
          data: this.$root.localStorage.user_actions,
          proxy: {
            host: '172.16.1.6',
            port: 3128
          }
        }).then( res => {
          console.log("=======================================================",res);
          if(this.res.data.companies) {
            this.listCompany = res.data.companies
          }
          this.showLoading = false;
          this.blur = false;
          // if (res && res.name == "Error") {
          //   if (res.response && res.response.data.errorMsg) {
          //     if (res.response.data.errorMsg === "Invalid session.") {
          //       this.$bvModal.show("session_modal");
          //     }
          //     if (res.response.data.errorMsg === "Session restore error.") {
          //       this.$bvModal.show("session_modal");
          //     }
          //   }
          // }
        })


    },
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Dashboard");
    },
    computed: {
      message() {
        return "<!-- Page content goes here -->";
      }
    },
    methods: {
      onDrawerButtonTap() {
        utils.showDrawer();
      },
      creatingView: function(args) {
        const nativeView = new android.widget.TextView(args.context);
        nativeView.setSingleLine(true);
        nativeView.setEllipsize(android.text.TextUtils.TruncateAt.END);
        nativeView.setText("Native View - Android");
        args.view = nativeView;
      },
      
    }
  };
</script>

<style scoped lang="scss">
  @import '~@nativescript/theme/scss/variables/blue';

  // Custom styles
  .dash-bg-top {
    background-image: 
      linear-gradient(to top right,
      rgb(5, 197, 170),
      rgb(184, 255, 234));
    // padding: up-right-down-left
    border-radius: 0 0 0 50;
      // opacity: 0.4;
  }

  .dash-bg-bottom {
    background-image: linear-gradient(to top right, 
    #b6ffe9, 
    #05c5aa);
    border-radius: 50 0 0 0;
  }

  .bg-pill {
    background-color: #ffffff;
    margin: 30 30 30 30;
    border-radius: 15;
  }

  .header-title {
    font-size: 15;
    font-weight: bold;
    color: #05c5aa;
    padding: 5;
    text-transform: uppercase;
  }

  .stock-title {
    margin: 20 0 5 30;
  }
    
</style>
