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
          <Label class="action-bar-title titles" text="LouGeh Supermarket"/>
      </ActionBar>

      <GridLayout class="page__content">
          <!-- <Label class="page__content-icon fas" text.decode="&#xf015;"/> -->
          <!-- <Label class="page__content-placeholder" :text="message"/> -->
          <StackLayout>

            <!-- <StackLayout for="del in delivery">
                <v-template>
                  <Label :text="del.dr_no" textWrap="true" />
                </v-template>
                
            </StackLayout> -->
                
                <!-- <ScrollView> -->
                    <StackLayout>
                        <!-- working -->
                        <Label :text="$props.dr_no"></Label>
                        {{ $props.dr_no }}
                        <Label :text="$props.company_name"></Label>
                        <Label :text="$props.company_address"></Label>
                        <!-- <Label :text="$props.items[0].product_description"></Label> -->
                        <Label text="Items: "></Label>
                        <ListView row="1" for="item in $props.items">
                          
                          <v-template>
                            <!-- {{item}} -->
                           
                              <StackLayout row="1" class="content">
                                <Label :text="item.barcode"></Label>
                                <Label :text="item.product_description"></Label>
                                <Label :text="item.qty"></Label>
                                <Label :text="item.unit_cost"></Label>
                              </StackLayout>
                            
                          </v-template>
                        </ListView>

                        <!-- <GridLayout for="item in $props.items">
                            <Label :text="item.barcode"></Label>
                        </GridLayout> -->

                        

                        
                    </StackLayout>
                <!-- </ScrollView> -->

                <!-- <ListView row="1" class="list-group"
                  for="del in delivery" >
                    <v-template>
                      <GridLayout @tap="show(del)">
                        <GridLayout rows="*,*,*" columns="*,auto">
                          <Label class="text-sub sub-header" :text="del.dr_no" textWrap="true" />
                          <Label col="1" horizontalAlignment="right" class="text-sub sub-header">
                            <FormattedString>
                              <Span text="₱" />
                              <Span :text="del.total_cost" />
                            </FormattedString>
                          </Label>

                          <StackLayout row="1" class="content">
                            <Label class="text-main" :text="del.company_name" textWrap="true" ></Label>
                            <Label :text="del.company_address"></Label>
                          </StackLayout>
                        </GridLayout>
                      </GridLayout> -->


                      <!-- <GridLayout rows="auto,*,*" columns="*,*,auto"
                        class="list-group">
                          <Label row="1" col="1" class="text-main" :text="del.company_name" textWrap="true" />
                          <Label row="2" col="1" class="text-sub" :text="del.dtransaction_date" textWrap="true" />
                          
                          
                      </GridLayout> -->
                    <!-- </v-template> -->

                <!-- </ListView> -->

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
        'dr_no',
        'supplier_id',
        'company_name',
        'company_address',
        'dtransaction_date',
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
