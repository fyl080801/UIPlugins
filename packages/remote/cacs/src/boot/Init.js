/**
 * Created by fyl08 on 2015/12/19.
 */
Ext.define('CACS.boot.Init', {
    extend: 'CACS.util.pipeline.Node',

    requires: [
        'CACS.InterceptorManager',
        'CACS.interceptor.TestHost',
        'CACS.interceptor.*',
        'Ext.util.History'
    ],

    handler: function () {
        Ext.util.History.init();

        Ext.Ajax.clearListeners();

        //Ext.Ajax.setConfig('cors', true);

        Ext.Ajax.addListener('beforerequest', function (conn, options, eOpts) {
            if (options.scope && options.scope.disabledInterceptors) {
                options.disabledInterceptors = options.scope.disabledInterceptors;
            }
            if (options.scope && options.scope.extraInterceptors) {
                options.extraInterceptors = options.scope.extraInterceptors;
            }
            return CACS.InterceptorManager.invokeBefore(options);
        });

        Ext.Ajax.addListener('requestcomplete', function (conn, response, options, eOpts) {
            if (options.scope && options.scope.disabledInterceptors) {
                options.disabledInterceptors = options.scope.disabledInterceptors;
            }
            if (options.scope && options.scope.extraInterceptors) {
                options.extraInterceptors = options.scope.extraInterceptors;
            }
            return CACS.InterceptorManager.invokeAfter(response, options);
        });

        CACS.InterceptorManager.addInterceptor(Ext.create('CACS.interceptor.TestHost', {host: 'http://localhost:806'}));
        CACS.InterceptorManager.addInterceptor('CACS.interceptor.Mask');
        CACS.InterceptorManager.addInterceptor('CACS.interceptor.Result');
        CACS.InterceptorManager.addInterceptor('CACS.interceptor.Session');
        CACS.InterceptorManager.addInterceptor('CACS.interceptor.Exception');
    }
});