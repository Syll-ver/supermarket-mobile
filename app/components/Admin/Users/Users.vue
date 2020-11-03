<template>
    <Page class="page" actionBarHidden="true">

      <GridLayout class="page__content">

        <GridLayout>
            <GridLayout class="bg-back">
            </GridLayout>
        </GridLayout>

        <GridLayout rows="auto,auto,*">

          <GridLayout>
            <StackLayout class="m-t-25">
              <GridLayout class="m-b-20" row="0" columns="*,auto,*">
                  <Label
                      col="0"
                      class="fas p-20"
                      fontSize="16"
                      color="white"
                      :text=" 'fa-bars' | fonticon "
                      horizontalAlignment="left"
                      @tap="onDrawerButtonTap"
                  />
                  <Label
                      col="1"
                      class="brand-name"
                      text="USERS"
                      horizontalAlignment="center"
                  />
                  <!-- <Label
                      col="2"
                      class="fas p-20"
                      fontSize="16"
                      color="white"
                      :text=" 'fa-ellipsis-v' | fonticon "
                      horizontalAlignment="right" 
                  /> -->
              </GridLayout>
            </StackLayout>
          </GridLayout>

          <GridLayout row="1" columns="*,*">
            <Label
              col="0"
              class="fas p-20"
              fontSize="16"
              color="white"
              :text=" 'fa-sort-alpha-up' | fonticon " 
              horizontalAlignment="left"
            />
            <Label
              col="1"
              class="fas p-20"
              fontSize="16"
              color="white"
              :text=" 'fa-filter' | fonticon "
              horizontalAlignment="right" 
            />
          </GridLayout>
          <GridLayout row="2">
            <StackLayout ref="inventoryList">

                <ListView row="1" class="list-group" height="670"
                separatorColor="transparent"
                  for="r in $root.users" >
                    <v-template>
                      <StackLayout >
                        <GridLayout class="list-box"
                          androidElevation="5"
                          rows="auto,*,*" columns="*,*">
                            <GridLayout row="1" col="0" horizontalAlignment="left" >
                              <Label :text="'Employee Code: '+r.employee_code" />
                            </GridLayout>
                            <Label row="0" col="1" rowSpan="2" 
                            class="far m-r-10"
                            fontSize="19"
                            horizontalAlignment="right"
                            :text=" 'fa-edit' | fonticon "
                            @tap="update(r)" />
                            <GridLayout row="2" col="0" 
                              margin="0"
                              padding="0"
                              borderRadius="20"
                              horizontalAlignment="left" >
                              <Label 
                                fontWeight="bold"
                                :text=" 'Role: '+r.role_name" />
                            </GridLayout>
                            <Label 
                              row="0" col="0"
                              fontSize="15"
                              fontWeight="bold" 
                              :text="r.username" />
                        </GridLayout>
                      </StackLayout>
                    </v-template>

                </ListView>

            </StackLayout>
              
          </GridLayout>
        </GridLayout>

        <GridLayout class="fabbtn">
            <Button 
              class="fas floatingbutton" 
              :text=" 'fa-plus' | fonticon " 
              fontSize="19"
              color="white"
              @tap="addUserModal()" />
        </GridLayout>

        <GridLayout v-show="blur" class="greyBlur">
        </GridLayout>

        <GridLayout v-show="modalBlur" class="blur">
        </GridLayout>

        <GridLayout v-show="addUser" class="item-modal" rows="auto,*,auto">
            <GridLayout row="0">
                <GridLayout columns="*,auto">
                      <Label 
                          class="modal-label" col="0" 
                          text="Add User"
                          fontSize="15"
                          color="white"
                          fontWeight="bold"
                          horizontalAlignment="center"
                          />

                  </GridLayout>
            </GridLayout>
            <GridLayout row="1">
                <GridLayout rows="auto,auto,auto">
                  <GridLayout ref="inputRolename" row="0"
                    v-bind:class=" [inputEmpCode == true ? 'box-input' : 'red-box-input']" >
                      <GridLayout rows="auto,auto">
                          <Label 
                            row="0"
                            ref="inputRNLabel"
                            v-bind:class=" [inputEmpCode == true ? 'greenLabel' : 'redLabel']"
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
                    v-bind:class=" [inputUname == true ? 'box-input' : 'red-box-input']" >
                      <GridLayout rows="auto,auto">
                          <Label 
                            row="0"
                            ref="inputRNLabel"
                            v-bind:class=" [inputUname == true ? 'greenLabel' : 'redLabel']" 
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
                    v-bind:class=" [inputRole == true ? 'box-input' : 'red-box-input']" >
                      <GridLayout rows="auto,auto">
                          <Label 
                            row="0"
                            ref="inputRNLabel"
                            v-bind:class=" [inputRole == true ? 'greenLabel' : 'redLabel']" 
                            text="Role"
                            />
                        <TextField 
                            ref="rolename_input"
                            row="1"
                            class="text-input"
                            v-model="user.role_name"
                            @tap="rolePicker()"
                            autoCapitalizationType="false"
                            />
                      </GridLayout>
                  </GridLayout>
                </GridLayout>
            </GridLayout>
            <GridLayout row="2" columns="*,*">
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

      <GridLayout v-show="updateUser" class="item-modal" rows="auto,*,auto">
            <GridLayout row="0">
                <GridLayout columns="*,auto">
                      <Label 
                          class="modal-label" col="0" 
                          text="Update User"
                          fontSize="15"
                          color="white"
                          fontWeight="bold"
                          horizontalAlignment="center"
                          />

                  </GridLayout>
            </GridLayout>
            <GridLayout row="1">
                <GridLayout rows="auto,auto,auto">
                  <GridLayout ref="inputRolename" row="0"
                    v-bind:class=" [inputEmpCode == true ? 'box-input' : 'red-box-input']" >
                      <GridLayout rows="auto,auto">
                          <Label 
                            row="0"
                            ref="inputRNLabel"
                            v-bind:class=" [inputEmpCode == true ? 'greenLabel' : 'redLabel']"
                            text="Employee Code"
                            />
                        <TextField 
                            ref="rolename_input"
                            row="1"
                            class="text-input"
                            v-model="update.employee_code"
                            autoCapitalizationType="false"
                            />
                      </GridLayout>
                  </GridLayout>

                  <GridLayout ref="inputRolename" row="1"
                    v-bind:class=" [inputUname == true ? 'box-input' : 'red-box-input']" >
                      <GridLayout rows="auto,auto">
                          <Label 
                            row="0"
                            ref="inputRNLabel"
                            v-bind:class=" [inputUname == true ? 'greenLabel' : 'redLabel']" 
                            text="Username"
                            />
                        <TextField 
                            ref="rolename_input"
                            row="1"
                            class="text-input"
                            v-model="update.username"
                            autoCapitalizationType="false"
                            />
                      </GridLayout>
                  </GridLayout>

                  <GridLayout ref="inputRolename" row="2"
                    v-bind:class=" [inputRole == true ? 'box-input' : 'red-box-input']" >
                      <GridLayout rows="auto,auto">
                          <Label 
                            row="0"
                            ref="inputRNLabel"
                            v-bind:class=" [inputRole == true ? 'greenLabel' : 'redLabel']" 
                            text="Role"
                            />
                        <TextField 
                            ref="rolename_input"
                            row="1"
                            class="text-input"
                            v-model="update.role_name"
                            @tap="rolePicker()"
                            autoCapitalizationType="false"
                            />
                      </GridLayout>
                  </GridLayout>
                </GridLayout>
            </GridLayout>
            <GridLayout row="2" columns="*,*">
                <Button
                  col="0"
                  class="btn-cancel"
                  text="CANCEL"
                  @tap="onCancelUpdate()"
                />
                <Button
                  col="1"
                  class="btn-submit"
                  text="OK"
                  @tap="onUpdate()"
                />
            </GridLayout>
        </GridLayout>

      <GridLayout class="rolePicker" v-show="isItemVisible" rows="*,auto">
          <GridLayout row="0">
            <ListView for="sup in $root.roles">
                <v-template>
                    <StackLayout>
                        <GridLayout>
                            <Label :text="sup.role_name" @tap="pickRole(sup)" />
                        </GridLayout>
                    </StackLayout>
                </v-template>
            </ListView>
          </GridLayout>
          <GridLayout row="1">
              <Button backgroundColor="#f5f5f5" row="2" horizontalAlignment="center" text="CANCEL" @tap="onCancelPicker()" />
          </GridLayout>
      </GridLayout>

      

      <ActivityIndicator :busy="showLoading" color="#05C5AA" class="indLog" />


      </GridLayout>
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../../../shared/selected-page-service";
  import add from "./add";
  import edit from "./edit";
  import axios from "axios";

  export default {
    data(){
      return {
        user: {},
        add: add,
        edit: edit,
        showLoading: false,
        isItemVisible: false,
        updateUser: false,
        addUser: false,
        modalBlur: false,
        blur: false,
        inputEmpCode: true,
        inputUname: true,
        inputRole: true
      }
    },
    components: {
      add,
      edit
    },
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Users");
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
      update(user){
        this.update = user;
        console.log("update", this.update);
        this.updateUser = true;
        this.blur = true;
      },
      addUserModal(){
        this.addUser = true; // add user
        this.blur = true; 
      },
      onCancel(){
            this.user.employee_code = ""
            this.user.username = ""
            this.user.password = ""
            this.user.role_id = ""
            this.user.role_name = ""
            this.user.created_at = ""
            this.user.created_by = ""
            this.user.updated_by = ""
            this.user.updated_at = ""
            this.addUser = false;
            this.blur = false;
      },
      onCancelUpdate(){
        this.updateUser = false;
        this.blur = false;
      },
      onCancelPicker(){
        this.isItemVisible = false; //rolepicker
      },
      rolePicker(){
        this.modalBlur = true;
        this.isItemVisible = true; //rolepicker
      },
      pickRole(role){
        this.user.role_id = role.role_id;
        this.update.role_id = role.role_id;
        this.user.role_name = role.role_name;
        this.update.role_name = role.role_name;
          this.modalBlur = false;
          this.isItemVisible = false;
          console.log("user: ", this.user);
          console.log("user: ", this.update);
        },
      async onSubmit(){

            if(this.user.username != null && 
                this.user.employee_code != null &&
                this.user.role_name != null ){
                
                this.user.password = '1234';
                this.user.created_at = "today";
                this.user.created_by = this.$root.localStorage.users_id;
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
                        this.user.employee_code = ""
                        this.user.username = ""
                        this.user.role_id = ""
                        this.user.role_name = ""

                        this.addUser = false; // add user
                        this.blur = false; 
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
                        
                    });
                })
            } else {

              if(this.user.username == null){
                this.inputUname = false;
              } else {
                this.inputUname = true;
              }

              if(this.user.employee_code == null){
                this.inputEmpCode = false;
              } else {
                this.inputEmpCode = true;
              }

              if(this.user.role_name == null){
                this.inputRole = false;
              } else {
                this.inputRole = true;
              }

            }

      },
      async onUpdate(){
           if(this.update.username != null && 
                this.update.employee_code != null &&
                this.update.role_name != null ){
                this.update.password = '1234';
                this.update.updated_at = "today";
                this.update.updated_by = this.$root.localStorage.users_id;
                console.log("ROLES: ", this.update);

                this.showLoading = true
                this.blur = true
                await axios({
                    method: "PUT",
                    url: this.$root.server+`/user/`+this.update.users_id,
                    header: {
                        "Content-Type": "application/json"
                    },
                    data: { ...this.update },
                })
                .then(result => {
                  console.log("result", result);
                    if(result){
                        console.log("result: ",result);

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
                        this.update.employee_code = ""
                        this.update.username = ""
                        this.update.role_id = ""
                        this.update.role_name = ""

                        this.updateUser = false; // add user
                        this.blur = false; 
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
                        
                    });
                })
            } else {

              if(this.update.username == null){
                this.inputUname = false;
              } else {
                this.inputUname = true;
              }

              if(this.update.employee_code == null){
                this.inputEmpCode = false;
              } else {
                this.inputEmpCode = true;
              }

              if(this.update.role_name == null){
                this.inputRole = false;
              } else {
                this.inputRole = true;
              }

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
    .page {
      background: #f5f5f5;
    }

    .bg-back {
      background-color: #05C5AA;
      border-radius: 0 0 60 60;
      margin-bottom: 530;
    }

    .list-box {
      background-color: #ffffff;
      color: #009688;
      padding: 20;
      margin: 5;
      border-radius: 20;
    }

    .item-modal {
        margin: 0 35 25 35;
        padding: 0 35 20 35;
        border-radius: 5;
        height: 330;
        background-color: #05C5AA;
    }

    .btn-cancel {
      background-color: #9e9e9e;
      border-radius: 20;
      height: 40;
      color: white;
      font-weight: bold;
    }

    .greyBlur{
      background-color: grey;
      opacity: 0.5;
    }

    .btn-submit {
      background-color: white;
      border-radius: 20;
      height: 40;
      color: #009688;
      font-weight: bold;
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


    .modal-label {
        margin-top: 5;
        margin-left: 15;
        margin-bottom: 15;
        text-align: left;
        font-weight: bold;
    }

    .rolePicker {
      height: 300;
      background-color: white;
      border-radius: 20;
      padding: 20 20 15 20;
      margin: 50 25 25 25;
    }

    
    
</style>
