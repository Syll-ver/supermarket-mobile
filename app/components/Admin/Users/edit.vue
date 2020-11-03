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
                            text="Update User"
                            color="white"
                            fontWeight="bold"
                            horizontalAlignment="center"
                            />
                        <!-- <Button class="modal-btn" col="1" text="x" @tap="$modal.close" /> -->
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

                      <GridLayout ref="inputRolename" row="1"
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

                      <GridLayout ref="inputRolename" row="2"
                        class="box-input" >
                         <GridLayout rows="auto,auto">
                              <Label 
                                row="0"
                                ref="inputRNLabel"
                                class="box-input-label" 
                                text="Role"
                                />
                            <Label 
                                ref="rolename_input"
                                row="1"
                                class="text-input"
                                v-model="user.role_name"
                                autoCapitalizationType="false"
                                @tap="pickRole()"
                                />
                         </GridLayout>
                      </GridLayout>

                      <GridLayout row="3" columns="*,*">
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
                <ListView for="i in $root.roles">
                    <v-template>
                        <StackLayout>
                            <GridLayout>
                                <Label 
                                    color="white"
                                    fontSize="14"
                                    fontWeight="bold"
                                    :text="i.role_name" @tap="selectRole(i)" />
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

        <GridLayout v-show="blur" class="blur">
        </GridLayout>

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
  import actions from "../../../store/actions";


  export default {
      props: [
        'users_id',
        'employee_code',
        'username',
        'password',
        'role_id',
        'role_name',
        'created_by',
        'created_at',
        'updated_by',
        'updated_at',
      ],
    data(){
      return {
        user: {
            users_id: this.users_id,
            employee_code: this.employee_code,
            username: this.username,
            password: this.password,
            role_id: this.role_id,
            role_name: this.role_name,
            created_by: this.created_by,
            created_at: this.created_at,
            updated_by: this.updated_by,
            updated_at: this.updated_at
        },
        showLoading: false,
        addItems: false,
        blur: false,
      }
    },
    async created(){
       if(!this.$root.roles){
           this.showLoading = true;
            this.blur = true;

            await axios.get(this.$root.server+`/roles`)
                .then(role => {
                this.$root.roles = role.data
                console.log("root roles: ", this.$root.roles);
                this.showLoading = false;
                this.blur = false;

                })
                .catch(err => console.log(err));
       } // add this to see if the console is spitting an error.
    },
    methods: {
        onCancel(){
            this.$modal.close();
        },
        async onSubmit(){
            console.log("user", this.user);
            // edit on newly added kay mag fail kay auto generated man ang ids 
            // therefore on push kay wala siya :((
            if((this.user.username != null) &&
                (this.user.role_name != null ) ){
                    this.user.password = '1234';
                    this.user.updated_by = this.$root.localStorage.users_id;
                    this.user.updated_at = 'today';
                    console.log("roleuser: ", this.user);

                    this.showLoading = true
                    // await axios({
                    //     method: "PUT",
                    //     url: this.$root.server+`/user/`+this.user.users_id, 
                    //     header: {
                    //         "Content-Type": "application/json"
                    //     },
                    //     data: { ...this.users },
                    //     })
                    //     .then(result => {
                    //         console.log("result", result.data.msg);
                    //         if(result) {
                                
                    //             // // mutate 
                    //             // const userList = this.$root.user.findIndex(x => x.users_id === this.user.users_id)
                    //             // this.$root.user.splice(userList, 1);
                    //             // this.$root.user.push(this.user)

                    //             console.log("new: ", this.$root.user);

                    //             alert({
                    //                 // title: "Success",
                    //                 message: "Success",
                    //                 okButtonText: "OK"
                    //                 }).then(() => {
                    //                 console.log("Alert dialog closed");
                    //             });
                    //             this.$modal.close();
                    //         }
                    //     })
                    //     .catch(err => {
                    //         console.log("error", err);
                    //         this.showLoading = false;
                    //         alert({
                    //             title: "Fail",
                    //             message: err.response.data.msg,
                    //             okButtonText: "OK"
                    //             }).then(() => {
                    //             console.log("Alert dialog closed");
                    //         });
                    //     })
            } else {
                return false;
                
            }
            
        },
        pickRole(){
            console.log("clicked");
            this.$modal.close();
            this.addItems = true;
            
        },
        selectRole(i){
            this.user.role_id = i.role_id
        }

    
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
