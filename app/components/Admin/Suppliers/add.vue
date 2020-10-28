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
                            class="modal-label" col="0" 
                            text="Add suppliers Item"
                            fontWeight="bold"
                            color="white"
                            horizontalAlignment="center"
                            />
                        <!-- <Button class="modal-btn" col="1" text="x" @tap="$modal.close" /> -->
                    </GridLayout>
                </StackLayout>

                <GridLayout class="form">
                    <GridLayout rows="auto,auto,auto,auto">
                        <GridLayout ref="inputName" 
                            class="box-input" 
                            row="0" >
                            <GridLayout rows="auto,auto">
                                <Label row="0" ref="inputCNLabel"
                                class="box-input-label" 
                                text="Company Name"
                                />
                                <TextField row="1" class="text-input"
                                    v-model="supplier.company_name"
                                    keyboardType="number"
                                    @blur="checkA()"
                                    />
                            </GridLayout>
                        </GridLayout>

                        <GridLayout ref="contact_no" class="box-input" row="1" >
                            <GridLayout rows="auto,auto">
                                <Label row="0" ref="inputContactLabel" 
                                class="box-input-label" 
                                text="Contact Number"/>
                                <TextField row="1" class="text-input"
                                    v-model="supplier.contact_no"
                                    @blur="checkB()"
                                    />
                            </GridLayout>
                        </GridLayout>

                        <GridLayout ref="address" class="box-input" row="2" >
                            <GridLayout rows="auto,auto">
                                <Label row="0" ref="inputAddressLabel" 
                                class="box-input-label" 
                                text="Company Address"/>
                                <TextField row="1" class="text-input"
                                    v-model="supplier.company_address"
                                    @blur="checkC()"
                                    />
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

            <ActivityIndicator :busy="showLoading" color="white" class="indLog" />

        </FlexboxLayout>
        

    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../../../shared/selected-page-service";
  import Vue from "nativescript-vue";
  import alertmodal from "../../Modal/alertmodal";
  import axios from "axios";

  export default {
    data(){
      return {
        suppliers: {
        },
        showLoading: false
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
            console.log("br: " + this.suppliers.barcode);
            console.log("$refs: ", this.$refs.inputBar.getViewById);  
        },
        checkA(){
            if(this.suppliers.company_name == ''){
                this.$refs.inputCNLabel.nativeView.color = "#DD0000";
                this.$refs.inputName.nativeView.borderColor = "#DD0000";
            } else {
                this.$refs.inputCNLabel.nativeView.color = "#0a8171";
                this.$refs.inputName.nativeView.borderColor = "#e6e6e6";
            }
           
        },
        checkB(){
            if(this.suppliers.contact_no == ''){
                this.$refs.inputContactLabel.nativeView.color = "#DD0000";
                this.$refs.contact_no.nativeView.borderColor = "#DD0000";
            } else {
                this.$refs.inputContactLabel.nativeView.color = "#0a8171";
                this.$refs.contact_no.nativeView.borderColor = "#e6e6e6";
                // this.validate()
            }
            
        },
        checkC(){
            if(this.suppliers.company_address == ''){
                this.$refs.inputAddressLabel.nativeView.color = "#DD0000";
                this.$refs.address.nativeView.borderColor = "#DD0000";
            } else {
                this.$refs.inputAddressLabel.nativeView.color = "#0a8171";
                this.$refs.address.nativeView.borderColor = "#e6e6e6";
                // this.validate()
            }

        },
        // checkD(){
        //     if(this.suppliers.sales_cost == ''){
        //         this.$refs.inputSCLabel.nativeView.color = "#DD0000";
        //         this.$refs.sales_cost.nativeView.borderColor = "#DD0000";
        //     } else {
        //         this.$refs.inputSCLabel.nativeView.color = "#0a8171";
        //         this.$refs.sales_cost.nativeView.borderColor = "#e6e6e6";
        //         // this.validate()
        //     }

        // },
        onCancel(){
            for(var i = 0; i < this.suppliers.length; i++){
                this.suppliers[0] = ""
            }
            this.$modal.close()
        },
        async onSubmit(){
            if(this.suppliers.company_name != "" &&
                this.suppliers.contact_no != "" &&
                this.suppliers.company_address != "" ){

                    this.suppliers.status = 1;
                    this.suppliers.created_by = '38';
                    this.suppliers.created_at = 'today';

                    this.showLoading = true
                    await axios({
                        method: "POST",
                        url: this.$root.server+`/add_supplier`, 
                        header: {
                            "Content-Type": "application/json"
                        },
                        data: { ...this.suppliers },
                        })
                        .then(result => {
                            console.log("result", result.data.msg);
                            if(result) {
                                this.showLoading = false;
                                alert({
                                    // title: "Success",
                                    message: result.message,
                                    okButtonText: "OK"
                                    }).then(() => {
                                    console.log("Alert dialog closed");
                                });
                                this.$modal.close();
                            }
                        })
                        .catch(err => {
                            this.showLoading = false;
                            alert({
                                title: "Fail",
                                message: err.response.data.msg,
                                okButtonText: "OK"
                                }).then(() => {
                                console.log("Alert dialog closed");
                                this.suppliers.barcode = ""
                                this.suppliers.product_description = ""
                                this.suppliers.unit_cost = ""
                                this.suppliers.sales_cost = ""
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
