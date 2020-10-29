<template>
    <Page class="modal-page">
      <ActionBar class="action-bar banner" title="Add Item">
          <!--
          Use the NavigationButton as a side-drawer button in Android
          because ActionItems are shown on the right side of the ActionBar
          -->
      </ActionBar>


        <FlexboxLayout class="page">
            <StackLayout >
                <StackLayout class="modal-banner">
                    <GridLayout columns="*,auto">
                        <Label 
                            class="modal-label p-t-5" col="0" 
                            text="Add Inventory Item"
                            fontWeight="bold"
                            color="white"
                            horizontalAlignment="center"
                            />
                        <!-- <Button class="modal-btn" col="1" text="x" @tap="$modal.close" /> -->
                    </GridLayout>
                </StackLayout>

                <GridLayout class="form">
                    <GridLayout rows="auto,auto,auto,auto">
                        <GridLayout ref="inputBarcode" 
                            class="box-input" 
                            row="0" >
                            <GridLayout rows="auto,auto">
                                <Label row="0" ref="inputBCLabel"
                                class="box-input-label">Barcode</Label>
                                <TextField row="1" class="text-input"
                                    v-model="inventory.barcode"
                                    keyboardType="number"
                                    
                                    />
                            </GridLayout>
                        </GridLayout>

                        <GridLayout ref="product_description" class="box-input" row="1" >
                            <GridLayout rows="auto,auto">
                                <Label row="0" ref="inputPDLabel" 
                                class="box-input-label">Product Description</Label>
                                <TextField row="1" class="text-input"
                                    v-model="inventory.product_description"
                                    
                                    />
                            </GridLayout>
                        </GridLayout>

                        

                        <GridLayout row="2" columns="*,*">
                            <GridLayout col="0" ref="unit_cost" class="box-input m-r-5">
                                <GridLayout rows="auto,auto">
                                    <Label row="0" ref="inputUCLabel" 
                                    class="box-input-label">Unit Cost</Label>
                                    <TextField row="1" class="text-input"  
                                        v-model="inventory.unit_cost"
                                        keyboardType="number"
                                        
                                    />
                                </GridLayout>
                            </GridLayout>
                      
                            <GridLayout col="1" ref="sales_cost" class="box-input m-l-5">
                                <GridLayout rows="auto,auto">
                                    <Label row="0" ref="inputSCLabel"
                                    class="box-input-label">Sales Cost</Label>
                                    <TextField row="1" v-model="inventory.sales_cost"
                                        class="text-input" 
                                        keyboardType="number"
                                        
                                        />
                                </GridLayout>
                            </GridLayout>                           
                        </GridLayout>

                        <GridLayout row="3" columns="*,*">
                            <GridLayout col="0" >
                                <Button ref="invsubmit"
                                    class="btn-cancel"
                                    text="CANCEL" 
                                    @tap="onCancel()" />
                            </GridLayout>
                            <GridLayout col="1" >
                                <Button ref="invsubmit"
                                    class="btn-submit"
                                    text="OK" 
                                    @tap="onSubmit()" />
                            </GridLayout>
                        </GridLayout>

                    </GridLayout>

                </GridLayout>
            </StackLayout>

            <GridLayout v-show="blur" class="modalBlur">
            </GridLayout>

            <ActivityIndicator :busy="showLoading" color="white" class="indLog" />

        </FlexboxLayout>
        

    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../../../shared/selected-page-service";

  import alertmodal from "../../Modal/alertmodal";
  import axios from "axios";

  

  export default {
    data(){
      return {
        inventory: {},
        showLoading: false,
        blur: false
      }
    },
    mounted() {

    },
    computed: {
      message() {
        return "<!-- Page content goes here -->";
      }
    },
    methods: {
        onCancel(){
            this.$modal.close();
        },
        async onSubmit(){
            if(this.inventory.barcode != "" &&
                this.inventory.product_description != "" &&
                this.inventory.unit_cost != "" &&
                this.inventory.sales_cost != "" ){

                    this.inventory.quantity = 0;
                    this.inventory.created_by = '38';
                    this.inventory.created_at = 'today';

                    this.showLoading = true
                    this.blur = true;

                    await axios({
                        method: "POST",
                        url: this.$root.server+`/add_inventory`, 
                        header: {
                            "Content-Type": "application/json"
                        },
                        data: { ...this.inventory },
                        })
                        .then(result => {

                            axios.get(this.$root.server+`/inventory`)
                            .then(inventory => {
                            this.$root.inventory = inventory.data
                            this.showLoading = false;
                            this.blur = false;

                            })
                            .catch(err => console.log(error));

                            console.log("result", result.data.msg);
                            if(result) {
                                alert({
                                    // title: "Success",
                                    message: "Success",
                                    okButtonText: "OK"
                                    }).then(() => {
                                    console.log("Alert dialog closed");
                                });
                                this.$modal.close();
                            }
                        })
                        .catch(err => {
                            this.showLoading = false;
                            this.blur = false;

                            alert({
                                title: "Fail",
                                message: err.response.data.msg,
                                okButtonText: "OK"
                                }).then(() => {
                                console.log("Alert dialog closed");
                                this.inventory.barcode = ""
                                this.inventory.product_description = ""
                                this.inventory.unit_cost = ""
                                this.inventory.sales_cost = ""
                            });
                        })
            } else {
                return false;
            }
            
        },

    
    },
    
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles

    // .inputEmpty {
    //   border-color: red;
    // }

    .page {
        background-color: #05C5AA;
    }

    .form {
		margin: 20;
		flex-grow: 2;
		vertical-align: middle;
    }

    
    
    .text-input {
        width: 250;
        padding-left: 5;
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

    .modal-banner {
        height: 50;
        font-size: 16;
    }

    .modal-btn {
        width: 20;
        height: 20;
        border-radius: 28;
        color: grey;
        background: white;
        margin-right: 10;
        margin-top: 0;
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
