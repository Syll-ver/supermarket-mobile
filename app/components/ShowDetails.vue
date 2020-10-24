<template>
    <Page class="page" actionBarHidden="true">
      <!-- <ActionBar title="Delivery Transactions Details" class="action-bar banner">
         
          <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"/>
          
          <ActionItem icon="res://menu"
                      android:visibility="collapsed"
                      @tap="onDrawerButtonTap"
                      ios.position="left"/>
          <Label class="action-bar-title titles" :text="$props.dr_no"/>
      </ActionBar> -->

      <GridLayout class="page__content">

          <StackLayout>
            <GridLayout class="m-t-25" rows="auto,auto,*,auto">
              <GridLayout row="0" columns="*,*,*">
                <Label col="0"
                  class="fas sideicon"
                  :text=" 'fa-chevron-left' | fonticon " 
                  horizontalAlignment="left"
                  @tap="goBack()" />
                <Label col="1" class="m-t-15"
                  text="Delivery Details" textTransform="uppercase"
                  horizontalAlignment="center" />
                <Label col="2"
                  class="fas sideicon"
                  :text=" 'fa-ellipsis-v' | fonticon "
                  horizontalAlignment="right" />
              </GridLayout>

              <GridLayout row="1">
                <StackLayout>
                  <GridLayout class="thead" columns="*,auto,auto,auto">
                    <Label class="m-r-10" col="0" text="Product" />
                    <Label class="m-r-10" col="1" text="Qty" />
                    <Label class="m-r-10" col="2" text="Unit Cost" />
                    <Label col="3" text="Total Unit Cost" 
                      textWrap="true" />
                  </GridLayout>
                </StackLayout>
              </GridLayout>

              <ListView row="2" class="trans-items" for="item in $props.items" separatorColor="transparent">
                <v-template>
                  <GridLayout >
                    <GridLayout  class="rtrans">
                      <GridLayout columns="*,auto,auto,auto">
                        <Label  col="0" class="m-r-10" :text="item.product_description" textWrap="true" />
                        <Label col="1" class="m-r-10" :text="item.qty" textWrap="true" />
                        <Label col="2" class="m-r-10" :text="item.unit_cost" textWrap="true" />
                        <Label col="3" :text="(item.unit_cost*item.qty).toFixed(2)" textWrap="true" />
                      </GridLayout>
                    </GridLayout>
                  </GridLayout>
                </v-template>
              </ListView>

              </GridLayout>

            </StackLayout>


            <GridLayout class="float-details" >
              <StackLayout class="transactions trans-details">
                <GridLayout rows="auto,auto,auto,auto" columns="*,auto">
                  <Label row="0" col="0"
                  fontSize="13"
                    :text="'Delivery Receipt Number: ' + $props.dr_no" />
                  <Label row="0" col="1"
                  fontSize="13"
                    :text="$props.dtransaction_date"
                    horizontalAlignment="right" />
                  <Label row="1" col="0"
                    class="trans-details-label m-t-8"
                    color="aliceblue"
                    fontSize="13"
                    text="Supplier" />
                  <Label row="2" col="0"
                    fontSize="17"
                    :text="$props.company_name"
                    textWrap="true" />
                  <Label row="3" col="0"
                    :text="$props.company_address"
                    textWrap="true" />
                </GridLayout>
              </StackLayout>
            </GridLayout>


      </GridLayout>
                      
                            

                         

    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../shared/selected-page-service";

  export default {
    props: [
        // 'details'
        'dr_no',
        'supplier_id',
        'company_name',
        'company_address',
        'dtransaction_date',
        'total_cost',
        'items'
    ],
    data(){
      return {
        listOfItems: this.$props.items
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
      show(del){
        console.log("clicked!", del);
      },
      goBack(){
        console.log("tap me~");
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
      background-color: #B8FDDF;
    }

    .sideicon {
      background-color: #B8FDDF;
      // border-width: 1;
      padding: 20;
    }
    

    .thead {
      background-color: white;
      font-weight: bold;
      font-size: 13;
      margin-top: 80;
      padding-top: 95;
      padding-bottom: 10;
      padding-left: 20;
      padding-right: 20;
      border-top-left-radius: 50;
      border-top-right-radius: 50;
    }

    .trans-items{
      background-color: white;
      color: grey;
      padding-left: 10;
      padding-right: 10;
      font-weight: bold;
      font-size: 13;
    }

    .trans-details{
      // padding: up-right-down-left
      height: 150;
      margin: 0 20 430 20;
      padding: 20;
      border-radius: 8;
      color: white;
      font-weight: bold;
      font-size: 14;
      background-color: #05C5AA;
      
    }
    
    .shadow-down {
      height: 8;
      background: linear-gradient(to bottom, #0000001a, rgba(0,0,0, 0))
  }

    .float-details {
      align-items: center;
    }
    
</style>
