/**
 * Created by fyl08 on 2016/1/13.
 */
Ext.define('CACS.component.task.TaskItemViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.taskitem',

    onTaskClick: function (button, e, eOpts) {
        var taskItem = this.getView();
        var taskWindow = taskItem.taskWindow;
        if (taskWindow.isHidden()) {
            taskWindow.show();
        } else if (taskWindow.zIndexManager.getActive().id !== taskWindow.id) {
            taskWindow.toFront(true);
        } else {
            taskWindow.hide();
        }
    },

    onCloseClick: function (button, e, eOpts) {
        var taskItem = this.getView();
        var taskWindow = taskItem.taskWindow;
        var mainbottom = CACS.app.getController('Home').getMainTaskbar();
        taskWindow.close();
    }

});