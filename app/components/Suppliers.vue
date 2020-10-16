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

          <StackLayout>

                <ListView row="1" class="list-group"
                  for="sup in suppliers" >
                    <v-template>
                      <GridLayout >
                        <GridLayout rows="*,*,*" columns="*,auto">
                          <StackLayout row="1" class="content">
                            <Label class="text-content" :text="sup.company_name" textWrap="true" ></Label>
                            <Label :text="sup.contact_no"></Label>
                            <Label :text="sup.company_address"></Label>
                          </StackLayout>
                        </GridLayout>

                      </GridLayout>

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
        suppliers: [
            {
            supplier_code: 1,
            supplier_id: 1234582,
            company_name: "Beech Lasagna Corporation",
            contact_no: "+1-767-5554-872",
            company_address: "1631 Goehring Rd #334, New Brighton, PA, 15066",
            status: 1,
            created_at: "May 02, 2020",
            created_by: 153,
            updated_by: null,
            updated_at: null
            },
            {
            supplier_code: 2,
            supplier_id: 1234578,
            company_name: "Hirez Bugladins",
            contact_no: "+1-767-5554-872",
            company_address: "130 Shadowbrook Dr, Hillsborough, NC, 27278",
            status: 1,
            created_at: "May 02, 2020",
            created_by: 153,
            updated_by: null,
            updated_at: null
            },
            {
            supplier_code: 3,
            supplier_id: 1234569,
            company_name: "Wall Maria",
            contact_no: "+1-767-5554-872",
            company_address: "6 Ducks Head, New Castle, NH, 03854",
            status: 1,
            created_at: "May 02, 2020",
            created_by: 153,
            updated_by: null,
            updated_at: null
            },
            {
            supplier_code: 4,
            supplier_id: 1234580,
            company_name: "TENCENT Spy Laboratory",
            contact_no: "+1-767-5554-872",
            company_address: "Po Box 831, Sultan, WA, 98294",
            status: 1,
            created_at: "May 02, 2020",
            created_by: 153,
            updated_by: null,
            updated_at: null
            },
            {
            supplier_code: 5,
            supplier_id: 1234581,
            company_name: "Bucks Milwaukee",
            contact_no: "+1-767-5554-872",
            company_address: "Po Box 141, Bettsville, OH, 44815",
            status: 0,
            created_at: "May 02, 2020",
            created_by: 153,
            updated_by: null,
            updated_at: null
            }
        ],
      }
    },
    mounted() {
      SelectedPageService.getInstance().updateSelectedPage("Suppliers");
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
