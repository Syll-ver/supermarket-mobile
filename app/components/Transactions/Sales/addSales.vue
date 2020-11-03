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
                  <GridLayout rows="auto,auto" columns="auto,*">
                    <Label
                        row="0" col="0"
                        class="fas p-t-20 p-l-20 p-r-20"
                        fontSize="16"
                        color="white"
                        :text=" 'fa-chevron-left' | fonticon "
                        horizontalAlignment="left"
                        @tap="onButtonTap"
                    />
                    <Label
                        row="0" col="1"
                        class="p-t-20 p-r-20"
                        fontSize="16"
                        fontWeight="bold"
                        color="white"
                        text=" ADD SALES "
                        horizontalAlignment="left"
                    />
                    <Label
                        row="1"
                        class="p-l-20"
                        fontSize="16"
                        fontWeight="bold"
                        color="white"
                        text=" Customer Details " 
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
                        v-bind:class=" [inputDate == true ? 'box-input' : 'red-box-input']"
                        row="0" >
                        <GridLayout rows="auto,auto">
                            <Label row="0" ref="inputBCLabel"
                            v-bind:class=" [inputDate == true ? 'greenLabel' : 'redLabel']"
                            text="Customer Name" />
                            <TextField row="1" class="text-input"
                                v-model="sales.customer_name"
                                />
                        </GridLayout>
                    </GridLayout>
                    <GridLayout ref="inputBarcode" 
                        v-bind:class=" [inputDR == true ? 'box-input' : 'red-box-input']"
                        row="1" >
                        <GridLayout rows="auto,auto">
                            <Label row="0" ref="inputBCLabel"
                            v-bind:class=" [inputDR == true ? 'greenLabel' : 'redLabel']"
                            text="Contact Number" />
                            <TextField row="1" class="text-input"
                                v-model="sales.customer_contact_no"
                                />
                        </GridLayout>
                    </GridLayout>
                    <GridLayout ref="inputBarcode" 
                        v-bind:class=" [inputSup == true ? 'box-input' : 'red-box-input']"
                        row="2" >
                        <GridLayout rows="auto,auto">
                            <Label row="0" ref="inputBCLabel"
                            v-bind:class=" [inputSup == true ? 'greenLabel' : 'redLabel']"
                            text="Address" />
                            <TextField row="1" class="text-input "
                                v-model="sales.customer_address"
                                />
                        </GridLayout>
                    </GridLayout>
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
                v-model="totalsales"
                horizontalAlignment="right" />
          </GridLayout>
          <GridLayout row="3">
              <GridLayout class="itemdetails-pill" >
                    <ListView row="1" class="list-group" separatorColor="transparent"
                  for="inv in items" >
                    <v-template>
                      <GridLayout >
                        <GridLayout class="item-pill"
                            androidElevation="5">

                          <StackLayout >
                              <GridLayout rows="*,*" columns="2*,*">
                                <GridLayout row="0" col="0" margin="0">
                                    <Label
                                        class="m-r-15"
                                        fontSize="14"
                                        fontWeight="bold"
                                        textWrap="true"
                                        :text="inv.product_description" />
                                </GridLayout>
                                <GridLayout class="quantity-pill" row="0" col="2" 
                                  rowSpan="2"
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
                                      v-model="inv.quantity"
                                      horizontalAlignment="center"
                                      @textChange="getTotalDeliveryCost2(inv)"
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
                                <GridLayout row="1" col="0" margin="0">
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
                    text="PAYMENT"
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

        <!-- <GridLayout class="supplierPicker" v-show="isItemVisible" rows="*,auto">
          <GridLayout row="0">
            <ListView for="sup in unfilteredItemsToShow">
                <v-template>
                    <StackLayout>
                        <GridLayout>
                            <Label :text="sup.customer_address" @tap="pickSupplier(sup)" />
                        </GridLayout>
                    </StackLayout>
                </v-template>
            </ListView>
          </GridLayout>
          <GridLayout row="1">
              <Button backgroundColor="#f5f5f5" row="2" horizontalAlignment="center" text="CANCEL" @tap="onCancel()" />
          </GridLayout>
      </GridLayout> -->

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
                <ListView for="i in inventoryList">
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

      <ActivityIndicator :busy="showLoading" color="green" class="indLog" />

    
      </GridLayout>

      
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../../../shared/selected-page-service";
  // import { View, ViewBase } from "@nativescript/core/ui/frame";
  import parent from "./Sales";
  import axios from "axios";
