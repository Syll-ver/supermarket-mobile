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
            <Label class="action-bar-title" text="Browse"/>
        </ActionBar>

        <GridLayout class="page__content">
            <!-- <Label class="page__content-icon far" text.decode="&#xf1ea;"/>
            <Label class="page__content-placeholder" :text="message"/> -->

            <StackLayout>
                
                <ListView row="2" class="list-group"
                  for="role in roles" 
                  >
                    <v-template>
                      <GridLayout row="auto, *"
                        class="list-group">
                          <Label row="0" class="text-main" :text="role.role_name" textWrap="true" />
                          <Label row="1" class="text-sub" :text="role.role_id" textWrap="true" />
                          
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
      SelectedPageService.getInstance().updateSelectedPage("Browse");
    },
    computed: {
      message() {
        return "<!-- Page content goes here -->";
      }
    },
    methods: {
      onDrawerButtonTap() {
        utils.showDrawer();
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
