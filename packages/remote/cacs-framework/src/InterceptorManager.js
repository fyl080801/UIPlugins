/**
 * Created by fyl08 on 2015/12/21.
 */
Ext.define('CACS.InterceptorManager', {
    requires: [
        'Ext.util.MixedCollection'
    ],

    statics: {
        interceptors: Ext.create('Ext.util.MixedCollection'),

        /**
         *
         * @param {CACS.data.AjaxOption} options
         * @returns {boolean}
         */
        invokeBefore: function (options) {
            var me = this;
            var usedInterceptors = this.interceptors.filterBy(function (item, key) {
                return me.filterInterceptor(item, key, options);
            });
            var newCollection = this.addExtraInterceptors(options.extraInterceptors);
            usedInterceptors.each(function (item, index, len) {
                newCollection.add(item.self.getName(), item);
            });
            newCollection.sort('index', 'ASC');
            newCollection.each(function (interceptor) {
                if (interceptor.beforeHandler(options) === false) {
                    return false;
                }
            });
            return true;
        },

        /**
         * 后执行
         * @param response
         * @param {CACS.data.AjaxOption} options
         * @returns {boolean}
         */
        invokeAfter: function (response, options) {
            var me = this;
            var usedInterceptors = this.interceptors.filterBy(function (item, key) {
                return me.filterInterceptor(item, key, options);
            });
            var newCollection = this.addExtraInterceptors(options.extraInterceptors);
            usedInterceptors.each(function (item, index, len) {
                newCollection.add(item.self.getName(), item);
            });
            newCollection.sort('index', 'DESC');
            newCollection.each(function (interceptor) {
                if (interceptor.afterHandler(response, options) === false) {
                    return false;
                }
            });
            return true;
        },

        /**
         *
         * @param {CACS.interceptor.BaseInterceptor} item
         * @param {String} key
         * @param {CACS.data.AjaxOption} options
         * @returns {boolean}
         */
        filterInterceptor: function (item, key, options) {
            var interceptorNames = Ext.ClassManager.getName(item);
            if (Ext.isArray(options.disabledInterceptors) && options.disabledInterceptors.length > 0) {
                for (var i = 0; i < options.disabledInterceptors.length; i++) {
                    if (options.disabledInterceptors[i] === interceptorNames) {
                        return false;
                    }
                }
            } else if (Ext.isString(options.disabledInterceptors)
                && options.disabledInterceptors === interceptorNames) {
                return false;
            }
            return true;
        },

        addExtraInterceptors: function (interceptors) {
            var newCollection = Ext.create('Ext.util.MixedCollection');
            if (!Ext.isEmpty(interceptors)) {
                if (Ext.isArray(interceptors)) {
                    for (var i = 0; i < interceptors.length; i++) {
                        var extInt = interceptors[i];
                        newCollection.add(Ext.isString(extInt) ? Ext.create(extInt) : extInt);
                    }
                } else {
                    //var extInt = interceptors[index];
                    //var extintInst = Ext.isString(extInt) ? Ext.create(extInt) : extInt;
                    //newCollection.add(extintInst.self.getName(), extintInst);
                    var extintInst = Ext.isString(extInt) ? Ext.create(extInt) : interceptors;
                    newCollection.add(extintInst.self.getName(), extintInst);
                }
            }
            return newCollection;
        },

        /**
         * 添加拦截器
         * @param {String|CACS.interceptor.BaseInterceptor} interceptor
         */
        addInterceptor: function (interceptor) {
            if (!interceptor) return;
            var created = Ext.isString(interceptor) ? Ext.create(interceptor) : interceptor;
            this.interceptors.add(created.self.getName(), created);
        }
    }
});