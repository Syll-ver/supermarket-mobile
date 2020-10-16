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
          <Label class="action-bar-title titles" text="Suppliers"/>
      </ActionBar>

      <GridLayout class="page__content">
          <!-- <Label class="page__content-icon fas" text.decode="&#xf015;"/> -->
          <!-- <Label class="page__content-placeholder" :text="message"/> -->
          <StackLayout>

            <!-- <StackLayout for="del in delivery">
                <v-template>
                  <Label :text="del.dr_no" textWrap="true" />
                </v-template>
                
            </StackLayout> -->
                
                <ListView row="1" class="list-group"
                  for="user in users" >
                    <v-template>
                      <GridLayout >
                        <GridLayout rows="*,*,*" columns="*,auto">
                          <!-- <Label horizontalAlignment="right" class="text-sub sub-header">
                            <FormattedString>
                              <Span text="₱" />
                              <Span :text="del.total_cost" />
                            </FormattedString>
                          </Label> -->

                          <StackLayout row="1" class="content">
                            <Label class="text-content" :text="user.employee_code + ' ' +user.username" textWrap="true" ></Label>
                            <Label :text="user.role_name"></Label>
                          </StackLayout>
                        </GridLayout>

                      </GridLayout>

                          
                          
                      <!-- </GridLayout> -->
                    </v-template>

                </ListView>

            </StackLayout>

        <!-- <ActivitiIndicator busy="{{ isLoading }}" /> -->

      </GridLayout>
    </Page>
</template>

<script>
  import * as utils from "~/shared/utils";
  import SelectedPageService from "../shared/selected-page-service";

  export default {
    data(){
      return {
        users: [
            {
            users_code: 1,
            employee_code: 153,
            username: "Maximus",
            password: "emp",
            role_id: 1,
            role_name: "admin",
            created_at: "May 02, 2020",
            created_by: 153,
            updated_by: null,
            updated_at: null,
            
            },
            {
            users_code: 2,
            employee_code: 154,
            username: "MsCashier",
            password: "emp",
            role_id: 2,
            role_name: "cashier",
            created_at: "May 02, 2020",
            created_by: 153,
            updated_by: null,
            updated_at: null
            },
            {
            users_code: 3,
            employee_code: 155,
            username: "Custody",
            password: "emp",
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
      
    }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
    
</style>
