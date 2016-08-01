/**
 * Created by fyl08 on 2015/12/19.
 * 节点基类
 */
Ext.define('CACS.util.pipeline.Node', {
    extend: 'Ext.mixin.Observable',

    /**
     * 下一节点
     * @property {CACS.util.pipeline.Node} next
     */
    next: null,

    /**
     * 节点处理方法
     */
    handler: Ext.emptyFn(),

    /**
     * 是否继续
     * @property {Boolean} isContinue
     */
    isContinue: true,

    /**
     * 设置下一节点
     * @param {CACS.util.pipeline.Node} node 节点
     */
    setNext: function (node) {
        this.next = node;
    },

    /**
     * 执行节点
     */
    process: function () {
        var me = this;

        me.isContinue = me.fireEvent('onProcessing');			//前执行，默认返回true
        if (!me.isContinue) {
            me.fireEvent('canceled');
            return;
        }

        var result = me.handler();								//执行
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
});