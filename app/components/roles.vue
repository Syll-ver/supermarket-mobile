<template>
    <Page class="page">
      <ActionBar class="action-bar banner">
          <!--
          Use the NavigationButton as a side-drawer button in Android
          because ActionItems are shown on the right side of the ActionBar
          -->
          <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"/>
          <!--
          Use the ActionItem for IOS with position set to left. Using the
          NavigationButton as a side-drawer button in iOS is not possible,
          because its function is to always navigate back in the application.
          -->
          <ActionItem icon="res://menu"
                      android:visibility="collapsed"
                      @tap="onDrawerButtonTap"
                      ios.position="left"/>
          <Label class="action-bar-title titles" text="LouGeh Supermarket"/>
      </ActionBar>

      <GridLayout class="page__content">
          <!-- <Label class="page__content-icon fas" text.decode="&#xf015;"/> -->
          <!-- <Label class="page__content-placeholder" :text="message"/> -->
          <StackLayout>
                
                <ListView row="1" class="list-group"
                  for="role in roles" 
                  >
                    <v-template>
                      <GridLayout rows="auto,*"
                        class="list-group">
                          <Label row="0" col="0" class="text-main" :text="role.role_name" textWrap="true" />
                          <Label row="1" col="0" class="text-sub" :text="role.created_at" textWrap="true" />
                          
                      </GridLayout>
                    </v-template>
                    <!-- <ListView.itemTemplate>
                        
                    </ListView.itemTemplate> -->
                </ListView>

            </StackLayout>
      </GridLayout>
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../shared/selected-page-service";

  export default {
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
      }
    },
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Home");
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
    
</style>
