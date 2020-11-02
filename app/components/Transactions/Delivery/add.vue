<template>
    <Page class="page" actionBarHidden="true">

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
                        text=" RECEIVE DELIVERY "
                        horizontalAlignment="left"
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
                        v-bind:class=" [inputDate == true ? 'box-input' : 'red-box-input']"
                        row="0" >
                        <GridLayout rows="auto,auto" @tap="openDatePicker()">
                            <Label row="0" ref="inputBCLabel"
                            v-bind:class=" [inputDate == true ? 'greenLabel' : 'redLabel']"
                            text="Date" />
                            <TextField row="1" class="text-input"
                                :text="new Date(delivery.transaction_date).toDateString().split(' ').slice(1).join(' ')"
                                hint="Tap to choose date"
                                />
                        </GridLayout>
                    </GridLayout>
                    <GridLayout ref="inputBarcode" 
                        v-bind:class=" [inputDR == true ? 'box-input' : 'red-box-input']"
                        row="1" >
                        <GridLayout rows="auto,auto">
                            <Label row="0" ref="inputBCLabel"
                            v-bind:class=" [inputDR == true ? 'greenLabel' : 'redLabel']"
                            text="Delivery Receipt Number" />
                            <TextField row="1" class="text-input"
                                v-model="delivery.dr_no"
                                keyboardType="number"
                                
                                />
                        </GridLayout>
                    </GridLayout>
                    <GridLayout ref="inputBarcode" 
                        v-bind:class=" [inputSup == true ? 'box-input' : 'red-box-input']"
                        row="2" >
                        <GridLayout rows="auto,auto">
                            <Label row="0" ref="inputBCLabel"
                            v-bind:class=" [inputSup == true ? 'greenLabel' : 'redLabel']"
                            text="Supplier" />
                            <Label row="1" class="text-input "
                                v-model="delivery.company_name"
                                hint="Tap to choose..."
                                @tap="supplierList()"
                                keyboardType="number"
                                
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
                v-model="totalDelivery"
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
                                      keyboardType="number"
                                      @textChange="getTotalDeliveryCost2(inv)"
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
            <ListView for="sup in $root.suppliers">
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

        <GridLayout v-show="datepicker" class="supplierPicker" rows="auto,*,auto">
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
                <DatePicker class="text-input" v-model="delivery.transaction_date"/>
            </GridLayout>
            <GridLayout row="2">
                <Button 
                    backgroundColor="#f5f5f5" col="0" 
                    borderRadius="20" 
                    class="p-l-25 p-r-25 p-t-0 p-b-0"
                    horizontalAlignment="center" 
                    text="OK" @tap="onCancelDate()" />
            </GridLayout>
        </GridLayout>

      <ActivityIndicator :busy="showLoading" color="green" class="indLog" />

    
      </GridLayout>

      
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../../../shared/selected-page-service";
  import parent from "./Delivery";
  import axios from "axios";
  import { GridLayout } from '@nativescript/core';

  export default {
    data(){
      return {
        items: [],
        // delItems: [
        //     {
        //         dti_id: 197,
        //         dt_no: 44,
        //         barcode: 1001,
        //         product_description: "sdffdfds",
        //         unit_cost: 20,
        //         quantity: 1
        //     },
        //     {
        //         dti_id: 198,
        //         dt_no: 44,
        //         barcode: 1005,
        //         product_description: "sdffdfds",
        //         unit_cost: 20,
        //         quantity: 1
        //     },
        //     {
        //         dti_id: 230,
        //         dt_no: 44,
        //         barcode: 1006,
        //         product_description: "sdffdfds",
        //         unit_cost: 20,
        //         quantity: 1
        //     },
        //     {
        //         dti_id: 418,
        //         dt_no: 44,
        //         barcode: 1001,
        //         product_description: "sdffdfds",
        //         unit_cost: 20,
        //         quantity: 1
        //     }

        // ],
        delivery: {
          total_cost: 0
        },
        showLoading: false,
        isItemVisible: false,
        blur: false,
        modalBlur: false,
        addItems: false,
        parent: parent,
        // listOfItems: [
        //     'supplier1',
        //     'supplier2',
        //     'supplier3'
        // ],
        itemsToShow: [],
        unfilteredItemsToShow: [],
        filterItem: "",
        inventoryList: [],
        inputDate: true,
        inputDR: true,
        inputSup: true,
        datepicker: false,
        totalDelivery: 0,
      }
    },
    components: {
      parent
    },
    async created() {
      this.inventoryList = this.$root.inventory;
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
      openDatePicker(){
        this.blur = true
        this.datepicker = true;
      },
      onCancelDate(){
        this.blur = false;
        this.datepicker = false;
        console.log(this.delivery.transaction_date);
      },
      onButtonTap(){
        this.$navigateTo(parent);
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
          this.modalBlur = false;
          this.addItems = false;
      },
      pickItem(i){
          console.log("item: ", i);
          // find item index
          const thisItem = this.inventoryList.findIndex(x => x.inventory_id === i.inventory_id)
          // remove item from list to pick
          this.inventoryList.splice(thisItem,1);
          
          i.quantity = 1;
          i.total_unitcost = (i.quantity*i.unit_cost).toFixed(2)
          i.cost_per_unit = i.unit_cost
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
            this.items[qty].total_unitcost = (inv.unit_cost*(this.items[qty].quantity))
          } else {

            // confirm removal of item from list of deliveries
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

            this.items[qty].total_unitcost = (inv.unit_cost*(this.items[qty].quantity))

        this.getTotalDeliveryCost();
            
      },
      async receiveDelivery() {
        this.delivery.items = this.items
          console.log("deliveryyyy", this.delivery);

        if((this.delivery.transaction_date != null) &&
            (this.delivery.dr_no != null) &&
            (this.delivery.company_name != null) &&
            (this.delivery.supplier_id != null) &&
            (this.delivery.items != null) ){
              this.inputDate = true;
              this.inputSup = true;
              this.inputDR = true;
              this.delivery.payment_amt = 300;
              this.delivery.created_at = "today";
              this.delivery.created_by = this.$root.localStorage.users_id;

              console.log("deliveryyyy", this.delivery);

                this.showLoading = true
                this.modalBlur = true;

              await axios({
                method: "POST",
                url: this.$root.server+`/add_delivery`,
                  header: {
                    "Content-Type": "application/json"
                  },
                  data: { ...this.delivery },
              }).then( result => {
                console.log("@result", result);

                if(result){

                  // get update delivery
                  axios.get(this.$root.server+`/delivery_item/all`)
                  .then(delivery => {
                    this.$root.delivery = delivery.data
                    console.log("delivery: ", this.$root.delivery);
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

                  this.showLoading = false
                  this.modalBlur = false;

                  
                  alert({
                    message: "Success",
                    okButtonText: "OK"
                  }).then(() => {
                      console.log("Alert dialog closed");
                      this.$navigateTo(parent);
                  });
                }

                
                
              })
              .catch(err => {
                console.log("error: ", err);
                alert(err)
                  .then(() => {
                    console.log("alert dialog is closed.");
                  })
              })

/**
 * {
   "total_cost": 110,
   "dr_no": "10",
   "payment_amt": 110,
    "supplier_id": 40,
    "created_by": "38",
    "items": [
      {
        "inventory_id": 259,
        "quantity": 11,
        "cost_per_unit": "10"
      }
    ]
    
  }
 */

            } else {

              if(this.delivery.transaction_date == null){
                this.inputDate = false;
              } else {
                this.inputDate = true;
              }

              if(this.delivery.dr_no == null){
                this.inputDR = false;
              } else {
                this.inputDR = true;
              }

              if(this.delivery.company_name == null){
                this.inputSup = false;
              } else {
                this.inputSup = true;
              }
            }
      },
      getTotalDeliveryCost() {
        this.delivery.total_cost = 0;

          var total2 = 0;
          for(var i = 0; i < this.items.length; i++){
              total2 = (parseInt(total2) + parseInt(this.items[i].total_unitcost))
          }
          this.totalDelivery = '₱'+total2;
          this.delivery.total_cost = total2;
          console.log("total2: ", total2);

      },
      getTotalDeliveryCost2(inv) {
        console.log("increase clicked");
          const qty = this.items.findIndex(
              x => x.barcode === inv.barcode)
              this.items[qty].quantity = inv.quantity

            this.items[qty].total_unitcost = (inv.unit_cost*(this.items[qty].quantity))

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
