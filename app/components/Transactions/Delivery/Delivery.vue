<template>
    <Page class="page" actionBarHidden="true">
      <GridLayout class="page__content">

        <GridLayout>
            <GridLayout class="bg-back">
            </GridLayout>
        </GridLayout>

        <GridLayout rows="auto,auto,*">

          <GridLayout>
            <StackLayout class="m-t-25">
              <GridLayout class="m-b-20" row="0" columns="*,auto,*">
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
                      text="DELIVERY"
                      horizontalAlignment="center"
                  />
                  <!-- <Label
                      col="2"
                      class="fas p-20"
                      fontSize="16"
                      color="white"
                      :text=" 'fa-ellipsis-v' | fonticon "
                      horizontalAlignment="right" 
                  /> -->
              </GridLayout>
            </StackLayout>
          </GridLayout>

          <GridLayout row="1" columns="*,*">
            <Label
              col="0"
              class="fas p-20"
              fontSize="16"
              color="white"
              :text=" 'fa-sort-alpha-up' | fonticon " 
              horizontalAlignment="left"
            />
            <Label
              col="1"
              class="fas p-20"
              fontSize="16"
              color="white"
              :text=" 'fa-filter' | fonticon "
              horizontalAlignment="right" 
            />
          </GridLayout>
          <GridLayout row="2">
            <StackLayout ref="inventoryList">

                <ListView row="1" class="list-group" height="670"
                separatorColor="transparent"
                  for="d in $root.delivery" >
                    <v-template>
                      <StackLayout >
                        <GridLayout 
                          class="list-box" 
                          rows="auto,*,*"
                          @tap="show(d)"
                          androidElevation="5"
                          columns="*,auto">
                            <Label row="0" col="0"  
                              :text="d.dr_no" />
                            <Label row="0" col="1" 
                              horizontalAlignment="right"
                              :text="new Date(d.transaction_date).toDateString().split(' ').slice(1).join(' ')" />
                            <Label row="1" col="0" 
                              fontSize="15"
                              fontWeight="bold"
                              :text="d.supplier_name"
                              textWrap="true" />
                            <Label row="2" col="0" 
                              fontSize="15"
                              fontWeight="bold"
                              :text=" '₱'+d.total_cost" />
                            <Label row="1" col="1" rowSpan="2"
                              class="fas p-20"
                              fontSize="16"
                              color="#05C5AA"
                              horizontalAlignment="right"
                              :text=" 'fa-chevron-right' | fonticon " />
                        </GridLayout>
                      </StackLayout>
                    </v-template>

                </ListView>

            </StackLayout>
              
          </GridLayout>
        </GridLayout>

        <GridLayout class="fabbtn">
            <Button 
              class="fas floatingbutton" 
              :text=" 'fa-plus' | fonticon " 
              fontSize="19"
              color="white"
              @tap="onButtonTap()" />
        </GridLayout>

        <GridLayout v-show="blur" class="blur">
        </GridLayout>

        <ActivityIndicator :busy="showLoading" color="#05C5AA" class="indLog" />

        

      


      </GridLayout>

    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../../../shared/selected-page-service";
  import ShowDetails from "./ShowDetails.vue";
  import receive from "./add";
  import axios from "axios";

  export default {
    data(){
      return {
        showLoading: false,
        blur: false
      }
    },

    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Delivery");
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
      onButtonTap(){
        this.$navigateTo(receive);
      },
      show(del){
        this.$navigateTo(ShowDetails, {
          props: {
            // details: del
            dr_no: del.dr_no,
            supplier_name: del.supplier_name,
            // company_name: del.company_name,
            // company_address: del.company_address,
            dtransaction_date: del.dtransaction_date,
            total_cost: del.total_cost,
            items: del.items
          },
          transition: "slideLeft"
        })
        console.log("clicked!", del);
      },
      confirm(){
        console.log("button clicked");
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
      background: #f5f5f5;
    }

    .blur {
        background-color: #05C5AA;
        opacity: 0.5
    }

    .bg-back {
      background-color: #05C5AA;
      border-radius: 0 0 60 60;
      margin-bottom: 530;
    }

    .list-box {
      background-color: #ffffff;
      color: #009688;
      padding: 10;
      margin: 5;
      border-radius: 20;
    }

    
</style>
