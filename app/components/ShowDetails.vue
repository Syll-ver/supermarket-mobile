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
          <!-- <Label class="page__content-icon fas" text.decode="&#xf015;"/> -->
          <!-- <Label class="page__content-placeholder" :text="message"/> -->
          <StackLayout>
            <GridLayout class="m-t-25" rows="auto,auto,auto,*">
              <GridLayout row="0">
                  <Button text="button"></Button>
              </GridLayout> 

              <GridLayout row="1">
                <StackLayout class="transactions trans-details">
                  <!-- working -->
                  <Label :text="'Delivery Receipt Number: ' + $props.dr_no"></Label>
                  <Label :text="'Date: ' + $props.dtransaction_date"></Label>
                  <Label :text="'Supplier: '+ $props.company_name"  textWrap="true"></Label>
                  <Label :text="$props.company_address" fontWeight="normal" textWrap="true"></Label>
                  <!-- <Label text="Items: "></Label> -->
                </StackLayout>
              </GridLayout>

              <GridLayout class="thead" row="2">
                <StackLayout>
                  <GridLayout columns="*,*,auto">
                    <Label col="0" text="Product" />
                    <Label col="1" text="Qty" />
                    <Label col="2" text="Total" />
                  </GridLayout>
                </StackLayout>
              </GridLayout>

              <ListView row="3" class="trans-items" for="item in $props.items" separatorColor="transparent">
                <v-template>
                  <GridLayout >
                    <GridLayout  class="rtrans">
                      <GridLayout columns="*,*,auto" class="trans-pills">
                        <Label col="0" class="m-b-5" :text="item.product_description" textWrap="true" />
                        <Label col="1" class="text-sub" :text="item.qty" textWrap="true" />
                        <Label col="2" class="text-sub" :text="item.unit_cost" textWrap="true" />
                      </GridLayout>
                    </GridLayout>
                  </GridLayout>
                </v-template>
              </ListView>

              </GridLayout>
            </StackLayout>

          


      </GridLayout>
                      
                            <!-- <GridLayout columns="*,auto,auto">
                                <GridLayout col="0">
                                    <Label text="Product" />
                                </GridLayout>
                                <GridLayout col="1">
                                    <Label text="Qty" />
                                </GridLayout>
                                <GridLayout col="2">
                                    <Label text="Total" />
                                </GridLayout>
                            </GridLayout> -->

                         

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
      }
      
    }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
    .trans-details{
      margin: 20;
      border-radius: 20;
      padding: 10;
    }

    .thead {
      background-color: #B8FDDF;
      padding-top: 10;
      padding-bottom: 10;
      padding-left: 20;
      padding-right: 20;
      margin-left: 20;
      margin-right: 20;
      border-top-left-radius: 20;
      border-top-right-radius: 20;
    }

    .trans-items{
      background-color: #05C5AA;
      color: aliceblue;
      margin-left: 20;
      margin-right: 20;
      margin-bottom: 20;
      padding-left: 10;
      padding-right: 10;
      border-bottom-left-radius: 20;
      border-bottom-right-radius: 20;
      font-weight: normal;
      font-size: 13;
    }
    
</style>
