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
          <Label class="action-bar-title titles" text="HGASAS Transactions"/>
      </ActionBar>

      <GridLayout class="page__content transbody">
          <!-- <Label class="page__content-icon fas" text.decode="&#xf015;"/> -->
          <!-- <Label class="page__content-placeholder" :text="message"/> -->
          
          <GridLayout rows="auto,*">

              
              <GridLayout row="0" class="list-group">
                <StackLayout class="receive-button" @tap="confirm()">
                  <GridLayout rows="auto,*" columns="auto,*">
                      <Label row="0" col="0"
                        text="+" class="receive-icon" 
                        horizontalAlignment="center"
                        />
                      <Label row="0" col="1"
                        text="RECEIVE DELIVERY"
                        class="receive-text"
                        horizontalAlignment="center"
                        />
                  </GridLayout>
              </StackLayout>
              </GridLayout>

                
                <GridLayout row="1">
                  <ListView class="list-group yyy"
                separatorColor="transparent"
                  for="del in delivery" >
                    
                    <v-template>
                      <GridLayout>
                        <!-- <Image src="">
                        </Image> -->
                        <GridLayout  class="rtrans" @tap="show(del)">
                          <GridLayout rows="*,*,*" columns="*,auto" class="trans-pills">
                            <Label row="0" col="0" class="text-content" :text="'DR No: '+del.dr_no" textWrap="true" />
                            <Label row="1" col="0" class="text-content" :text="del.company_name" textWrap="true" />
                            <Label row="1" col="1" class="text-content" textWrap="true" >
                              <FormattedString>
                                <Span text="₱" />
                                <Span :text="del.total_cost" />
                              </FormattedString>
                            </Label>

                            <!-- <Label class="text-sub sub-header" :text="del.dr_no" textWrap="true" />
                            <Label horizontalAlignment="right" class="text-sub sub-header">
                              <FormattedString>
                                <Span text="₱" />
                                <Span :text="del.total_cost" />
                              </FormattedString>
                            </Label>

                            <StackLayout row="1" class="content">
                              <Label class="text-content" :text="'Delivery Receipt Number: '+del.dr_no" textWrap="true" ></Label>
                              <Label class="text-content" :text="del.company_name"></Label>
                            </StackLayout> -->
                          </GridLayout>

                        </GridLayout>
                        
                      </GridLayout>

                    </v-template>

                </ListView>
                </GridLayout>
              
          </GridLayout>

                

                
        

   

          <!-- <GridLayout class="fabbtn">
            <Button class="floatingbutton" text="button" @tap="onButtonTap" ></Button>
          </GridLayout>
          <GridLayout rows="auto,auto" column="auto,auto" class="childbtn" v-show="floatbutton">
              <Button row="0" col="1" @tap="$showModal(add)" class="floatingbutton1" id="fbutton1" text="1" />
              <Button row="1" col="0" class="floatingbutton2" id="fbutton2" text="2" />
          </GridLayout> -->

        <!-- <ActivitiIndicator busy="{{ isLoading }}" /> -->

      </GridLayout>
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../shared/selected-page-service";
  import ShowDetails from "./ShowDetails.vue";
  import receive from "./Admin/Delivery/add";

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
    .transbody {
      // background-color: #e6e6e6;
    }

    .rtrans {
      background-color: aliceblue;
      border-radius: 20;
    // android-elevation:10px;
    }

    .trans-pills {
      margin: 5;
    }

    .receive-icon {
      font-size: 16;
      padding: 20 20 20 20;
      // border-width: 1 1 1 1;
      margin-left: 20;
    }

    .receive-text {
      font-size: 16;
      padding: 20 20 20 20;
      // align-items: center;
    }

    .receive-button {
      // height: 50;
      //width is whole grid
      margin: 10 10 10 10;
      background-color: #B8FDDF;
      border-radius: 30;
    }

    
</style>
