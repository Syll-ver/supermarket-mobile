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
          <GridLayout rows="auto,auto,auto,*,auto">
          <GridLayout>
            <StackLayout class="m-t-25">
              <GridLayout row="0">
                  <GridLayout rows="auto,auto">
                    <Label
                        row="0"
                        class="fas p-t-20 p-l-20 p-r-20"
                        fontSize="16"
                        color="white"
                        :text=" 'fa-chevron-left' | fonticon "
                        horizontalAlignment="left"
                        @tap="onDrawerButtonTap"
                    />
                    <Label
                        row="1"
                        class="p-l-20"
                        fontSize="16"
                        fontWeight="bold"
                        color="white"
                        text=" Delivery Details " 
                        horizontalAlignment="left"
                    />
                  </GridLayout>
              </GridLayout>
            </StackLayout>
          </GridLayout>
          <GridLayout  row="1">
              <GridLayout 
                class="bg-pill" 
                rows="*,*,*"
                androidElevation="5" >
                   <GridLayout ref="inputBarcode" 
                        class="box-input" 
                        row="0" >
                        <GridLayout rows="auto,auto">
                            <Label row="0" ref="inputBCLabel"
                            class="box-input-label">Date</Label>
                            <TextField row="1" class="text-input"
                                v-model="delivery.transaction_date"
                                keyboardType="date"
                                />
                        </GridLayout>
                    </GridLayout>
                    <GridLayout ref="inputBarcode" 
                        class="box-input" 
                        row="1" >
                        <GridLayout rows="auto,auto">
                            <Label row="0" ref="inputBCLabel"
                            class="box-input-label">Delivery Receipt Number</Label>
                            <TextField row="1" class="text-input"
                                v-model="delivery.dr_no"
                                keyboardType="number"
                                />
                        </GridLayout>
                    </GridLayout>
                    <GridLayout ref="inputBarcode" 
                        class="box-input" 
                        row="2" >
                        <GridLayout rows="auto,auto">
                            <Label row="0" ref="inputBCLabel"
                            class="box-input-label">Supplier</Label>
                            <Label row="1" class="text-input "
                                v-model="delivery.company_name"
                                hint="Tap to choose..."
                                @tap="supplierList()"
                                keyboardType="number"
                                />
                        </GridLayout>
                    </GridLayout>

                    <!-- <ListPicker row="2" :items="listOfItems" selectedIndex="0"
                    @selectedIndexChange="selectedIndexChanged" /> -->
              </GridLayout>
          </GridLayout>
          <GridLayout row="2" columns="*,*">
              <Label col="0"
                class="p-l-20"
                fontSize="16"
                fontWeight="bold"
                color="white"
                text="Items"
                horizontalAlignment="left" />
              <Label col="1" 
                class="p-r-20"
                fontSize="16"
                fontWeight="bold"
                color="white"
                :text=" 'Total: '+ delivery.total_cost"
                horizontalAlignment="right" />
          </GridLayout>
          <GridLayout row="3">
              <GridLayout class="itemdetails-pill" >
                    <ListView row="1" class="list-group"
                  for="inv in items" >
                    <v-template>
                      <GridLayout >
                        <GridLayout class="item-pill"
                            androidElevation="5">

                          <StackLayout >
                              <GridLayout rows="*,*" columns="2*,*">
                                <GridLayout row="0" col="0">
                                    <Label
                                        class="m-r-15"
                                        fontSize="14"
                                        fontWeight="bold"
                                        textWrap="true"
                                        :text="inv.product_description" />
                                </GridLayout>
                                    <GridLayout class="quantity-pill" row="0" col="2" rowSpan="2"
                                        columns="auto,*,auto" 
                                        backgroundColor="white"
                                        borderRadius="20">
                                        <Label
                                            col="0"
                                            class="fas" 
                                            color="#05C5AA"
                                            horizontalAlignment="left"
                                            :text=" 'fa-minus' | fonticon " 
                                            @tap="qtyDecrease(inv)"
                                        />
                                        <TextField 
                                            col="1"
                                            class="text-input"
                                            color="black"
                                            :text="inv.quantity"
                                            horizontalAlignment="center"
                                            keyboardType="number"
                                        />
                                        <Label
                                            col="2"
                                            class="fas" 
                                            color="#05C5AA"
                                            horizontalAlignment="right"
                                            :text=" 'fa-plus' | fonticon "
                                            @tap="qtyIncrease(inv)" 
                                        />
                                </GridLayout>
                                <GridLayout row="1" col="0">
                                    <Label v-if="inv.total_unitcost"
                                        fontSize="15"
                                        fontWeight="bold"
                                        :text="inv.total_unitcost" />
                                </GridLayout>
                            </GridLayout>
                            <!-- <Label class="text-content" :text="user.barcode + ' ' +user.product_description" textWrap="true" ></Label>
                            <Label :text="user.quantity"></Label> -->
                          </StackLayout>
                        </GridLayout>

                      </GridLayout>

                    </v-template>

                    </ListView>

              </GridLayout>
          </GridLayout>
          <GridLayout row="4" columns="*,auto">
                <Button 
                    col="0"
                    class="addbutton"
                    text="RECEIVE DELIVERY"
                    color="white"
                    backgroundColor="#424242"
                    @tap="receiveDelivery()" />
                <Label 
                    col="1"
                    class="fas additem"
                    :text=" 'fa-plus-circle' | fonticon "
                    @tap="addItem()"
                     />
          </GridLayout>
        </GridLayout>

        <GridLayout v-show="blur" class="blur">
        </GridLayout>

        <GridLayout v-show="modalBlur" class="modalBlur">
        </GridLayout>

        <GridLayout class="supplierPicker" v-show="isItemVisible" rows="*,auto">
          <GridLayout row="0">
            <ListView for="sup in unfilteredItemsToShow">
                <v-template>
                    <StackLayout>
                        <GridLayout>
                            <Label :text="sup.company_name" @tap="pickSupplier(sup)" />
                        </GridLayout>
                    </StackLayout>
                </v-template>
            </ListView>
          </GridLayout>
          <GridLayout row="1">
              <Button backgroundColor="#f5f5f5" row="2" horizontalAlignment="center" text="CANCEL" @tap="onCancel()" />
          </GridLayout>
      </GridLayout>

        <GridLayout v-show="addItems" class="item-modal" rows="auto,*,auto">
            <GridLayout row="0">
                <Label 
                    margin="10"
                    fontSize="16"
                    fontWeight="bold"
                    color="white"
                    text="CHOOSE ITEM" 
                    horizontalAlignment="center" />
            </GridLayout>
            <GridLayout row="1">
                <ListView for="i in $root.inventory">
                    <v-template>
                        <StackLayout>
                            <GridLayout>
                                <Label 
                                    color="white"
                                    fontSize="14"
                                    fontWeight="bold"
                                    :text="i.product_description" @tap="pickItem(i)" />
                            </GridLayout>
                        </StackLayout>
                    </v-template>
                </ListView>
            </GridLayout>
            <GridLayout row="2">
                <Button 
                    backgroundColor="#f5f5f5" col="0" 
                    borderRadius="20" 
                    class="p-l-25 p-r-25 p-t-0 p-b-0"
                    horizontalAlignment="center" 
                    text="CANCEL" @tap="onCancelItemModal()" />
            </GridLayout>
        </GridLayout>

        <!-- <GridLayout rows="*,*,auto,row,row">
          <GridLayout>
            <StackLayout >
              <GridLayout class="m-t-50" row="0">
                  <Label

                      class="fas p-20"
                      fontSize="16"
                      color="white"
                      :text=" 'fa-chevron left' | fonticon "
                      horizontalAlignment="left"
                      @tap="onDrawerButtonTap"
                  />
              </GridLayout>
            </StackLayout>
            <Label row="1"
                text="Delivery Details" 
                horizontalAlignment="left" />
          </GridLayout>
          <GridLayout row="2" columns="*,*">
            <GridLayout class="bg-pill">
                
            </GridLayout>
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


                      </StackLayout>
                    </v-template>

                </ListView>

            </StackLayout>
              
          </GridLayout>
        </GridLayout> -->


      <ActivityIndicator :busy="showLoading" color="green" class="indLog" />

      


      </GridLayout>

      
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../../../shared/selected-page-service";
  // import { View, ViewBase } from "@nativescript/core/ui/frame";
  import parent from "./Delivery";
  import axios from "axios";
