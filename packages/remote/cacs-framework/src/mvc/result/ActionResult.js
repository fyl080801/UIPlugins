/**
 * Created by fyl08 on 2015/12/19.
 */
Ext.define('CACS.mvc.result.ActionResult', {
    extend: 'Ext.Base',

    requires: [
        'Ext.util.History'
    ],

    /**
     * 执行
     * @param {Ext.app.Controller} controller
     * @return {Ext.Component}
     */
    execute: function (controller) {
        return new Ext.Component();
    },

    /**
     * 获取当前路由值
     * @returns {*|String} 路由
     */
    getCurrentAction: function () {
        return Ext.util.History.getToken();
    }
});