<template>
    <Page class="page">
      <ActionBar class="action-bar banner" flat="true">
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
          <Label class="action-bar-title titles" text="Inventory"/>
      </ActionBar>

      <GridLayout class="page__content">
          <!-- <Label class="page__content-icon fas" text.decode="&#xf015;"/> -->
          <!-- <Label class="page__content-placeholder" :text="message"/> -->
          <StackLayout ref="inventoryList">

            <!-- <StackLayout for="del in delivery">
                <v-template>
                  <Label :text="del.dr_no" textWrap="true" />
                </v-template>
                
            </StackLayout> -->
                
                <ListView row="1" class="list-group" height="670"
                separatorColor="transparent"
                  for="item in inventory" >
                    <v-template>
                      <GridLayout >
                        <GridLayout rows="*,*,*" columns="*,auto">
                          <!-- <Label horizontalAlignment="right" class="text-sub sub-header">
                            <FormattedString>
                              <Span text="₱" />
                              <Span :text="del.total_cost" />
                            </FormattedString>
                          </Label> -->

                          <StackLayout row="1" class="content">
                            <GridLayout rows="*,*" columns="*,auto">
                              <Label row="0" col="0" :text="item.barcode +' - '+ item.product_description" textWrap="true" ></Label>
                              <Label row="0" col="1" :text="'Quantity: '+item.qty"></Label>
                              <Label row="1" col="0" :text="'Unit Cost: '+item.unit_cost"></Label>
                              <Label row="1" col="1" :text="'Sales Cost: '+item.sales_cost"></Label>
                            </GridLayout>

                          </StackLayout>
                        </GridLayout>

                      </GridLayout>

                          
                          
                      <!-- </GridLayout> -->
                    </v-template>

                </ListView>

            </StackLayout>


        <GridLayout class="fabbtn">
            <Button class="floatingbutton" text="button" @tap="onButtonTap" ></Button>
        </GridLayout>
        <GridLayout rows="auto,auto" column="auto,auto" class="childbtn" v-show="floatbutton">
            <Button row="0" col="1" class="floatingbutton1" id="fbutton1" text="1" />
            <Button row="1" col="0" class="floatingbutton2" id="fbutton2" text="2" />
        </GridLayout>

        

      </GridLayout>

      
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../shared/selected-page-service";
  import { View, ViewBase } from "@nativescript/core/ui/frame";

  export default {
    data(){
      return {
        inventory: [
            {
            inventory_code: 1,
            barcode: 15304218,
            product_description: "Churned Milk 1kg",
            qty: 20,
            unit_cost: 112.5,
            sales_cost: 120,
            created_by: 153,
            created_at: "May 02, 2020",
            updated_by: null,
            updated_at: null
            },
            {
            inventory_code: 2,
            barcode: 51404209,
            product_description: "Cadbury 65g",
            qty: 50,
            unit_cost: 76.75,
            sales_cost: 85,
            created_by: 153,
            created_at: "May 02, 2020",
            updated_by: null,
            updated_at: null
            },
            {
            inventory_code: 3,
            barcode: 11443366,
            product_description: "Dairy Meelk 250mL",
            qty: 35,
            unit_cost: 89.6,
            sales_cost: 95.50,
            created_by: 153,
            created_at: "May 02, 2020",
            updated_by: null,
            updated_at: null
            },
            {
            inventory_code: 1,
            barcode: 15304218,
            product_description: "Churned Milk 1kg",
            qty: 20,
            unit_cost: 112.5,
            sales_cost: 120,
            created_by: 153,
            created_at: "May 02, 2020",
            updated_by: null,
            updated_at: null
            },
            {
            inventory_code: 2,
            barcode: 51404209,
            product_description: "Cadbury 65g",
            qty: 50,
            unit_cost: 76.75,
            sales_cost: 85,
            created_by: 153,
            created_at: "May 02, 2020",
            updated_by: null,
            updated_at: null
            },
            {
            inventory_code: 3,
            barcode: 11443366,
            product_description: "Dairy Meelk 250mL",
            qty: 35,
            unit_cost: 89.6,
            sales_cost: 95.50,
            created_by: 153,
            created_at: "May 02, 2020",
            updated_by: null,
            updated_at: null
            },
            {
            inventory_code: 4,
            barcode: 12196864,
            product_description: "Hershey's Chocs 65g",
            qty: 55,
            unit_cost: 82.25,
            sales_cost: 86.50,
            created_by: 153,
            created_at: "May 02, 2020",
            updated_by: null,
            updated_at: null
            },
            {
            inventory_code: 5,
            barcode: 53170036,
            product_description: "Oreo Cookies",
            qty: 60,
            unit_cost: 54.75,
            sales_cost: 60,
            created_by: 153,
            created_at: "May 02, 2020",
            updated_by: null,
            updated_at: null
            },
            {
            inventory_code: 4,
            barcode: 12196864,
            product_description: "Hershey's Chocs 65g",
            qty: 55,
            unit_cost: 82.25,
            sales_cost: 86.50,
            created_by: 153,
            created_at: "May 02, 2020",
            updated_by: null,
            updated_at: null
            },
            {
            inventory_code: 5,
            barcode: 53170036,
            product_description: "Oreo Cookies",
            qty: 60,
            unit_cost: 54.75,
            sales_cost: 60,
            created_by: 153,
            created_at: "May 02, 2020",
            updated_by: null,
            updated_at: null
            },
            {
            inventory_code: 6,
            barcode: 18773694,
            product_description: "Muck n Cheez",
            qty: 40,
            unit_cost: 98.15,
            sales_cost: 110,
            created_by: 153,
            created_at: "May 02, 2020",
            updated_by: null,
            updated_at: null
            }
        ],
        floatbutton: false,        
      }
    },
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Inventory");
      // const thisBtn = this.$refs.fchildbtn.nativeView
      // let body = this.$refs.body
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
      onButtonTap() {
        // console.log("fab button clicked");
        if(this.floatbutton){
          this.floatbutton = false;
        } else {
          this.floatbutton = true;
        }
        
      },

      
    }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles

    
</style>
