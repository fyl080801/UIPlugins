/**
 * Created by fyl08 on 2015/12/19.
 */
Ext.define('CACS.component.task.Windowbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.windowbar',

    requires: [
        'CACS.component.task.TaskItem',
        'Ext.ux.BoxReorderer'
    ],

    config: {
        plugins: [
            Ext.create('Ext.ux.BoxReorderer')
        ]
    },

    /**
     * 添加组件
     * @param {CACS.component.task.TaskItem} component
     */
    add: function (component) {
        var title = component.getConfig('title');
        var iconCls = component.getConfig('iconCls');
        var taskItem = Ext.create('CACS.component.task.TaskItem', {
            modal: component.modal,
            minimizable: component.minimizable,
            maximizable: component.maximizable
        });
        component.addListener('destroy', function () {
            taskItem.taskWindow.close();
        });
        component.addListener('titlechange', function (p, newTitle, oldTitle, eOpts) {
            if (!Ext.isEmpty(newTitle)) {
                taskItem.taskWindow.setConfig('title', newTitle);
                taskItem.getReferences().taskButton.setConfig('text', newTitle);
            }
            var pheader = p.getHeader();
            if (pheader)
                pheader.hide();
        });
        taskItem.taskWindow.setConfig('title', title);
        taskItem.taskWindow.setConfig('iconCls', iconCls);
        taskItem.getReferences().taskButton.setConfig('text', title);
        taskItem.getReferences().taskButton.setConfig('iconCls', iconCls);
        component.setConfig('title', null);
        component.setConfig('iconCls', null);
        taskItem.taskWindow.add(component);
        taskItem.frameId = component.frameId;
        return this.callParent([taskItem]);
    }
});