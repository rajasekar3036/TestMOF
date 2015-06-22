define([
    'kendo',
    'text!RoleTemplate'
], function (kendo, RoleTemplate) {
    return kendo.data.ObservableObject.extend({
        RoleDataSource: null,
        init: function (listView) {
            debugger;
            var self = this;

            kendo.data.ObservableObject.fn.init.apply(self, []);
            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        contentType: "application/json; charset=utf-8",
                        type: "GET"
                        , url: baseUrl + "/GetRole"
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
                , template: kendo.template(RoleTemplate)
                //,filterable: true 
                //, filterable: {
                //    field: "Value",
                //    operator: "startswith"
                //},
            });
            debugger;
            self.set("RoleDataSource", dataSource);
        }
    });
});
