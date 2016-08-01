/**
 * Created by fyl08 on 2015/12/20.
 */
Ext.define('CACS.interceptor.Session', {
    extend: 'CACS.interceptor.BaseInterceptor',

    index: 1,

    afterInterceptor: function (response, options) {
        var resultData = Ext.JSON.decode(response.responseText);
        if (!Ext.isEmpty(resultData.session) && resultData.session === false) {
            CACS.app.redirectTo('account/relogin');
            return false;
        }
        return true;
    }
});