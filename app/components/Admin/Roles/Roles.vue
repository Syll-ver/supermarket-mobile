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
                  for="role in roles" >
                    <v-template>
                      <StackLayout >
                        <GridLayout class="list-box" col="*,*">
                            <Label col="0" 
                              fontSize="15"
                              fontWeight="bold" 
                              :text="role.role_name" />
                            <Label col="1" 
                              class="far m-r-10"
                              fontSize="19"
                              horizontalAlignment="right"
                              :text=" 'fa-edit' | fonticon " />
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

      <!-- <ActivityIndicator :busy="showLoading" color="white" class="indLog" /> -->


      </GridLayout>
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../../../shared/selected-page-service";
  import add from "./add";

  export default {
    props: ["roleModal"],
    data(){
      return {
        roles: [
          {
            roles_code: 11,
            role_id: 1,
            role_name: "admin",
            created_at: "May 02, 2020",
            created_by: 153,
            updated_by: null,
            updated_at: null
          },
          {
            roles_code: 12,
            role_id: 2,
            role_name: "cashier",
            created_at: "May 02, 2020",
            created_by: 153,
            updated_by: null,
            updated_at: null
          },
          {
            roles_code: 13,
            role_id: 3,
            role_name: "custodian",
            created_at: "May 02, 2020",
            created_by: 153,
            updated_by: null,
            updated_at: null
          }
        ],
        add: add
      }
    },
    components: {
      add
    },
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
      methods: {
        creatingView: function(args) {
            const nativeView = new android.widget.TextView(args.context);
            nativeView.setSingleLine(true);
            nativeView.setEllipsize(android.text.TextUtils.TruncateAt.END);
            nativeView.setText("Native View - Android");
            args.view = nativeView;
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
    
    
</style>
