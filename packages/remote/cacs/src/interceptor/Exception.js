/**
 * Created by fyl08 on 2015/12/20.
 */
Ext.define('CACS.interceptor.Exception', {
    extend: 'CACS.interceptor.BaseInterceptor',

    index: 2,

    afterInterceptor: function (response, options) {
        var result = Ext.JSON.decode(response.responseText);
        if (result.success === false) {
            Ext.MessageBox.show({
                title: '错误',
                message: result.message,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
            return false;
        }
        return true;
    }
});