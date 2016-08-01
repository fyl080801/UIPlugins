/**
 * Created by fyl08 on 2016/1/13.
 */
Ext.define('CACS.boot.UI', {
    extend: 'CACS.util.pipeline.Node',

    handler: function () {
        this.initLinks();
    },

    initLinks: function () {
        var root = CACS.app.getStore('Links').getRoot();
        root.removeAll();
        root.appendChild({
            text: '关于',
            iconCls: 'help',
            leaf: true,
            href: '#system/about'
        });
        root.appendChild({
            text: '管理工具',
            iconCls: 'cog',
            children: [
                {
                    text: '角色管理',
                    iconCls: 'group',
                    authorize: '/Role/List',
                    leaf: true,
                    href: '#role/list'
                },
                {
                    text: '用户管理',
                    iconCls: 'user',
                    authorize: '/User/List',
                    leaf: true,
                    href: '#user/list'
                },
                {
                    text: '插件管理',
                    iconCls: 'plugin',
                    authorize: '/Plugin/List',
                    leaf: true,
                    href: '#system/plugins'
                },
                {
                    text: '日志查看器',
                    iconCls: 'report',
                    authorize: '/Logging/List',
                    leaf: true,
                    href: '#system/logs'
                }
            ]
        });
    }
});