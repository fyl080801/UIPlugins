/**
 * Created by fyl08 on 2015/12/21.
 */
Ext.define('CACS.mvc.result.ShowResult', {
    extend: 'CACS.mvc.result.ActionResult',

    /**
     * @cfg {String} view
     */
    view: '',

    constructor: function (config) {
        this.callParent([Ext.apply(this, config)]);
    },

    execute: function (controller) {
        var result;
        var viewClass = controller.getView(this.view);
        if (!Ext.isEmpty(viewClass)) {
            var viewInstance = viewClass.create();
            result = viewInstance.show();
        }
        Ext.util.History.add('');
        return result;
    }
});