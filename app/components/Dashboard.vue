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
                                    <!-- <Label
                                        col="2"
                                        class="fas p-20"
                                        :text=" 'fa-ellipsis-v' | fonticon "
                                        horizontalAlignment="right" 
                                    /> -->
                                </GridLayout>
                                </StackLayout>

                            <!-- counters/pills-->  
                                <GridLayout class="m-r-10 m-l-10" row="1" columns="*,*">
                                    <GridLayout class="bg-pill" col="0">
                                        <Label 
                                            horizontalAlignment="center"
                                            class="header-title"
                                            text="Inventory" />
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
      }
    },
    async created(){
        this.showLoading = true;
        this.blur = true;

        

        // get inventory items
        await axios.get(this.$root.server+`/inventory`)
        .then(inventory => {
        this.$root.inventory = inventory.data
        console.log("inventory: ", this.$root.inventory);
        console.log("==============================");
        })
        .catch(err => console.log(error));

        // get roles
        await axios.get(this.$root.server+`/roles`)
        .then(role => {
          this.$root.roles = role.data
          console.log("roles: ", this.$root.roles);
          console.log("==============================");
        })
        .catch(err => console.log(err));

        // get suppliers
        await axios.get(this.$root.server+`/supplier`)
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
        await axios.get(this.$root.server+`/delivery_item/all`)
        .then(delivery => {
          this.$root.delivery = delivery.data
          console.log("delivery: ", this.$root.delivery);
          console.log("==============================");
        })
        .catch(err => console.log(err)); 


        // get sales
        await axios.get(this.$root.server+`/viewsales`)
        .then(sale => {
          this.$root.sales = sale.data
          console.log("sales: ", this.$root.sales);
          console.log("==============================");
        })
        .catch(err => console.log(err));

        this.showLoading = false;
        this.blur = false;


    },
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Users");
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
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
    .dash-bg-top {
        background-image: linear-gradient(to top right,
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
        // margin-top: 50;
        // opacity: 0.3;
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
