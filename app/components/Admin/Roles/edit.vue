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
                            text="Update Role"
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
                                ref="rolename_input"
                                row="1"
                                class="text-input"
                                v-model="roles.role_name"
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
        'role_id',
        'roles_code',
        'role_name',
        'created_by',
        'created_at',
        'updated_by',
        'updated_at'
      ],
    data(){
      return {
        roles: {
            role_id: this.role_id,
            roles_code: this.roles_code,
            role_name: this.role_name,
            created_by: this.created_by,
            created_at: this.created_at,
            updated_by: this.updated_by,
            updated_at: this.updated_at
        },
        showLoading: false
      }
    },
    methods: {
        onCancel(){
            this.$modal.close();
        },
        async onSubmit(){
            console.log("roles", this.roles);
            // edit on newly added kay mag fail kay auto generated man ang ids 
            // therefore on push kay wala siya :((
            if(this.roles.role_name != "" ){
                    
                    this.roles.updated_by = '38';
                    this.roles.updated_at = 'today';
                    console.log("role: ", this.roles);

                    this.showLoading = true
                    await axios({
                        method: "PUT",
                        url: this.$root.server+`/role/`+this.roles.role_id, 
                        header: {
                            "Content-Type": "application/json"
                        },
                        data: { ...this.roles },
                        })
                        .then(result => {
                            console.log("result", result.data.msg);
                            if(result) {
                                
                                // mutate 
                                const roleList = this.$root.roles.findIndex(x => x.role_id === this.roles.role_id)
                                this.$root.roles.splice(roleList, 1);
                                this.$root.roles.push(this.roles)

                                console.log("new: ", this.$root.roles);

                                alert({
                                    // title: "Success",
                                    message: result.data.msg,
                                    okButtonText: "OK"
                                    }).then(() => {
                                    console.log("Alert dialog closed");
                                });
                                this.$modal.close();
                            }
                        })
                        .catch(err => {
                            console.log("error", err);
                            this.showLoading = false;
                            alert({
                                title: "Fail",
                                message: err.response.data.msg,
                                okButtonText: "OK"
                                }).then(() => {
                                console.log("Alert dialog closed");
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
