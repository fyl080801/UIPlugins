/**
 * Created by fyl08 on 2015/12/19.
 */
Ext.define('CACS.mvc.result.WindowResult', {
    extend: 'CACS.mvc.result.ViewResult',

    /**
     * @cfg {Boolean} modal
     */
    modal: false,

    /**
     * @cfg {Boolean} minimizable
     */
    minimizable: false,

    /**
     * @cfg {Boolean} maximizable
     */
    maximizable: false,

    constructor: function (config) {
        this.callParent([Ext.apply(this, config)]);
    },

    /**
     *
     * @param {Ext.app.Controller} controller
     * @returns {*|Object}
     */
    execute: function (controller) {
        var viewInstance = this.callParent([controller]);
        var frameId = Ext.isEmpty(this.frameId) ? this.getCurrentAction() : this.frameId;
        var taskBar = CACS.app.getController('Home').getMainTaskbar();
        viewInstance.modal = this.modal;
        viewInstance.minimizable = this.minimizable;
        viewInstance.maximizable = this.maximizable;
        if (taskBar) {
            var added = taskBar.items.findBy(function (item, key) {
                return item.frameId === frameId;
            });
            if (added) {
                added.doActive();
            } else {
                taskBar.add(viewInstance).doActive();
            }
        } else {
            var viewStore = this.getViewStore();
            var added = viewStore.getById(frameId);
            viewStore.remove(added);
            Ext.util.History.add('');
            //var windowStore = CACS.app.getController('Main').getStore('main.WindowCache');
            //windowStore.add({
            //    frameId: frameId,
            //    instance: viewInstance
            //});
        }
        return viewInstance;
    }
});