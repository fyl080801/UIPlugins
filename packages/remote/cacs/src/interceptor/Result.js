/**
 * Created by fyl08 on 2015/12/20.
 */
Ext.define('CACS.interceptor.Result', {
    extend: 'CACS.interceptor.BaseInterceptor',

    requires: [
        'CACS.data.AjaxResult'
    ],

    index: 99,

    afterInterceptor: function (response, options) {
        var result = Ext.JSON.decode(response.responseText);
        response.realResult = Ext.create('CACS.data.AjaxResult', {
            data: result.data,
            message: result.message,
            session: result.session,
            success: result.success
        });
        return true;
    }
});