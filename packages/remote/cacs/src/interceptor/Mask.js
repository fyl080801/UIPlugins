/**
 * Created by fyl08 on 2015/12/20.
 */
Ext.define('CACS.interceptor.Mask', {
    extend: 'CACS.interceptor.BaseInterceptor',

    index: 3,

    message: null,

    beforeInterceptor: function (options) {
        this.message = Ext.MessageBox.wait("请稍后...");
        return true;
    },

    afterInterceptor: function (response, options) {
        if (this.message) {
            this.message.close();
        }
        return true;
    }
});