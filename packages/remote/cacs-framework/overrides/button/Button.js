/**
 * Created by fyl08 on 2016/1/19.
 */
Ext.define('CACS.overrides.button.Button', {
    override: 'Ext.button.Button',

    requires: [
        'CACS.util.Authorize'
    ],

    authorize: [],

    initComponent: function () {
        var me = this;
        me.callParent();
        CACS.util.Authorize.componentAuthorize(me);
    }
});