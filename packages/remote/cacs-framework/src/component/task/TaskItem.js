/**
 * Created by fyl08 on 2015/12/19.
 */
Ext.define('CACS.component.task.TaskItem', {
    extend: 'Ext.button.Segmented',

    requires: [
        'CACS.component.task.TaskItemViewController',
        'CACS.component.task.TaskItemViewModel',
        'Ext.layout.container.Fit',
        'Ext.window.Window'
    ],

    /**
     * @cfg {boolean} modal
     */
    modal: false,

    /**
     * @cfg {boolean} minimizable
     */
    minimizable: true,

    /**
     * @cfg {boolean} maximizable
     */
    maximizable: false,

    /**
     * @cfg {boolean} sizable
     */
    sizable: false,

    config: {
        taskWindow: {
            xtype: 'window',
            constrain: true,
            autoShow: false,
            minWidth: 180,
            layout: 'fit'
        }
    },

    controller: 'taskitem',
    viewModel: {
        type: 'taskitem'
    },
    allowToggle: false,

    items: [
        {
            reference: 'taskButton',
            width: 160,
            listeners: {
                click: 'onTaskClick'
            }
        },
        {
            glyph: 'xf00d@FontAwesome',
            listeners: {
                click: 'onCloseClick'
            }
        }
    ],

    initComponent: function () {
        var me = this;
        me.taskWindow = Ext.create(Ext.apply({
            viewModel: me.getViewModel(),
            modal: me.modal,
            minimizable: me.minimizable,
            maximizable: me.maximizable,
            resizable: me.sizable,
            listeners: {
                close: function (window) {
                    me.destroy();
                },
                minimize: function (window) {
                    window.hide();
                },
                activate: function (window) {
                    // 			var mainbottom = CACS.app.getMainController().getMainTaskbar();
                    // 			mainbottom.query('componenttaskwindow').forEach(function (item) {
                    // 				item.items.first().toggle(false);
                    // 			});
                    // 			me.items.first().toggle(true);
                },
                hide: function (window) {
                    Ext.util.History.add('');
                },
                deactivate: function (window) {
                    // 			me.items.first().toggle(false);
                }
            }
        }, me.taskWindow));
        me.callParent();
    },

    doActive: function () {
        if (this.taskWindow.isHidden()) {
            this.taskWindow.show();
        } else {
            this.taskWindow.toFront(true);
        }
        return this;
    }
});