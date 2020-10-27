<template>
    <Page class="modal-page" actionBarHidden="true">

        <FlexboxLayout class="page">
            <StackLayout >
                <StackLayout class="modal-banner">
                    <GridLayout columns="*,auto">
                        <Label 
                            class="modal-label" col="0" 
                            text="Add Role"
                            color="white"
                            fontWeight="bold"
                            horizontalAlignment="center"
                            />
                        <!-- <Button class="modal-btn" col="1" text="x" @tap="$modal.close" /> -->
                    </GridLayout>
                </StackLayout>

                <GridLayout class="form">
                    <GridLayout rows="auto,auto">
                      <GridLayout ref="inputRolename" row="0"
                        class="box-input" >
                         <GridLayout rows="auto,auto">
                              <Label 
                                row="0"
                                ref="inputRNLabel"
                                class="box-input-label" 
                                text="Role Name"
                                />
                            <TextField 
                                row="1"
                                class="text-input"
                                v-model="roles.role_name"
                                keyboardType="number"
                                @blur="check()"
                                />
                         </GridLayout>
                      </GridLayout>

                      <GridLayout row="1" columns="*,*">
                          <Button
                            col="0"
                            class="btn-cancel"
                            text="CANCEL"
                            @tap="onCancel()"
                          />
                          <Button
                            col="1"
                            class="btn-submit"
                            text="OK"
                            @tap="onSubmit()"
                          />
                      </GridLayout>
                    </GridLayout>
                </GridLayout>

            </StackLayout>
        </FlexboxLayout>

    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../../../shared/selected-page-service";
  import Vue from "nativescript-vue";
//   import Roles from "../../Roles";

  

  export default {
    data(){
      return {
            roles: {
                roles_code: "",
                role_id: "",
                role_name: "",
                created_at: "",
                created_by: "",
                updated_by: "",
                updated_at: ""
            },
            // Roles: Roles
      }
    },
    mounted() {

    },
    computed: {
      message() {
        return "<!-- Page content goes here -->";
      }
    },
    components: {
        // Roles
    },
    methods: {
        sample() {
            // console.log("br: " + this.inventory.barcode);
            // console.log("$refs: ", this.$refs.inputBar.getViewById);
            
        },
        validate(){
            if(this.roles.role_name != "" ){
                    // this.$refs.invsubmit.nativeView.isEnabled = 'true';
                    return true;
            } else {
                return false;
            }
        },
    
        check(){
            // fieldcolor = 
            if(this.roles.role_name == ''){
                this.$refs.inputRNLabel.nativeView.color = "#DD0000";
                this.$refs.inputRolename.nativeView.borderColor = "#DD0000";
            } else {
                this.$refs.inputRNLabel.nativeView.color = "#0a8171";
                this.$refs.inputRolename.nativeView.borderColor = "#e6e6e6";
            }

        },
        onCancel(){
            this.roles.roles_code = ""
            this.roles.role_id = ""
            this.roles.role_name = ""
            this.roles.created_at = ""
            this.roles.created_by = ""
            this.roles.updated_by = ""
            this.roles.updated_at = ""
            this.$modal.close()
        },
        onSubmit(){
            console.log("ROLES: ", this.roles);


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
        // height: 60;
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

    .modal-label {
        margin-top: 12;
        margin-left: 15;
        text-align: left;
        text-transform: uppercase;
        font-weight: bold;
    }

    .modal-submit {
        // color: #009688;
        // background-color: #0a8171;
        border-radius: 12;
        text-transform: uppercase;
        font-weight: bold;
        margin-top: 30;
    }

    .modal-cancel-btn {
        color: white;
        background-color: grey;
        border-radius: 12;
        text-transform: uppercase;
        font-weight: bold;
        margin-top: 30;
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
