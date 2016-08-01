/**
 * Created by fyl08 on 2015/12/19.
 */
Ext.define('CACS.util.pipeline.AjaxNode', {
    extend: 'CACS.util.pipeline.Node',

    requires: [
        'CACS.data.AjaxOption'
    ],

    url: '',

    method: 'POST',

    params: null,

    disabledInterceptors: null,

    extraInterceptors: null,

    process: function () {
        var me = this;

        me.isContinue = me.fireEvent('onProcessing');			//前执行，默认返回true
        if (!me.isContinue) {
            me.fireEvent('canceled');
            return;
        }

        Ext.Ajax.request(Ext.create('CACS.data.AjaxOption', {
            url: me.url,
            method: me.method,
            params: me.params,
            disabledInterceptors: me.disabledInterceptors,
            extraInterceptors: me.extraInterceptors,
            success: function (response, opts) {
                var obj = Ext.JSON.decode(response.responseText);
                if (obj.success) {

                    var result = me.handler(obj.data);								//执行
                    me.isContinue = result === undefined ? true : result;
                    if (!me.isContinue) {
                        me.fireEvent('canceled');
                        return;
                    }

                    me.isContinue = me.fireEvent('onProcessed');			//后执行
                    if (!me.isContinue) {
                        me.fireEvent('canceled');
                        return;
                    }

                    if (!me.next) {
                        me.fireEvent('noNext');
                        return;
                    }

                    me.next.process();
                }
                else
                    me.fireEvent('onFaild', obj.message);
            }
        }));
    }
});