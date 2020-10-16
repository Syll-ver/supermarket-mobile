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
          <Label class="action-bar-title titles" text="Sales Transactions"/>
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
                  for="del in sales" >
                    <v-template>
                      <GridLayout @tap="show(del)">
                        <GridLayout rows="*,*,*" columns="*,auto">
                          <Label class="text-sub sub-header" :text="del.or_no" textWrap="true" />
                          <Label horizontalAlignment="right" class="text-sub sub-header">
                            <FormattedString>
                              <Span text="₱" />
                              <Span :text="del.total_cost" />
                            </FormattedString>
                          </Label>

                          <StackLayout v-if="(del.customer_name)" row="1" class="content">
                            <Label class="text-content" :text="del.customer_name" textWrap="true" ></Label>
                            <Label :text="del.customer_contact_no"></Label>
                            <Label :text="del.customer_address"></Label>
                          </StackLayout>
                          <StackLayout v-else row="1" class="text-content">
                              <Label text="Walk-in Customer"></Label>
                          </StackLayout>
                        </GridLayout>

                          <!-- <ListView for="item in del.items">
                             <v-template>
                               <Label :text="item.barcode"></Label>
                               <Label :text="item.product_description"></Label>
                             </v-template>
                          </ListView> -->

                      </GridLayout>


                      <!-- <GridLayout rows="auto,*,*" columns="*,*,auto"
                        class="list-group">
                          <Label row="1" col="1" class="text-main" :text="del.company_name" textWrap="true" />
                          <Label row="2" col="1" class="text-sub" :text="del.dtransaction_date" textWrap="true" />
                          
                          
                      </GridLayout> -->
                    </v-template>

                </ListView>

            </StackLayout>

        <!-- <ActivitiIndicator busy="{{ isLoading }}" /> -->

      </GridLayout>
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../shared/selected-page-service";
  import ShowSales from "./ShowSales.vue";

  export default {
    data(){
      return {
        sales: [
            {
            stransactions_code: 1,
            or_no: 32456789,
            stransaction_date: "May 02, 2020",
            total_cost: 403.95,
            payment_amt: 500.0,
            customer_name: null,
            customer_address: null,
            customer_contact_no: null,
            created_at: "May 02, 2020",
            created_by: "3",
            items: [
                {
                stransaction_items_code: 1,
                or_no: 32456789,
                barcode: 18773694,
                product_description: "Muck n Cheez",
                qty: 3,
                sales_cost: 98.15
                },
                {
                stransaction_items_code: 2,
                or_no: 32456789,
                barcode: 53170036,
                product_description: "Oreo Cookies",
                qty: 2,
                sales_cost: 54.75
                },
            ]
            },
            {
            stransactions_code: 1,
            or_no: 32456789,
            stransaction_date: "May 02, 2020",
            total_cost: 403.95,
            payment_amt: 500.0,
            customer_name: "Sirius Black",
            customer_address: "Azkaban Prison",
            customer_contact_no: "+63 923 9876 890",
            created_at: "May 02, 2020",
            created_by: "3",
            items: [
                {
                stransaction_items_code: 1,
                or_no: 32456789,
                barcode: 18773694,
                product_description: "Muck n Cheez",
                qty: 3,
                sales_cost: 98.15
                },
                {
                stransaction_items_code: 2,
                or_no: 32456789,
                barcode: 53170036,
                product_description: "Oreo Cookies",
                qty: 2,
                sales_cost: 54.75
                },
            ]
            },
            {
            stransactions_code: 2,
            or_no: 32456790,
            stransaction_date: "May 02, 2020",
            total_cost: 76.75,
            payment_amt: 100.0,
            customer_name: "Rowan Whitethorn",
            customer_address: "Pine Trees Bldg",
            customer_contact_no: "+63 923 9876 891",
            created_at: "May 02, 2020",
            created_by: "MsCashier",
            items: [
                {
                stransaction_items_code: 2,
                or_no: 32456790,
                barcode: 51404209,
                product_description: "Cadbury 65g",
                qty: 1,
                sales_cost: 76.75
                },
            ]
            },
            {
            stransactions_code: 3,
            or_no: 32456791,
            stransaction_date: "May 02, 2020",
            total_cost: 89.6,
            payment_amt: 100.0,
            customer_name: "Magnus Bane",
            customer_address: "Bane & Lightwood Residence",
            customer_contact_no: "+63 923 9876 891",
            created_at: "May 02, 2020",
            created_by: "MsCashier",
            items: [
                {
                stransaction_items_code: 3,
                or_no: 32456791,
                barcode: 11443366,
                product_description: "Dairy Meelk 250mL",
                qty: 1,
                sales_cost: 89.6
                },
            ]
            },
            {
            stransactions_code: 4,
            or_no: 32456792,
            stransaction_date: "May 02, 2020",
            total_cost: 109.5,
            payment_amt: 110.0,
            customer_name: "Manon Blackbeak",
            customer_address: "Mountains Suite Pembly Bldg",
            customer_contact_no: "+63 923 9876 892",
            created_at: "May 02, 2020",
            created_by: "MsCashier",
            items: [
                {
                stransaction_items_code: 4,
                or_no: 32456792,
                barcode: 53170036,
                product_description: "Oreo Cookies",
                qty: 2,
                sales_cost: 54.75
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
        this.$navigateTo(ShowSales, {
          props: {
            // details: del
            trans: 'delivery',
            receipt_no: del.or_no,
            name: del.customer_name,
            contact: del.customer_contact_no,
            address: del.customer_address,
            date: del.stransaction_date,
            total_cost: del.total_cost,
            payment_amt: del.payment_amt,
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
