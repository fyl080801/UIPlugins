Ext.define('Enterprise.view.department.List', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.departmentlist',

    requires: [
        'Enterprise.view.department.ListViewController',
        'Enterprise.view.department.ListViewModel',
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.field.Hidden',
        'Ext.form.field.Text',
        'Ext.layout.container.Form',
        'Ext.layout.container.Form',
        'Ext.toolbar.Fill'
    ],

    controller: 'departmentlist',

    viewModel: {
        type: 'departmentlist'
    },
    width: 640,
    height: 480,
    iconCls: 'book',
    title: '部门管理',
    store: 'Departments',
    rootVisible: false,

    columns: [
        {
            xtype: 'treecolumn',
            text: '名称',
            flex: 1,
            dataIndex: 'DepartmentName'
        },
        {
            text: '描述',
            flex: 2,
            dataIndex: 'Remark'
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                {
                    xtype: 'form',
                    bodyPadding: 0,
                    padding: 0,
                    layout: 'form',
                    reference: 'form',
                    url: '/Enterprise/Department/Add',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            hideEmptyLabel: true,
                            name: 'DepartmentName',
                            allowBlank: false,
                            bind: {
                                value: '{DepartmentName}'
                            }
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'ParentId',
                            bind: {
                                value: '{Current.Id}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'button',
                    text: '新建',
                    iconCls: 'add',
                    handler: 'addDepartment'
                },
                {
                    xtype: 'button',
                    text: '编辑',
                    iconCls: 'note_edit',
                    bind: {
                        disabled: '{!Current}'
                    }
                },
                {
                    xtype: 'button',
                    text: '删除',
                    iconCls: 'delete',
                    bind: {
                        disabled: '{!Current}'
                    }
                }
            ]
        }
    ],

    listeners: {
        beforeitemexpand: 'expendItem'
    },

    selModel: {
        mode: 'SINGLE',
        allowDeselect: true
    },

    bind: {
        selection: '{Current}'
    }
});