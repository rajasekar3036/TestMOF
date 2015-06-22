define([
    'kendo',
    'text!UserTemplate'
], function (kendo, UserTemplate) {
    return kendo.data.ObservableObject.extend({
        UserDataSource: null,
        init: function (listView)
        {
            debugger;
            //var self = this;
            //var userUrl = baseUrl + "/GetCustomers?User_Id=" + Global.selected_User_Id;
            //debugger;
            kendo.data.ObservableObject.fn.init.apply(self, []);
            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        contentType: "application/json; charset=utf-8",
                        type: "GET"
                        , url: baseUrl + "/GetUsers"
                        , dataType: "json"
                    }
                }, schema: {
                    data: "d"
                },
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
                pageSize: 10
            });

            listView.kendoMobileListView({
                dataSource: dataSource
                , template: kendo.template(UserTemplate)
                //,filterable: true 
                //, filterable: {
                //    field: "Value",
                //    operator: "startswith"
                //},
            });
            debugger;
            self.set("UserDataSource", dataSource);
        },
        login_Detail: function (e) {

            var loginUrl = baseUrl + "/GetUserInfo?user=" + Global.user_name + "&pass=" + Global.password;

            debugger;
            $.ajax({
                type: "GET",
                url: loginUrl,
                cache: false,
                dataType: "json",
                success: function (data, statusText, xhr) {
                    debugger;
                    var selected_offer = data;
                    debugger;
                }, error: function (xhr, ajaxOptions, thrownError) {
                    debugger;//Add these parameters to display the required response
                }

            });
        },



        //Customer_load: function (listView) {
        //    var UserId =data('User_Id');
        //    var user_list_url = baseUrl + "/getCustomerByUserId"
        //    $.ajax({
        //        type: "GET",
        //        url: get_selected_user_detail,
        //        cache: false,
        //        dataType: "json",
        //        success: function (data, statusText, xhr) {
        //            var selected_user = data[0];
        //            new_user_model.id = selected_user.id;
        //            //new_vehicle_model.brand_id = selected_vehicle.vehicle_brand_id;
        //            //new_vehicle_model.model_id = selected_vehicle.model_id[0];
        //            //new_vehicle_model.license_plate = selected_vehicle.license_plate;

        //            console.log(new_user_model);
        //            ////window.app.kendoApp.navigate('#add_customer_vehicle', 'slide:right');
        //            ////kendo.bind($("#add_customer_vehicle"), new_vehicle_model);

        //        }, error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
        //        }
        //    });

        //    var self = this;

        //    kendo.data.ObservableObject.fn.init.apply(self, []);

        //    console.log(baseUrl + "/GetCustomer?UserId=" + Global.User_Id);

        //    var dataSource = new kendo.data.DataSource({
        //        transport: {
        //            read: {
        //                type: "POST"
        //                , url: baseUrl + "/getCustomerByUserId?UserId=" + Global.User_Id
        //                , dataType: "json"
        //            }
        //        },
        //        serverPaging: true,
        //        serverFiltering: true,
        //        serverSorting: true,
        //        pageSize: 10
        //    });

        //    listView.kendoMobileListView({
        //        dataSource: dataSource
        //        , template: kendo.template(UserId)
        //        //,filterable: true 
        //        , filterable: {
        //            field: "name",
        //            operator: "startswith"
        //        },

        //    });

        //    //Global.customer_vehicle_template = customerVehicleTemplate;
        //    //Global.customer_phone_email_template = customer_phone_email_template;
        //    //Global.create_job_from_order_edit_page = -1;

        //    self.set("offerDataSource", dataSource);
        //},

        //    userdetail_load: function (e) {
        //        debugger;
        //        var User_ID = attr('data-User-Id');
        //        Global.selected_User_Id = User_Id;
        //        debugger;
        //        app.kendoApp.navigate('#user_list_detail', 'slide:right');
        //    }, bind_user_detail: function (e) {

        //        var user_list_url = baseUrl + "/GetuserDetail?UserId=" + Global.selected_User_ID;

        //        debugger;
        //        $.ajax({
        //            type: "GET",
        //            url: user_list_url,
        //            cache: false,
        //            dataType: "json",
        //            success: function (data, statusText, xhr) {
        //                debugger;
        //                var selected_user = data;
        //                debugger;
        //            }, error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
        //            }

        //        });
        //    }

        //})
    })
});