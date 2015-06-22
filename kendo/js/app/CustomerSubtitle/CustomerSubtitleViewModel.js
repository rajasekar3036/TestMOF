define([
    'kendo',
    'text!customersubtitleTemplate'
], function (kendo, customersubtitleTemplate) {
    return kendo.data.ObservableObject.extend({
        CustomerSubtitleDataSource: null,
        init: function (listView) {
            var self = this;
            debugger;
            kendo.data.ObservableObject.fn.init.apply(self, []);
            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        contentType: "application/json; charset=utf-8",
                        type: "GET"
                        , url: baseUrl + "/GetCustomerSubtitle"
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
                , template: kendo.template(customersubtitleTemplate)
                ////,filterable: true 
                //, filterable: {
                //    field: "name",
                //    operator: "startswith"
                //}
            });
           // debugger;
            self.set("CustomerSubtitleDataSource", dataSource);
        }         
    });
});
    
