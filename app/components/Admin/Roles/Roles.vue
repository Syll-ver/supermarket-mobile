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
                      text="ROLES"
                      horizontalAlignment="center"
                  />
                  <Label
                      col="2"
                      class="fas p-20"
                      fontSize="16"
                      color="white"
                      :text=" 'fa-ellipsis-v' | fonticon "
                      horizontalAlignment="right" 
                  />
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
                  for="r in $root.roles" >
                    <v-template>
                      <StackLayout >
                        <GridLayout class="list-box" col="*,*">
                            <Label col="0" 
                              fontSize="15"
                              fontWeight="bold" 
                              :text="r.role_name" />
                            <Label col="1" 
                              class="far m-r-10"
                              fontSize="19"
                              horizontalAlignment="right"
                              :text=" 'fa-edit' | fonticon "
                              @tap="update(r)" />
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
        showLoading: false
      }
    },
    components: {
      add,
      edit
    },
    // async created(){
    //    this.showLoading = true;

    //   await axios.get(this.$root.server+`/roles`)
    //     .then(role => {
    //       this.$root.roles = role.data
    //       console.log("root roles: ", this.$root.roles);
    //       this.showLoading = false;
    //     })
    //     .catch(err => console.log(err)); // add this to see if the console is spitting an error.
    // },
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Roles");
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
      update(role){
        this.$showModal(edit, {
          props: {
            role_id: role.role_id,
            roles_code: role.roles_code,
            role_name: role.role_name,
            created_by: role.created_by,
            created_at: role.created_at,
            updated_by: role.updated_by,
            updated_at: role.updated_at
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
