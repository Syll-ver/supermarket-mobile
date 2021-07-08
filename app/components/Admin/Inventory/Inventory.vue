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
                      text="Delivery Transaction"
                      horizontalAlignment="center"
                  />
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
                separatorColor="transparent" :items="inventory"
                  for="item in $root.inventory" >
                    <v-template>
                      <StackLayout >
                        <GridLayout 
                          class="list-box" 
                          androidElevation="5"
                          rows="auto,*,*" col="*,*">
                            <Label row="0" col="0" :text="item.barcode" />
                            <Label 
                              row="1" col="0"
                              fontSize="15"
                              fontWeight="bold" 
                              :text="item.product_description" />
                            <Label row="0" col="0" rowSpan="2" 
                              class="far m-r-10"
                              fontSize="19"
                              horizontalAlignment="right"
                              :text=" 'fa-edit' | fonticon "
                              @tap="update(item)" />
                            <GridLayout row="2">
                              <GridLayout rows="auto,*" columns="*,*,*">
                                <Label row="0" col="0"
                                  horizontalAlignment="center"
                                  padding="0"
                                  margin="0"
                                  text="UNIT COST" />
                                <Label row="1" col="0" 
                                  horizontalAlignment="center"
                                  fontWeight="bold"
                                  fontSize="14"
                                  padding="0"
                                  margin="0"
                                  :text=" '₱'+item.unit_cost" />
                                <Label row="0" col="1" 
                                  horizontalAlignment="center"
                                  text="SALES COST" />
                                <Label row="1" col="1" 
                                  horizontalAlignment="center"
                                  fontWeight="bold"
                                  fontSize="14"
                                  :text=" '₱'+item.sales_cost" />
                                <Label row="0" col="2" 
                                  horizontalAlignment="center"
                                  text="QTY" />
                                <Label row="1" col="2" 
                                  horizontalAlignment="center"
                                  fontSize="14"
                                  fontWeight="bold"
                                  :text="item.quantity" />
                              </GridLayout>
                            </GridLayout>
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
              @tap="$showModal(add)" />
        </GridLayout>

      <GridLayout v-show="blur" class="modalBlur">
      </GridLayout>

      <ActivityIndicator :busy="showLoading" color="#05C5AA" class="indLog" />


      </GridLayout>

      
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../../../shared/selected-page-service";
  import add from "./add";
  import edit from "./edit";
  import axios from "axios";

  export default {
    data(){
      return {
        floatbutton: false, 
        add: add,
        edit: edit,
        showLoading: false,
        blur: false,
        items: [],

      }
    },
    components: {
      add,
      edit,
    },
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Inventory");

    },
    async created() {
      await getTransactions();
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
        if(this.floatbutton){
          this.floatbutton = false;
        } else {
          this.floatbutton = true;
        }
        
      },

      async getTransactions() {
        try {
          const userDetails = this.$root.localStorage.user_details;
          const roleDetails = this.$root.localStorage.user_role;
          const employee_id = userDetails.Code;
          const employee_role = roleDetails.Name;
          
          this.items = [];
          const res = await axios({
            method: "POST",
            url: this.$root.server+`/api/transaction/select`,
            headers: {
              Authorization: `B1SESSION=`+this.$root.localStorage.SessionId
            },
            data: {
              date_from: '2021-06-03', // moment(this.datePicker.startDate).format("YYYY-MM-DD"),
              date_to: '2021-04-01', //moment(this.datePicker.endDate).format("YYYY-MM-DD"),
              employee_id,
              employee_role
            }
          })

          const v = res.data.view;
          console.log("xxxxxxxxxxxxxxxxxxxxxxxx",v);
        } catch (e) {
          console.log(e);
        }
      }

      // update(item) {
      //   this.$showModal(edit, {
      //     props: {
      //         inventory_id: item.inventory_id,
      //         barcode: item.barcode,
      //         product_description: item.product_description,
      //         quantity: item.quantity,
      //         unit_cost: item.unit_cost,
      //         sales_cost: item.sales_cost,
      //         created_by: item.created_by,
      //         created_at: item.created_at,
      //         updated_by: item.updated_by,
      //         updated_at: item.updated_at
            
      //     }
      //   })
      // }
    },
    async beforeCreate() {
      console.log("===============================",this.$root.localStorage.user_actions);
      console.log("===============================",this.$root.localStorage.SessionId);
      await axios({
        method: "POST",
        url: this.$root.server+`/admin/companies`,
        headers: {
          Authorization: this.$root.localStorage.SessionId,
        },
        data: (this.$root.localStorage).user_actions,
        proxy: {
          host: '172.16.1.6',
          port: 3128
        }
      }).then( res => {
        console.log("=======================================================",res);
        if(res.data.companies) {
          this.listCompany = res.data.companies
        }
        this.showLoading = false;
        this.blur = false;
      })
    },
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

    .bg-back {
      background-color: #01401f;
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
