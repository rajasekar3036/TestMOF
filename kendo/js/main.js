var host = "http://adigielite.ddns.net:8260/";
var baseUrl = host + "MobileOfferFinderService.asmx";

var imageURL = "http://192.168.2.14:8250/images/brands/";

require.config({
    paths: {
        kendo: "./lib/kendo.all.min",
        jquery: "./lib/jquery.min",
        text: "./lib/text",
        templateLoader: "./lib/kendo-template-loader",
        garageViewModel: "./app/Garage/GarageViewModel",
        garageTemplate: "./app/Garage/garagelist_template.html",
        customerViewModel: "./app/Customer/CustomerViewModel",
        customersubtitleViewModel: "./app/CustomerSubtitle/CustomerSubtitleViewModel",
        customerTemplate: "./app/Customer/customerlist_template.html",
        customersubtitleTemplate: "./app/CustomerSubtitle/CustomerSubtitlelist_template.html",
        ordersViewModel: "./app/Orders/OrdersViewModel",
        ordersTemplate: "./app/Orders/orderslist_template.html",
        brandViewModel: "./app/Brand/BrandViewModel",
        brandTemplate: "./app/Brand/brandlist_template.html",
        offerViewModel: "./app/Offer/OfferViewModel",
        offerTemplate: "./app/Offer/offerlist_template.html",       
        UserViewModel: "./app/User/UserViewModel",
        UserTemplate: "./app/User/UsersList_template.html",
        RoleViewModel: "./app/Role/RoleViewModel",
        RoleTemplate: "./app/Role/Rolelist_template.html",
        cardsTemplate: "./app/Cards/cardslist_template.html",
    },
    shim: {
        kendo: {
            deps: ['jquery'],
            exports: 'kendo'
        }
    }
});


var Global = {
    SelectedOrderView: 0,
    SelectedGarageView: 0,
    user_id: -1,
    customer_id : -1 , 
    user_name: "",
    password:"",
    LoginUser: [],
    brand_Id: 0,
    offerViewModel: null,
    brandViewModel: null,
   // UserViewModel:null,
    offer_view_loads_from_brand: 0,
    selected_brand_id: 0,
    first_name:"",
    last_name : "",
    mobile : "",
    email: "",
    selected_offer_id: 0,
    selected_card_id: 0
};

////NewVehicleBrand: "",
////NewVehicleBrandId: 0,
////NewVehicleModel: "",
////NewVehicleModelId: 0,
////NewVehiclePlateNumber: "",
////CustomersVehicle: [],
////objVehicleModelDropDownList: "",
////objVehicleBrandDropDownList: "",
////VehicleDropdownloaded: false,
////user_id: -1,
////user_name: ""

require(['kendo', 'app'], function (kendo, app) {//['app'], function (app) {
    window.app = app;
    $(function () {
        app.init();
    });

});

function customer_new1(e) {
    debugger;

};