import { GridLayout } from '@nativescript/core';

  export default {
    data(){
      return {
        items: [],
        delItems: [
            {
                dti_id: 197,
                dt_no: 44,
                barcode: 1001,
                product_description: "sdffdfds",
                unit_cost: 20,
                quantity: 1
            },
            {
                dti_id: 198,
                dt_no: 44,
                barcode: 1005,
                product_description: "sdffdfds",
                unit_cost: 20,
                quantity: 1
            },
            {
                dti_id: 230,
                dt_no: 44,
                barcode: 1006,
                product_description: "sdffdfds",
                unit_cost: 20,
                quantity: 1
            },
            {
                dti_id: 418,
                dt_no: 44,
                barcode: 1001,
                product_description: "sdffdfds",
                unit_cost: 20,
                quantity: 1
            }

        ],
        delivery: [],
        showLoading: false,
        isItemVisible: false,
        blur: false,
        modalBlur: false,
        addItems: false,
        parent: parent,
        listOfItems: [
            'supplier1',
            'supplier2',
            'supplier3'
        ],
        itemsToShow: [],
        unfilteredItemsToShow: [],
        filterItem: ""
      }
    },
    components: {
      parent
    },
    async created() {
        this.showLoading = true;

        await axios.get(this.$root.server+`/supplier`)
            .then(supplier => {
            this.$root.suppliers = supplier.data
            this.unfilteredItemsToShow = this.$root.suppliers
            
            console.log("result data", supplier.data)
        })
        .catch(err => console.log(err)); // add this to see if the console is spitting an error.

        if(this.$root.inventory) {
            await axios.get(this.$root.server+`/inventory`)
                .then(items => {
                this.$root.inventory = items.data
            })
            .catch(err => console.log(err)); // add this to see if the console is spitting an error.
        }

            this.showLoading = false;


    },

    mounted() {

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
      supplierList() {
          this.blur = true
          this.isItemVisible = true;
          console.log("itemvisible: ", this.isItemVisible);
      },
      pickSupplier(item){
        this.delivery.company_name = item.company_name
        this.delivery.supplier_id = item.supplier_id
        this.isItemVisible = false;
        this.blur = false;
      },
      onCancel() {
          this.isItemVisible = false;
          this.blur = false;
      },
      addItem() {
          this.modalBlur = true;
          this.addItems = true;
      },
      onCancelItemModal(){
          
      },
      pickItem(i){
          i.quantity = 1;
          i.total_unitcost = (i.quantity*i.unit_cost)
          this.items.push(i)
          this.modalBlur = false;
          this.addItems = false;
      },
      qtyDecrease(inv) {
          console.log("decrease clicked");
          if(inv.qty != 0) {
              const qty = this.items.findIndex(
              x => x.barcode === inv.barcode)
              this.items[qty].quantity = inv.quantity-1
            //   this.items[qty].total_unitcost = 0
            this.items[qty].total_unitcost = (inv.unit_cost*(this.items[qty].quantity))
          } 

        this.delivery.total_cost = 0
          for(var i = 0; i < this.items.length; i++){
              this.delivery.total_cost += this.items[i].total_unitcost
          }
      },
      qtyIncrease(inv){
          console.log("increase clicked");
          const qty = this.items.findIndex(
              x => x.barcode === inv.barcode)
              this.items[qty].quantity = inv.quantity+1
        //   this.items[qty].total_unitcost = 0


            this.items[qty].total_unitcost = (inv.unit_cost*(this.items[qty].quantity))
      },
      receiveDelivery() {
          this.delivery.items = this.items
      }

    },

  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
    .page {
      background: #05C5AA;
    }

    .blur {
        background-color: #05C5AA;
        opacity: 0.5
    }

    .modalBlur {
        background-color: #f5f5f5;
        opacity: 0.8;
    }

    // .bg-back {
    //   background-color: #f5f5f5;
    //   border-radius: 30 0 30 0;
    //  // margin-top: 400;
    // }

    .bg-pill {
        background-color: #f5f5f5;
        margin: 5 30 30 30;
        border-radius: 15;
        padding: 20 20 0 20;
    }

    .itemdetails-pill {
        background-color: #f5f5f5;
        border-radius: 30 0 30 0;
        padding-top: 20;
    }

    .item-pill {
        background-color: #7ac5be;
        padding: 10;
        margin: 10;
        color: white;
        border-radius: 20;
        
    }

    .quantity-pill {
        margin-top: 15;
        margin-bottom: 15;
        // padding: 10;
        font-weight: bold;
        padding-top: 20;
        padding-bottom: 15;
        padding-right: 10;
        padding-left: 10;
        vertical-align: center;
    }

    .list-box {
      background-color: #ffffff;
      color: #009688;
      padding: 10;
      margin: 10;
      border-radius: 20;
    }

    .text-input {
        // width: 250;
        // padding-left: 5;
        padding-right: 5;
        font-size: 15;
        font-weight: bold;
        background-color: transparent;
        margin: 0;
        padding-top: 0;
        padding-bottom: 5; 
        padding-left: 10;
        border-bottom-color: transparent;
    }

    .box-input {
        border-width: 1 1 1 1;
        border-color: #e6e6e6;
        border-radius: 8;
        margin-bottom: 15;
        background-color: white;
    }

    .box-input-label {
        margin-bottom: 0;
        margin-top: 5;
        margin-left: 8;
        font-size: 10;
        color: #0a8171;
        background-color: transparent;
        text-transform: uppercase;
    }

    .additem {
        background-color: #05C5AA;
        color: white;
        font-size: 40;
        padding: 20 20 20 10;
        margin-right: 15;
        box-shadow: none;
    }

    .addbutton {
        border-radius: 30;
        font-size: 15;
        
    }

    .supplierPicker {
        height: 300;
        background-color: white;
        border-radius: 20;
        padding: 20 20 15 20;
        margin: 50 25 25 25;
    }

    .item-modal {
        margin: 50 25 25 25;
        padding: 20;
        border-radius: 20;
        height: 300;
        background-color: #05C5AA;
    }

    .btn-cancel {
        background-color: #9e9e9e;
        border-radius: 20;
        height: 40;
        color: white;
        font-weight: bold;
    }

    .btn-submit {
        background-color: white;
        border-radius: 20;
        height: 40;
        color: #009688;
        font-weight: bold;
    }
    

    
</style>
