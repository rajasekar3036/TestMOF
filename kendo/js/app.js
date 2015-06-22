define([
    'kendo',
    './app/Garage/GarageViewModel',
    './app/Customer/CustomerViewModel',   
    './app/Orders/OrdersViewModel',
    './app/Brand/BrandViewModel',
     './app/Offer/OfferViewModel',
     './app/User/UserViewModel',
     './app/Role/RoleViewModel',
     './app/CustomerSubtitle/CustomerSubtitleViewModel',
     './app/Cards/CardsViewModel',
], function (kendo, garageViewModel, customerViewModel, ordersViewModel, brandViewModel, offerViewModel, userViewModel, RoleViewModel, customersubtitleViewModel, cardsViewModel) {
     
    var os = kendo.support.mobileOS;
    var statusBarStyle = os.ios && os.flatVersion >= 700 ? "black-translucent" : "black";
    var customerList = [];
    return {
        kendoApp: null,
        garageService: {
            viewModel: null
        },
        customerService: {
            viewModel: null
        },
        ordersService: {
            viewModel: null
        },
        brandService: {
            viewModel: null

        },
        offerService: {
            viewModel: null
        },
        userService: {
            viewModel: null

        },
        RoleService: {
            viewModel: null
        },
        CustomerSubtitleService: {
            viewModel: null
        },
        cardsService: {
            viewModel: null

        },
        init: function () {
            this.kendoApp = new kendo.mobile.Application(document.body, { platform: "ios7", layout: "layout", statusBarStyle: statusBarStyle });
            //loadInGarage();
        },
        load_CustomerSubtitle: function (e) {
            
            $("#txt_user_fname").val(Global.first_name);
            $("#txt_user_lname").val(Global.last_name);
            $("#txt_user_email").val(Global.email);
            $("#txt_user_mobile").val(Global.mobile);

            app.CustomerSubtitleService.viewModel = new customersubtitleViewModel(e.view.element.find("#CustomerSubtitle_list_ul"));            
            kendo.bind($("#user_list"), app.CustomerSubtitleService.viewModel);
        },
        load_Customer: function (e) {
            app.customerService.viewModel = new customerViewModel(e.view.element.find("#customer_list_ul"));
            kendo.bind($("#customer_list"), app.customerService.viewModel);

        },
        //load_CustomerSubtitle: function (e) {
        //    app.customersubtitleService.viewModel = new customersubtitleViewModel(e.view.element.find("#customersubtitle_list_ul"));
        //    kendo.bind($("#customersubtitle_list"), app.customersubtitlerService.viewModel);
        //},
        loadInGarage: function (e) {
            app.garageService.viewModel = new garageViewModel(e.view.element.find("#garage_list_ul"));
            kendo.bind($("#garage_list"), app.garageService.viewModel);
        },
        loadOrder: function (e) {
            app.ordersService.viewModel = new ordersViewModel(e.view.element.find("#order_list_ul"));
            kendo.bind($("#order_list"), app.ordersService.viewModel);
        },
        log_click: function (e) {
            var form = $(e.button).closest('#login');
            var user_name = $(form).find("#usr_name");
            var password = $(form).find("#usr_password");
            var loginUrl = baseUrl + "/GetUserInfo?user=" + $(user_name).val() + "&pass=" + $(password).val();
            //debugger;
            //var userUrl = baseUrl + "/getUsers/";
            var jsonString = {
                user: $(user_name).val(),
                pass: $(password).val()
            };
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: loginUrl,
                data: JSON.stringify(jsonString),
                success: function(data){
                    if (data.d != '')
                    {
                        debugger;
                        var user = data.d;
                        Global.user_id = user.Id;
                        Global.customer_id = user.CustomerId,
                        Global.user_name = jsonString.user;
                        Global.first_name = user.FirstName;
                        Global.last_name = user.LastName;
                        Global.mobile = user.Mobile;
                        Global.email = user.Email;
                        //debugger;

                        window.app.kendoApp.navigate('#barcode_scan', 'slide:right');
                    }
                }, error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
                    alert(thrownError);
                }
            });                         
        },
        log_click_Save: function (e) {                                 

            var First_Name = $("#txt_user_fname").val();
            var Last_Name = $("#txt_user_lname").val();
            //var Email = $("#txt_user_email").val();
            var Mobile = $("#txt_user_mobile").val();            
            var loginUrl = baseUrl + "/GetCustomerInfo?First_Name=" + $("#txt_user_fname").val() + "&Last_Name=" + $("#txt_user_lname").val() + "&Mobile=" + Mobile + $("#txt_user_mobile").val() + "&UserId=" + Global.customer_id;
            //var userUrl = baseUrl + "/getCustomer/";
            debugger;

            var jsonString = {
                fname: First_Name,
                lname:Last_Name,
                mobile:Mobile
            };
            //alert("Customer Details saved Successfully");                       
            $.ajax({
                url: loginUrl,
                type: "POST", //This is what you should chage                  
                data:JSON.stringify(jsonString),
                success: function (data) {
                    Global.user_id = data[0].id;
                    Global.user_name = data[0].login;
                    debugger;
                    // Get User detail
                    //$.ajax({
                    //    url: userUrl,
                    //    type: "POST", //This is what you should chage                  
                    //    success: function (data) {
                    //        var UserList = data;
                    //        for (var i = 0; i < UserList.length - 1; i++) {
                    //            if (UserList[i].id == Global.user_id) {
                    //                Global.LoginUser = UserList[i];
                    //                break;
                    //            }
                    //        }
                    //    },
                    //    error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
                    //        debugger;
                    //        alert("user detail not found");
                    //    },
                    //});

                    //debugger;
                    window.app.kendoApp.navigate('#customer_list', 'slide:right');
                },
                error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
                    debugger;
                    Global.user_id = -1;
                    Global.user_name = "";
                    alert(thrownError);
                }
            });
        },
        //alert(this.element.prop("id") + " was clicked!");
        
        remember_me: function (e) {
            if ($("#isRemember").val() == "0") {
                $("#imgremb").attr("src", "images/on.png");
                $("#isRemember").val("1");
            } else {
                $("#imgremb").attr("src", "images/off.png");
                $("#isRemember").val("0");
            }
        },
        barcode_init: function (e) {
            var barcodeTarget = $("#barcodeTarget");

            var pwith = $("#barcode_scan").width();
            var pheight = $("#barcode_scan").height();

            $(barcodeTarget).kendoBarcode({
                value: "2346712",
                type: "Code128",
                width: 200,
                height: 100
            });
        },
        generate_barcode: function (e) {
            //app.ordersService.viewModel = new ordersViewModel(e.view.element.find("#order_list_ul"));
            //kendo.bind($("#order_list"), app.ordersService.viewModel);
            try {
                var barcodeValue = $("#barcodeValue").val();           
                var barcode = $('#barcodeTarget').data('kendoBarcode');
                var len = barcodeValue.length * 25;
                barcode.setOptions({
                    value: barcodeValue,
                    width: len
                });
            } catch (ex) {

            }
        },
        load_brand: function (e) {
            app.brandService.viewModel = new brandViewModel(e.view.element.find("#brand_list_ul"));
            // debugger;
            kendo.bind($("#brand_list"), app.brandService.viewModel);
            // debugger;
        },
        showInBrand: function (e) {
            // debugger;
            if (app.brandService.viewModel.brandDataSource != undefined)
                app.brandService.viewModel.brandDataSource.fetch();
        },
        showInOfferDetail: function (e) {
            if (app.offerService.viewModel != undefined)
                debugger;
                app.offerService.viewModel.bind_offer_detail();
            ////if (app.offerdetailService.viewModel.offerdetailDataSource != undefined)
            //    app.offerdetailService.viewModel.offerdetailDataSource.fetch();
        },
        load_offer: function (e) {
            app.offerService.viewModel = new offerViewModel(e.view.element.find("#offer_list_ul"));
            kendo.bind($("#offer_list"), app.offerService.viewModel);
        },
        load_User: function (e) {
            app.userService.viewModel = new userViewModel(e.view.element.find("#user_list_ul"));
            kendo.bind($("#user_list"), app.offerService.viewModel);
        },
        //showInUserDetail: function (e) {
        //    if (app.userService.viewModel != undefined)
        //        app.userService.viewModel.bind_user_detail();
        //},
        load_Role: function (e) {
            app.RoleService.viewModel = new RoleViewModel(e.view.element.find("#Role_list_ul"));
            kendo.bind($("#Role_list"), app.RoleService.viewModel);
        },
        load_Cards: function (e) {
            app.cardsService.viewModel = new cardsViewModel(e.view.element.find("#cards_list_ul"));
            kendo.bind($("#cards_list"), app.cardsService.viewModel);
        },
        showIncardsDetail: function (e) {
            if (app.cardsService.viewModel != undefined)
                app.cardsService.viewModel.bind_cards_detail();
            ////if (app.offerdetailService.viewModel.offerdetailDataSource != undefined)
            //    app.offerdetailService.viewModel.offerdetailDataSource.fetch();
        },
    }
});