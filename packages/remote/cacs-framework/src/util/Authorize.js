/**
 * Created by fyl08 on 2016/1/19.
 */
Ext.define('CACS.util.Authorize', {
    singleton: true,

    store: [],

    /**
     * 添加权限码
     * @param {String} id
     */
    add: function (id) {
        this.store.push(id);
    },

    /**
     * 是否具有权限
     * @param {String|Array} auth
     */
    isAuthorize: function (auth) {
        var auths;
        if (Ext.isArray(auth)) {
            auths = auth;
        } else if (Ext.isString(auth)) {
            auths = auth.split(',');
        } else {
            return true;
        }
        var permissions = Ext.Array.intersect(this.store, auths);
        return permissions.length > 0
    },

    /**
     * 组件权限
     * @param {Ext.Component} cmp
     */
    componentAuthorize: function (cmp) {
        if (cmp.isHidden())
            return;
        if (Ext.isArray(cmp.authorize) && cmp.authorize.length <= 0)
            return;
        if (Ext.isString(cmp.authorize) && Ext.isEmpty(cmp.authorize))
            return;
        var isAuth = this.isAuthorize(cmp.authorize);
        if (!isAuth) {
            cmp.hide();
        }
    }
})
;