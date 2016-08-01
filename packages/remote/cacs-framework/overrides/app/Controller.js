/**
 * Created by fyl08 on 2015/12/19.
 */
Ext.define('CACS.overrides.app.Controller', {
    override: 'Ext.app.Controller',

    requires: [
        'CACS.mvc.result.ShowResult',
        'CACS.mvc.result.TabResult',
        'CACS.mvc.result.WindowResult',
        'Ext.util.History'
    ],

    confirmAction: function (options) {
        var result = Ext.Msg.confirm(options.title, options.content, options.callback);
        Ext.util.History.add('');
        return result;
    },

    showAction: function (options) {
        var actionResult = Ext.create('CACS.mvc.result.ShowResult', {
            view: options.view
        });
        return actionResult.execute(this);
    },

    tabAction: function (options) {
        if (Ext.isEmpty(options)) {
            options = {};
        }
        var actionResult = Ext.create('CACS.mvc.result.TabResult', {
            view: options.view,
            frameId: options.frameId
        });
        return actionResult.execute(this);
    },

    windowAction: function (options) {
        if (Ext.isEmpty(options)) {
            options = {};
        }
        var actionResult = Ext.create('CACS.mvc.result.WindowResult', {
            view: options.view,
            frameId: options.frameId,
            modal: options.modal,
            minimizable: options.minimizable,
            maximizable: options.maximizable
        });
        return actionResult.execute(this);
    }
});