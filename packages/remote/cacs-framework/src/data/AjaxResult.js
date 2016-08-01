/**
 * Created by fyl08 on 2015/12/20.
 */
Ext.define('CACS.data.AjaxResult', {

    constructor: function (config) {
        this.callParent([Ext.apply(this, config)]);
    },

    /**
     * @cfg {String} message
     */
    message: '',

    /**
     * @cfg {boolean} success
     */
    success: true,

    /**
     * @cfg {boolean} session
     */
    session: false,

    /**
     * @cfg data
     */
    data: null
});