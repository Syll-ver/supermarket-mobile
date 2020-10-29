<template>
    <Page class="page" actionBarHidden="true">
      

      <GridLayout class="page__content">
        <GridLayout class="sales-bg">
        </GridLayout>
        <GridLayout rows="auto,auto,auto,auto,auto">
          <GridLayout>
            <StackLayout class="m-t-25">
              <GridLayout row="0">
                  <GridLayout rows="auto,auto" columns="auto,*">
                    <Label
                        row="0" col="0"
                        class="fas p-t-20 p-l-20 p-r-20"
                        fontSize="16"
                        color="#009688"
                        :text=" 'fa-chevron-left' | fonticon "
                        horizontalAlignment="left"
                        @tap="onButtonTap"
                    />
                    <Label
                        row="0" col="1"
                        class="p-t-20 p-r-20"
                        fontSize="16"
                        fontWeight="bold"
                        color="#009688"
                        text=" DELIVERY "
                        horizontalAlignment="left"
                    />
                    <Label
                        row="1"
                        class="p-l-20"
                        fontSize="16"
                        fontWeight="bold"
                        color="#009688"
                        text=" Transaction Details " 
                        horizontalAlignment="left"
                    />
                  </GridLayout>
              </GridLayout>
            </StackLayout>
          </GridLayout>
          <GridLayout  row="1">
              <GridLayout 
                class="bg-pill" 
                rows="*,*,*"
                androidElevation="5" >
                <GridLayout rows="auto,auto" columns="*,*">
                  <Label row="0" col="0" 
                    color="white"
                    :text=" ' OR No: ' +delivery.dr_no" 
                    fontSize="13"
                    textWrap="true"
                    horizontalAlignment="left" />
                  <Label row="0" col="1" 
                    color="white"
                    fontSize="13"
                    :text="new Date(delivery.transaction_date).toDateString().split(' ').slice(1).join(' ')"
                    textWrap="true"
                    horizontalAlignment="right" />
                    <GridLayout
                      row="1">
                        <Label
                          paddingBottom="15"
                          paddingTop="15"
                          :text="delivery.supplier_name"
                          fontSize="14"
                          fontWeight="bold"
                          textWrap="true"
                          horizontalAlignment="left" />
                    </GridLayout>
                </GridLayout>

              </GridLayout>
          </GridLayout>
          <GridLayout row="2" columns="*,*">
              <Label col="0"
                class="p-l-20"
                fontSize="16"
                fontWeight="bold"
                color="#009688"
                text="Items"
                horizontalAlignment="left" />
              <!-- <Label col="1" 
                class="p-r-20"
                fontSize="16"
                fontWeight="bold"
                color="black"
                v-model="delivery.total_cost"
                horizontalAlignment="right" /> -->
          </GridLayout>
          <GridLayout 
            class="itemdetails-pill"
            row="3"
            padding="20">
              <ListView row="1" class="list-group" 
                height="380"
                separatorColor="transparent"
                for="inv in delivery.items" >
                    <v-template>
                      <GridLayout >
                        <GridLayout 
                          class="item-pill"
                          rows="auto,auto"
                          columns="2*,*"
                          androidElevation="5" >
                            <Label row="0" col="0" 
                              fontSize="14"
                              :text="inv.product_description"
                              textWrap="true" />
                            <Label row="1" col="0" 
                              fontSize="14"
                              fontWeight="bold"
                              color="#05C5AA"
                              :text="(inv.unit_cost)" />
                            <GridLayout 
                              row="0" col="1" 
                              rowSpan="2"
                              backgroundColor="#7ac5be" 
                              borderRadius="20"
                              alignItems="center" >
                            <Label row="1" col="0" 
                              fontSize="14"
                              fontWeight="bold"
                              :text="inv.quantity"
                              horizontalAlignment="center"
                              paddingTop="20" />
                            </GridLayout>

                          </GridLayout>
                      </GridLayout>

                    </v-template>

              </ListView>

          </GridLayout>
          <GridLayout row="4">
            <GridLayout marginBottom="20">
              <Label 
                fontSize="15"
                fontWeight="bold"
                marginTop="10"
                marginRight="70"
                horizontalAlignment="right"
                :text=" 'Total Cost: P'+(delivery.total_cost)" />

            </GridLayout>
          </GridLayout>
        </GridLayout>
          
      </GridLayout>
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../../../shared/selected-page-service";
  import axios from "axios";
  import parent from './Delivery';

  export default {
    props: [
        'dr_no',
        'supplier_name',
        'dtransaction_date',
        'total_cost',
        'items'
    ],
    data(){
      return {
        delivery: {
          dr_no: this.dr_no,
          supplier_name: this.supplier_name,
          // company_name: this.company_name,
          // company_address: this.company_address,
          dtransaction_date: this.dtransaction_date,
          total_cost: this.total_cost,
          items: this.items
          
        },
        inventoryList: {},

      }
    },
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("ShowDetails");
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
        this.$navigateTo(parent);
      },
    }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
    .sales-bg {
      background-color: #7ac5be;
      margin-top: 200;
      margin-bottom: 70;
      border-radius: 250 0 50 50;
    }

    .bg-pill {
      background-color: #05c5aa;
      margin: 5 30 30 30;
      border-radius: 15;
      padding: 20 20 20 20;
    }

    .item-pill {
      background-color: white;
      margin-left: 20;
      margin-right: 20;
      
      padding: 15;
      border-radius: 20;
    }

    .additem {
      // background-color: white;
      color: #05c5aa;
      font-size: 40;
      padding: 10 20 5 10;
      margin-right: 15;
      box-shadow: none;
    }

    
    
</style>




