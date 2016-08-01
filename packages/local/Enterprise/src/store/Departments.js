Ext.define('Enterprise.store.Departments', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'Enterprise.model.Department'
    ],

    storeId: 'Departments',

    model: 'Enterprise.model.Department',

    root: {
        DepartmentName: '所有部门',
        Id: '',
        expanded: true
    },

    proxy: {
        type: 'ajax',
        url: '/Enterprise/Department/ChildList',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});