<template>
    <Page class="page">
      <ActionBar class="action-bar banner">
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
                
                <ListView row="1" class="list-group"
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
                      </GridLayout>


                      <!-- <GridLayout rows="auto,*,*" columns="*,*,auto"
                        class="list-group">
                          <Label row="1" col="1" class="text-main" :text="del.company_name" textWrap="true" />
                          <Label row="2" col="1" class="text-sub" :text="del.dtransaction_date" textWrap="true" />
                          
                          
                      </GridLayout> -->
                    </v-template>

                </ListView>

            </StackLayout>
      </GridLayout>
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../shared/selected-page-service";
  import ShowDetails from "./ShowDetails.vue";

  export default {
    data(){
      return {
        delivery: [
          {
            dtransactions_code: 1,
            dr_no: 567123,
            supplier_id: 12345681,
            company_name: "Bucks Milwaukee",
            company_address: "Po Box 141, Bettsville, OH, 44815",
            dtransaction_date: "May 02, 2020",
            total_cost: 7260,
            created_at: "may 02, 2020",
            created_by: 153,
            update_by: null,
            update_at: null,
            items: [
              {
                dtransaction_items_code: 1,
                dr_no: 567123,
                barcode: 15304218,
                product_description: "Churned Milk 1kg",
                unit_cost: 112.5,
                qty: 40
              },
              {
                dtransaction_items_code: 2,
                dr_no: 567123,
                barcode: 51404209,
                product_description: "Cadbury 65g",
                unit_cost: 76.75,
                qty: 30
              },
            ]
          },
          {
            dtransactions_code: 2,
            dr_no: 115647,
            supplier_id: 12345680,
            company_name: "TENCENT Spy Laboratory",
            company_address: "Po Box 831, Sultan, WA, 98294",
            dtransaction_date: "May 02, 2020",
            total_cost: 9742.5,
            created_at: "May 02, 2020",
            created_by: "Custody",
            update_by: null,
            update_at: null,
            items: [
              {
                dtransaction_items_code: 3,
                dr_no: 115647,
                barcode: 51404209,
                product_description: "Cadbury 65g",
                unit_cost: 165.5,
                qty: 45
              },
            ]
          },
          {
            dtransactions_code: 3,
            dr_no: 953226,
            supplier_id: 12345678,
            company_name: "Hirez Bugladins",
            company_address: "130 Shadowbrook Dr, Hillsborough, NC, 27278",
            dtransaction_date: "May 01, 2020",
            total_cost: 12544,
            created_at: "May 01, 2020",
            created_by: 153,
            update_by: null,
            update_at: null,
            items: [
              {
                dtransaction_items_code: 5,
                dr_no: 953226,
                barcode: 11443366,
                product_description: "Dairy Meelk 250mL",
                unit_cost: 89.6,
                qty: 70
              },
              {
                dtransaction_items_code: 6,
                dr_no: 953226,
                barcode: 53170036,
                product_description: "Oreo Cookies",
                unit_cost: 89.6,
                qty: 70
              },
            ]
          },
          {
            dtransactions_code: 4,
            dr_no: 665498,
            supplier_id: 12345682,
            company_name: "Beech Lasagna Corporation",
            company_address: "1631 Goehring Rd #334, New Brighton, PA, 15066",
            dtransaction_date: "April 30, 2020",
            total_cost: 6272,
            created_at: "April 30, 2020",
            created_by: "Custody",
            update_by: null,
            update_at: null,
            items: [
              {
                dtransaction_items_code: 7,
                dr_no: 665498,
                barcode: 12196864,
                product_description: "Hershey's Chocs 65g",
                unit_cost: 89.6,
                qty: 70
              }
            ]
          }
        ],
      }
    },
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Home");
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
        this.$navigateTo(ShowDetails, {
          props: {
            // details: del
            dr_no: del.dr_no,
            supplier_id: del.supplier_id,
            company_name: del.company_name,
            company_address: del.company_address,
            dtransaction_date: del.dtransaction_date,
            total_cost: del.total_cost,
            items: del.items

          }
        })
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
