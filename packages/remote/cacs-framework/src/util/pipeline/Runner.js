/**
 * Created by fyl08 on 2015/12/19.
 */
Ext.define('CACS.util.pipeline.Runner', {
    extend: 'Ext.mixin.Observable',

    requires: [
        'Ext.util.MixedCollection'
    ],

    /**
     * 管线中的节点
     * @property {Ext.util.MixedCollection} nodes
     * @private
     */
    nodes: new Ext.util.MixedCollection(),

    /**
     * 添加节点
     * @param {*|CACS.util.pipeline.Node} node 节点
     */
    addNode: function (node) {
        var me = this;
        if (Ext.isEmpty(node))
            return;
        node.addListener('noNext', function () {
            me.fireEvent('onEnd');
            me.nodes.clear();
        });
        var len = me.nodes.getCount();
        if (len > 0) {
            me.nodes.getAt(len - 1).setNext(node);
        }
        me.nodes.add(node.id, node);
    },

    /**
     * 启动管线
     * @param {number} start 起始节点
     */
    run: function (start) {
        if (!start)
            start = 0;
        var len = this.nodes.getCount();
        if (start > len - 1) {
            return;
        }
        this.nodes.getAt(start).process();
    }
})
;