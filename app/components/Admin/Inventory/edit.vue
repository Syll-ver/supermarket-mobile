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
                        <Label class="modal-label" col="0" >Add Item</Label>
                        <Button class="modal-btn" col="1" text="x" @tap="$modal.close" />
                    </GridLayout>
                </StackLayout>
                <!-- <StackLayout class="hr" /> -->
                <StackLayout class="form">
                    <StackLayout>
                        <StackLayout class="box-input" row="0" >
                            <Label class="box-input-label">Barcode</Label>
                            <TextField class="text-input"
                                v-model="inventory.barcode"
                                keyboardType="number"
                                @textChange="sample()"
                                />
                        </StackLayout>

                        <StackLayout class="box-input" row="1" >
                            <Label class="box-input-label">Product Description</Label>
                            <TextField class="text-input"
                                v-model="inventory.product_description"
                                />
                        </StackLayout>

                        <StackLayout class="box-input" row="2" >
                            <Label class="box-input-label">Unit Cost</Label>
                            <TextField class="text-input"  
                                v-model="inventory.unit_cost"
                                keyboardType="number"
                               />
                        </StackLayout>

                        <StackLayout class="box-input" row="3" >
                            <Label class="box-input-label">Sales Cost</Label>
                            <TextField
                                v-model="inventory.sales_cost"
                                class="text-input" 
                                keyboardType="number"
                                />
                        </StackLayout>

                        <StackLayout row="4" >
                            <Button class="modal-submit"
                                @tap="validateForm"
                                text="OK" />
                        </StackLayout>
                    </StackLayout>

                </StackLayout>
            </StackLayout>
        </FlexboxLayout>

    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../../../shared/selected-page-service";
  import Vue from "nativescript-vue";

  

  export default {
    data(){
      return {
            inventory: {
                barcode: "",
                product_description: "",
                unit_cost: "",
                sales_cost: "",
                quantity: 0
            }
            
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
        sample() {
            console.log("br: " + this.inventory.barcode);
        },
        validateForm(){
            // this.inventory()
            // console.log("barcode: " + this.barcode);
            // this.inventory.push(
            //     {
            //         barcode: this.barcode
            //     }
            // )
            // console.log("inv: " + this.inventory.barcode);
            console.log("fill: ", this.inventory.barcode);
            console.log("fill: ", this.inventory);
            if(this.inventory.barcode == "" ||
                this.inventory.product_description == "" ||
                this.inventory.unit_cost == "" ||
                this.inventory.sales_cost == "" ){
                    
                    alert({
                        // title: 'OOPS',
                        message: 'Must fill in all inputs',
                        okButtonText: 'OK'
                    }).then(() => {
                        console.log("closed~~");
                    });
            } else {
                console.log("inventory: ",this.inventory);
            }
        }
    }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles

    
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
        background-color: white;
        margin: 0;
        padding-top: 0;
        padding-bottom: 5; 
        padding-left: 10;
        border-bottom-color: transparent;
    }

    .box-input {
        border-width: 1 1 1 1;
        border-color: #e6e6e6;
        border-radius: 6;
        margin-bottom: 15;
    }

    .box-input-label {
        margin-bottom: 0;
        margin-top: 5;
        margin-left: 8;
        font-size: 10;
        color: #0a8171;
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

    .modal-label {
        margin-top: 12;
        margin-left: 15;
        text-align: left;
        text-transform: uppercase;
        font-weight: bold;
    }

    .modal-submit {
        width: 250;
        color: aliceblue;
        background-color: #0a8171;
        border-radius: 12;
        height: 40;
        text-transform: uppercase;
        font-weight: bold;
        margin-top: 30;
    }
    
</style>
