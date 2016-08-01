/**
 * Created by fyl08 on 2015/12/20.
 */
Ext.define('CACS.interceptor.TestHost', {
    extend: 'CACS.interceptor.BaseInterceptor',

    constructor: function (config) {
        this.callParent([Ext.apply(this, config)]);
    },

    index: 0,

    /**
     * @cfg {String} host 测试主机地址
     */
    host: '',

    beforeInterceptor: function (options) {
        options.url = this.host + options.url;
        return true;
    }
});