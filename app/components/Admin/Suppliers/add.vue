<template>
    <Page class="modal-page">
      <ActionBar class="action-bar banner" title="Add Item">

      </ActionBar>


        <FlexboxLayout class="page">
            <StackLayout >
                <StackLayout class="modal-banner">
                    <GridLayout columns="*,auto">
                        <Label 
                            class="modal-label p-t-5" col="0" 
                            text="Add Supplier"
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
                                class="box-input-label" text="Company Name" />
                                <TextField row="1" class="text-input"
                                    v-model="supplier.company_name"
                                    
                                    />
                            </GridLayout>
                        </GridLayout>

                        <GridLayout ref="product_description" class="box-input" row="1" >
                            <GridLayout rows="auto,auto">
                                <Label row="0" ref="inputPDLabel" 
                                class="box-input-label" text="Contact Number" />
                                <TextField row="1" class="text-input"
                                    v-model="supplier.contact_no"
                                    />
                            </GridLayout>
                        </GridLayout>

                        <GridLayout ref="product_description" class="box-input" row="2" >
                            <GridLayout rows="auto,auto">
                                <Label row="0" ref="inputPDLabel" 
                                class="box-input-label" text="Company Address" />
                                <TextField row="1" class="text-input"
                                    v-model="supplier.company_address"
                                />
                            </GridLayout>
                        </GridLayout>

                        <!-- <GridLayout ref="product_description" class="box-input" row="3" >
                            <GridLayout rows="auto,auto">
                                <Label row="0" ref="inputPDLabel" 
                                class="box-input-label" text="Status" />
                                <TextField row="1" class="text-input"
                                    v-model="supplier.status"
                                />
                            </GridLayout>
                        </GridLayout> -->

                        <GridLayout row="4" columns="*,*">
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
  import axios from "axios";

  export default {
    data(){
      return {
        supplier: {
        },
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
            if(this.supplier.company_name != null &&
                this.supplier.contact_no != null &&
                this.supplier.company_address != null ){

                    this.supplier.status = true;
                    this.supplier.created_by = this.$root.localStorage.users_id;
                    this.supplier.created_at = 'today';

                    this.showLoading = true
                    this.blur = true;

                    await axios({
                        method: "POST",
                        url: this.$root.server+`/add_supplier`, 
                        header: {
                            "Content-Type": "application/json"
                        },
                        data: { ...this.supplier },
                        })
                        .then(result => {

                            axios.get(this.$root.server+`/supplier`)
                            .then(supplier => {
                            this.$root.suppliers = supplier.data
                            console.log("root roles: ", this.$root.suppliers);
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
                                this.supplier.company_name = ""
                                this.supplier.company_address = ""
                                this.supplier.contact_no = ""
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
