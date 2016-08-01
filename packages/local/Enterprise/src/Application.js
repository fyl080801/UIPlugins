Ext.application({
    controllers: [
        'Personal',
        'Department'
    ],
    name: 'Enterprise',

    launch: function() {
        var links = CACS.app.getStore('Links');
        links.getRoot().appendChild({
            text: '企业管理',
            iconCls: 'building',
            children: [
                {
                    text: '部门管理',
                    iconCls: 'book',
                    //authorize: '/Role/List',
                    leaf: true,
                    href: '#enterprise/department/list'
                },
                {
                    text: '职务管理',
                    iconCls: 'cup',
                    //authorize: '/Role/List',
                    leaf: true
                    //href: '#role/list'
                }
            ]
        });
    }

});
