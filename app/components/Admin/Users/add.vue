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

                    </GridLayout>
                </StackLayout>

                <GridLayout class="form">
                    <GridLayout rows="auto,auto,auto,auto">
                      <GridLayout ref="inputRolename" row="0"
                        class="box-input" >
                         <GridLayout rows="auto,auto">
                              <Label 
                                row="0"
                                ref="inputRNLabel"
                                class="box-input-label" 
                                text="Employee Code"
                                />
                            <TextField 
                                ref="rolename_input"
                                row="1"
                                class="text-input"
                                v-model="user.employee_code"
                                autoCapitalizationType="false"
                                />
                         </GridLayout>
                      </GridLayout>

                      <GridLayout ref="inputRolename" row="0"
                        class="box-input" >
                         <GridLayout rows="auto,auto">
                              <Label 
                                row="0"
                                ref="inputRNLabel"
                                class="box-input-label" 
                                text="Username"
                                />
                            <TextField 
                                ref="rolename_input"
                                row="1"
                                class="text-input"
                                v-model="user.username"
                                autoCapitalizationType="false"
                                />
                         </GridLayout>
                      </GridLayout>

                      <GridLayout ref="inputRolename" row="0"
                        class="box-input" >
                         <GridLayout rows="auto,auto">
                              <Label 
                                row="0"
                                ref="inputRNLabel"
                                class="box-input-label" 
                                text="Role"
                                />
                            <TextField 
                                ref="rolename_input"
                                row="1"
                                class="text-input"
                                v-model="user.role_name"
                                @tap="pickRole()"
                                autoCapitalizationType="false"
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

            <GridLayout v-show="modalBlur" class="modalBlur">
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

            <ActivityIndicator :busy="showLoading" color="white" class="indLog" />

        </FlexboxLayout>

    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../../../shared/selected-page-service";
  import Vue from "nativescript-vue";
  import axios from "axios";
  

  export default {
    data(){
      return {
            user: {
                employee_code: "",
                // role_id: "",
                username: "",
                role_id: "",
                role_name: "",
                created_at: "",
                created_by: "",
                updated_by: "",
                updated_at: ""
            },
            showLoading: false,
            modalBlur: false,
            addItems: false,
            // Roles: Roles
      }
    },
    mounted() {
    },
    created(){
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
            if(this.user.role_name != "" ){
                    // this.$refs.invsubmit.nativeView.isEnabled = 'true';
                    return true;
            } else {
                return false;
            }
        },
        onCancel(){
            this.user.roles_code = ""
            this.user.role_id = ""
            this.user.role_name = ""
            this.user.created_at = ""
            this.user.created_by = ""
            this.user.updated_by = ""
            this.user.updated_at = ""
            this.$modal.close()
        },
        pickRole(){
          this.modalBlur = true;
          this.addItems = true;
        },
        async onSubmit(){

            if(this.user.username != null && 
                this.user.employee_code != null &&
                this.user.role_id != null ){
                
                this.user.password = '1234';
                this.user.created_at = "today";
                this.user.created_by = '38';
                console.log("ROLES: ", this.user);

                this.showLoading = true
                this.blur = true
                await axios({
                    method: "POST",
                    url: this.$root.server+`/new/register`,
                    header: {
                        "Content-Type": "application/json"
                    },
                    data: { ...this.user },
                })
                .then(result => {
                    if(result){
                        console.log("result: ",result);
                        // mutate
                        this.$root.user.push(this.roles)

                        // get stuff from api, re-save to global variable
                        // so ma-edit ang newly added since makuha na man 
                        // ang generated ids.
                        axios.get(this.$root.server+`/users`)
                        .then(user => {
                            this.$root.users = user.data
                            console.log("root users: ", this.$root.users);
                            this.showLoading = false;
                            this.blur = false;
                        })
                        // add this to see if the console is spitting an error.
                        .catch(err => console.log(err)); 
                        
                        // Success
                        this.showLoading = false;
                        alert({
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
                        this.user.employee_code = ""
                        this.user.username = ""
                        this.user.role_id = ""
                        this.user.role_name = ""
                    });
                })
            } else {
                alert({
                    message: 'missing field',
                    okButtonText: 'OK'
                })
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

    .item-modal {
        margin: 50 25 25 25;
        padding: 20;
        border-radius: 20;
        height: 300;
        background-color: #05C5AA;
    }
    
</style>
