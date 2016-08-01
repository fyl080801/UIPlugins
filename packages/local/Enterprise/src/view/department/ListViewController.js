Ext.define('Enterprise.view.department.ListViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.departmentlist',

    requires: [
        'CACS.data.AjaxOption'
    ],

    addDepartment: function () {
        var me = this;
        var target = this.getView().getSelection()[0] || this.getRootNode();
        var store = Enterprise.app.getController('Department').getStore('Departments');
        var submitform = this.getReferences().form;
        if (!submitform.isValid())
            return;

        submitform.submit({
            success: function (form, action) {
                //要从store中添加数据
                var submitItem = submitform.getValues();
                submitItem.Id = action.result.data;
                target.appendChild(submitItem);
            }
        });
    },

    expendItem: function (node, eOpts) {
        this.getView().getStore().getProxy().setExtraParam('id', node.get('Id'))
    }
});