import { GridLayout } from '@nativescript/core';

  export default {
    data(){
      return {
        items: [],
        sales: {
          // total_cost: 0
        },
        showLoading: false,
        isItemVisible: false,
        blur: false,
        modalBlur: false,
        addItems: false,
        parent: parent,
        itemsToShow: [],
        unfilteredItemsToShow: [],
        filterItem: "",
        inventoryList: [],
        inputDate: true,
        inputDR: true,
        inputSup: true,
        totalsales: 0
      }
    },
    components: {
      parent
    },
    async created(){
      console.log("print items !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      for(var i = 0; i < this.$root.inventory.length; i++){
        console.log("AAAAAAAAAAAAAAAAA", this.$root.inventory[i]);
        if(this.$root.inventory[i].quantity != '0' ){
          this.inventoryList.push(this.$root.inventory[i]);
        }
      }
      console.log("list of items: ", this.inventoryList);
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
      onButtonTap(){
        if(this.sales.items != null){
          confirm({
              message: "Remove this item from the list?",
              okButtonText: "OK",
              cancelButtonText: "CANCEL"
            }).then( result => {
              if(result){
                this.$navigateTo(parent);
              }
            })
        } else {
          this.$navigateTo(parent);
        }
        
      },
      addItem() {
          this.modalBlur = true;
          this.addItems = true;
      },
      onCancelItemModal(){
          this.modalBlur = false;
          this.addItems = false;
      },
      pickItem(i){
          console.log("item: ", i);
          // find item index
          const thisItem = this.inventoryList.findIndex(x => x.inventory_id === i.inventory_id)
          // remove from list to pick
          this.inventoryList.splice(thisItem,1);
          
          i.quantity = 1;
          i.total_unitcost = (i.quantity*i.sales_cost).toFixed(2)
          i.cost_per_unit = i.sales_cost
          this.items.push(i)
          console.log("picked item:", this.items);


          this.getTotalDeliveryCost();

          this.modalBlur = false;
          this.addItems = false;
      },
      qtyDecrease(inv) {
          console.log("decrease clicked");
          if((inv.quantity-1) >= 1) {
              const qty = this.items.findIndex(
              x => x.barcode === inv.barcode)
              this.items[qty].quantity = inv.quantity-1
            this.items[qty].total_unitcost = (inv.sales_cost*(this.items[qty].quantity)).toFixed(2)
          } else {

            // confirm removal of item from list
            confirm({
              message: "Remove this item from the list?",
              okButtonText: "OK",
              cancelButtonText: "CANCEL"
            }).then( result => {
              console.log(result);
              
              if(result){
                // find index of item
                const thisItem = this.items.findIndex(
                  x => x.inventory_id === inv.inventory_id)
                // remove from the list of deliveries
                this.items.splice(thisItem,1)
                // push back to list to pick
                this.inventoryList.push(inv)

                // alert user that item has been removed
                alert({
                  message: "Item removed",
                  okButtonText: "OK"
                }).then(() => {
                  console.log("Alert dialog closed");
                });
              }

            })
          } 

        // update total delivery cost based on remaining total unit costs
        this.getTotalDeliveryCost();

      },
      qtyIncrease(inv){
          console.log("increase clicked");
          const qty = this.items.findIndex(
              x => x.barcode === inv.barcode)
              this.items[qty].quantity = inv.quantity+1

            this.items[qty].total_unitcost = (inv.sales_cost*(this.items[qty].quantity))

        this.getTotalDeliveryCost();
            
      },
    async receiveDelivery() {
      this.sales.items = this.items

      if(this.sales.items.length >= 1) {
            this.sales.stransaction_date = "today"
            this.sales.created_at = "today";
            this.sales.created_by = this.$root.localStorage.users_id;

            console.log("deliveryyyy", this.sales);

            prompt({
              message: "Enter Payment",
              okButtonText: 'OK',
              cancelButtonText: 'CANCEL',
            }).then( result => {
              console.log("result: ", result.text);
              console.log("jksbhdfdhfdfddfdfddf", result);
              this.sales.payment_amt = result.text

              if(result){
                
                if(result.text >= this.sales.total_cost){
                  console.log("bypass condition payment more than total cost");

                  axios({
                    method: "POST",
                    url: this.$root.server+`/addsale`,
                      header: {
                        "Content-Type": "application/json"
                      },
                      data: { ...this.sales },
                  }).then( result => {
                    console.log("@result", result);

                    // get updated sales
                    axios.get(this.$root.server+`/viewsales`)
                    .then(sale => {
                      this.$root.sales = sale.data
                      console.log("sales: ", this.$root.sales);
                      console.log("==============================");
                    })
                    .catch(err => console.log(err));

                    // get updated inventory
                    axios.get(this.$root.server+`/inventory`)
                    .then(inventory => {
                    this.$root.inventory = inventory.data
                    console.log("inventory: ", this.$root.inventory);
                    console.log("==============================");
                    })
                    .catch(err => console.log(error));
                    

                    alert({
                    message: "Success",
                    okButtonText: "OK"
                    }).then(() => {
                        console.log("Alert dialog closed");
                        this.$navigateTo(parent);
                    });
                    
                  })
                } else {
                  alert('Payment is not enough')
                  .then(() => {
                    console.log("alert dialog is closed.");
                  })
                }
                
              } else {

                alert('Payment is required')
                .then(() => {
                  console.log("alert dialog is closed.");
                })
              }
            })
            
          } else {
            alert('No item in list')
            .then(() => {
              console.log("alert dialog is closed.");
            })
          }
    },
      
      getTotalDeliveryCost() {
          var total2 = 0;
          for(var i = 0; i < this.items.length; i++){
              total2 = (parseFloat(total2,10) + parseFloat(this.items[i].total_unitcost).toFixed(2))
          }
          this.totalsales = 'P'+total2;
          this.sales.total_cost = total2;
          console.log("total2: ", total2);

      },
      getTotalDeliveryCost2(inv) {
        console.log("increase clicked");
          const qty = this.items.findIndex(
              x => x.barcode === inv.barcode)
              this.items[qty].quantity = inv.quantity

            this.items[qty].total_unitcost = (inv.sales_cost*(this.items[qty].quantity))

        this.getTotalDeliveryCost();

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
        // margin-top: 15;
        // margin-bottom: 15;
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

    .greenLabel {
      margin-bottom: 0;
      margin-top: 5;
      margin-left: 8;
      font-size: 10;
      color: #0a8171;
      background-color: transparent;
      text-transform: uppercase;
    }

    .redLabel {
      margin-bottom: 0;
      margin-top: 5;
      margin-left: 8;
      font-size: 10;
      color: red;
      background-color: transparent;
      text-transform: uppercase;
    }

    .red-box-input {
        border-width: 1 1 1 1;
        border-color: red;
        border-radius: 8;
        margin-bottom: 15;
        background-color: white;
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
