<template>
    <Page class="page" actionBarHidden="true">
      <!-- <ActionBar class="action-bar banner" flat="true">

          <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"/>

          <ActionItem icon="res://menu"
                      android:visibility="collapsed"
                      @tap="onDrawerButtonTap"
                      ios.position="left"/>
          <Label class="action-bar-title titles" text="Inventory"/>
      </ActionBar> -->

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
                      text="SUPPLIERS"
                      horizontalAlignment="center"
                  />
                  <Label
                      col="2"
                      class="fas p-20"
                      fontSize="16"
                      color="white"
                      :text=" 'fa-ellipsis-v' | fonticon "
                      horizontalAlignment="right" 
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
                  for="item in inventory" >
                    <v-template>
                      <StackLayout >
                        <GridLayout class="list-box" rows="auto,*,*" col="*,*">
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




                        <!-- <GridLayout rows="*,*,*" columns="*,auto">
                          <StackLayout row="1" class="content">
                            <GridLayout class="inv-item" rows="*,*" columns="*,auto">
                              <Label row="0" col="0" :text="item.barcode +' - '+ item.product_description" textWrap="true" ></Label>
                              <Label row="0" col="1" :text="'Quantity: '+item.qty"></Label>
                              <Label row="1" col="0" :text="'Unit Cost: '+item.unit_cost"></Label>
                              <Label row="1" col="1" :text="'Sales Cost: '+item.sales_cost"></Label>
                            </GridLayout>

                          </StackLayout>
                        </GridLayout> -->

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
              @tap="onButtonTap" />
        </GridLayout>
        <GridLayout rows="auto,auto" column="auto,auto" class="childbtn" v-show="floatbutton">
            <Button row="0" col="1" @tap="$showModal(add)" class="floatingbutton1" id="fbutton1" text="1" />
            <Button row="1" col="0" class="floatingbutton2" id="fbutton2" text="2" />
        </GridLayout>

      <ActivityIndicator :busy="showLoading" color="green" class="indLog" />


      </GridLayout>

      
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../../../shared/selected-page-service";
  // import { View, ViewBase } from "@nativescript/core/ui/frame";
  import add from "./add";
  import edit from "./edit";
  import axios from "axios";

  export default {
    data(){
      return {
        supplier: {},
 
        floatbutton: false, 
        add: add,
        edit: edit,
        showLoading: false

      }
    },
    components: {
      add,
      edit
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
        if(this.floatbutton){
          this.floatbutton = false;
        } else {
          this.floatbutton = true;
        }
        
      },
      update(item) {
        this.$showModal(edit, {
          props: {
            // items: items
              inventory_id: item.inventory_id,
              barcode: item.barcode,
              product_description: item.product_description,
              quantity: item.quantity,
              unit_cost: item.unit_cost,
              sales_cost: item.sales_cost,
              created_by: item.created_by,
              created_at: item.created_at,
              updated_by: item.updated_by,
              updated_at: item.updated_at
            
          }
        })
      }
    },
    async created() {
      this.showLoading = true;

      await axios.get(this.$root.server+`/inventory`)
        .then(inventory => {
          this.inventory = inventory.data
          
          console.log("result data", inventory.data)
          console.log("inventory: ", this.inventory);

          this.showLoading = false;
        })
        .catch(err => console.log(error)); // add this to see if the console is spitting an error.
    }
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
      background-color: #05C5AA;
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
