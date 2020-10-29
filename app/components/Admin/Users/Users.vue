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
                        <GridLayout class="list-box" rows="auto,*,*" columns="*,*">
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
              @tap="$showModal(add)" />
        </GridLayout>

        <GridLayout v-show="blur" class="modalBlur">
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
        add: add,
        edit: edit,
        showLoading: false,
        blur: false
      }
    },
    components: {
      add,
      edit
    },
    async created(){
       this.showLoading = true;
       this.blur = true;

      await axios.get(this.$root.server+`/users`)
        .then(role => {
          this.$root.users = role.data
          console.log("root roles: ", this.$root.users);
          this.showLoading = false;
          this.blur = false;

        })
        .catch(err => console.log(err)); // add this to see if the console is spitting an error.
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
        this.$showModal(edit, {
          props: {
            users_id: user.users_id,
            employee_code: user.employee_code,
            username: user.username,
            password: user.password,
            role_id: user.role_id,
            role_name: user.role_name,
            created_by: user.created_by,
            created_at: user.created_at,
            updated_by: user.updated_by,
            updated_at: user.updated_at
          }
        })
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
    
    
</style>
