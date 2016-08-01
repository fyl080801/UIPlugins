/**
 * Created by fyl08 on 2015/12/19.
 */
Ext.define('CACS.interceptor.BaseInterceptor', {
    mixins: ['Ext.mixin.Observable'],

    /**
     * 排除的 URL
     */
    excludes: [],

    /**
     * 包含的 URL
     */
    includes: [],

    /**
     * 排列顺序
     */
    index: 0,

    /**
     * 前执行方法
     * @param options
     */
    beforeInterceptor: function (options) {

    },

    /**
     * 后执行方法
     * @param options
     * @param response
     */
    afterInterceptor: function (response, options) {

    },

    getId: function () {
        return this.id;
    },

    beforeHandler: function (options) {
        if (this.beforeInterceptor) {
            return this.beforeInterceptor(options);
        } else {
            return Ext.emptyFn();
        }
        this.fireEvent('onBeforeHandler');
    },

    afterHandler: function (repsonse, options) {
        if (this.afterInterceptor) {
            return this.afterInterceptor(repsonse, options);
        } else {
            return Ext.emptyFn();
        }
        this.fireEvent('onAfterHandler');
    },

    validationUrl: function (url) {
        var me = this,
            intercept = false;

        //如果配置了include就仅验证包含的URL
        //如果配置了excludes就仅不包含excludes中的URL
        //如果都没有配置就拦截所有URL
        if (me.includes.length === 0 &&
            me.excludes.length === 0) {
            intercept = true;
        } else if (me.includes.length > 0) {
            Ext.Array.each(this.includes, function (reg) {
                var regexp = new RegExp(reg);
                if (regexp.test(url))
                    intercept = true;
                return false;
            });
        } else {
            intercept = true;
            Ext.Array.each(this.excludes, function (reg) {
                var regexp = new RegExp(reg);
                if (regexp.test(url)) intercept = false;
                return false;
            });
        }

        return intercept;
    }
});