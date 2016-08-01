/**
 * Created by fyl08 on 2015/12/19.
 */
Ext.define('CACS.mvc.result.ViewResult', {
    extend: 'CACS.mvc.result.ActionResult',

    /**
     * @cfg {String} view
     */
    view: '',

    /**
     * @cfg {String} frameId
     */
    frameId: '',

    constructor: function (config) {
        this.callParent([Ext.apply(this, config)]);
    },

    execute: function (controller) {
        var action = this.getCurrentAction();
        var frameId = this.frameId;
        var viewInstance = this.getViewInstance(controller, this.view, frameId);
        var viewStore = this.getViewStore();
        viewInstance.addListener('destroy', function (obj) {
            var opened = viewStore.getById(obj.frameId);
            viewStore.remove(opened);
            Ext.util.History.add('');
        });
        viewStore.add(Ext.create('CACS.model.ViewItem', {
            Action: action,
            FrameId: viewInstance.frameId,
            ViewType: Ext.ClassManager.getName(this),
            Component: viewInstance.self.getName(),
            Instance: viewInstance
        }));
        var olden = Ext.util.History.getToken();
        if (Ext.isEmpty(olden))
            Ext.util.History.add(action);
        return viewInstance;
    },

    /**
     *
     * @param {Ext.app.Controller} controller
     * @param {String} name
     * @param {String} frameId
     * @returns {Ext.Component}
     */
    getViewInstance: function (controller, name, frameId) {
        var viewInstance;
        var viewStore = this.getViewStore();
        var viewClass = controller.getView(name);
        //查找框架Id
        if (Ext.isEmpty(frameId) || !Ext.isString(frameId)) {
            frameId = this.getCurrentAction();
        }
        //判断框架是否存在
        var viewItem = viewStore.getById(frameId);
        if (viewItem) {
            if (viewItem.get('Component') === viewClass.getName()) {
                viewInstance = viewItem.get('Instance');
            } else {
                viewItem.get('Instance').destroy();
                viewStore.remove(viewItem);
            }
        }
        if (!viewInstance) {
            viewInstance = viewClass.create();
        }
        viewInstance.frameId = frameId;
        return viewInstance;
    },

    getViewStore: function () {
        return CACS.app.getStore('Views');
    }
});