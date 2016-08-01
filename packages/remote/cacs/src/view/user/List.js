/**
 * Created by fyl08 on 2016/1/22.
 */
Ext.define('CACS.view.user.List', {
    extend: 'Ext.grid.Panel',

    requires: [
        'CACS.view.user.ListModel',
        'CACS.view.user.ListController'
    ],

    viewModel: {
        type: 'userlist'
    },

    controller: 'userlist',

    iconCls: 'user',

    title: '用户管理',

    bodyBorder: true,

    columns: []
});