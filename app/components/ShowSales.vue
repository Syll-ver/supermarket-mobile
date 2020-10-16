<template>
    <Page class="page">
      <ActionBar title="Delivery Transactions Details" class="action-bar banner">
          <!--
          Use the NavigationButton as a side-drawer button in Android
          because ActionItems are shown on the right side of the ActionBar
          -->
          <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"/>
          <!--
          Use the ActionItem for IOS with position set to left. Using the
          NavigationButton as a side-drawer button in iOS is not possible,
          because its function is to always navigate back in the application.
          -->
          <ActionItem icon="res://menu"
                      android:visibility="collapsed"
                      @tap="onDrawerButtonTap"
                      ios.position="left"/>
          <Label class="action-bar-title titles" :text="$props.receipt_no"/>
      </ActionBar>

      <GridLayout class="page__content">
          <!-- <Label class="page__content-icon fas" text.decode="&#xf015;"/> -->
          <!-- <Label class="page__content-placeholder" :text="message"/> -->
          <StackLayout v-if="trans === 'delivery'">

            <StackLayout class="text-content transactions">
              <!-- working -->
              <Label :text="'DR Number: ' + $props.receipt_no"></Label>
              <Label :text="'Date: ' + $props.date"></Label>
              <StackLayout v-if="(!name)">
                  <Label text="Walk-in Customer"  textWrap="true"></Label>
              </StackLayout>

                <StackLayout v-else>
                    <Label :text="'Customer Name: '+ $props.name"  textWrap="true"></Label>
                    <Label :text="'Customer Contact Number: '+ $props.contact"  textWrap="true"></Label>
                    <Label :text="'Customer Name: '+ $props.address"  textWrap="true"></Label>
                </StackLayout>

              
              
              <Label text="Items: "></Label>

              <ListView row="1" for="item in $props.items">
                
                <v-template>
                  <GridLayout columns="*,auto">
                    <Label row="0" col="0" horizontalAlignment="left" :text="item.qty +' ' + item.product_description + ' @' + item.sales_cost" textWrap="true"></Label>
                    <Label row="0" col="1"  :text="'₱'+(item.sales_cost*item.qty).toFixed(2)"></Label>
                  </GridLayout>
                </v-template>

              </ListView>

              <StackLayout class="hr"/>

              <Label class="transactions" horizontalAlignment="right" textWrap="true" :text="'Total Amount: ₱'+$props.total_cost"></Label>
              <Label class="transactions" horizontalAlignment="right" textWrap="true" :text="'Payment Amount: ₱'+$props.payment_amt"></Label>
              <Label class="transactions" horizontalAlignment="right" textWrap="true" :text="'Change: ₱'+($props.payment_amt-$props.total_cost).toFixed(2)"></Label>


            </StackLayout>

          </StackLayout>
      </GridLayout>
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../shared/selected-page-service";

  export default {
    props: [
        // 'details'
        'trans',
        'receipt_no',
        'name',
        'contact',
        'address',
        'date',
        'total_cost',
        'payment_amt',
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
    
</style>
