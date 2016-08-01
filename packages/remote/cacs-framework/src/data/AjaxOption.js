/**
 * Created by fyl08 on 2015/12/19.
 */
Ext.define('CACS.data.AjaxOption', {
    extend: 'Ext.Base',

    constructor: function (config) {
        this.callParent([Ext.apply(this, config)]);
    },

    /**
     * @cfg {String} url
     * The URL for this connection.
     */
    url: null,

    /**
     * @cfg {Boolean} async
     * `true` if this request should run asynchronously. Setting this to `false` should generally
     * be avoided, since it will cause the UI to be blocked, the user won't be able to interact
     * with the browser until the request completes.
     */
    async: true,

    /**
     * @cfg {String} username
     * The username to pass when using {@link #withCredentials}.
     */
    username: '',

    /**
     * @cfg {String} password
     * The password to pass when using {@link #withCredentials}.
     */
    password: '',

    /**
     * @cfg {Boolean} disableCaching
     * True to add a unique cache-buster param to GET requests.
     */
    disableCaching: true,

    /**
     * @cfg {Boolean} withCredentials
     * True to set `withCredentials = true` on the XHR object
     */
    withCredentials: false,

    /**
     * @cfg {Boolean} binary
     * True if the response should be treated as binary data.  If true, the binary
     * data will be accessible as a "responseBytes" property on the response object.
     */
    binary: false,

    /**
     * @cfg {Boolean} cors
     * True to enable CORS support on the XHR object. Currently the only effect of this option
     * is to use the XDomainRequest object instead of XMLHttpRequest if the browser is IE8 or above.
     */
    cors: false,

    isXdr: false,

    defaultXdrContentType: 'text/plain',

    /**
     * @cfg {String} disableCachingParam
     * Change the parameter which is sent went disabling caching through a cache buster.
     */
    disableCachingParam: '_dc',

    /**
     * @cfg {Number} timeout
     * The timeout in milliseconds to be used for requests.
     */
    timeout: 30000,

    /**
     * @cfg {Object} extraParams
     * Any parameters to be appended to the request.
     */
    extraParams: null,

    /**
     * @cfg {Boolean} [autoAbort=false]
     * Whether this request should abort any pending requests.
     */
    autoAbort: false,

    /**
     * @cfg {String} method
     * The default HTTP method to be used for requests.
     *
     * If not set, but {@link #request} params are present, POST will be used;
     * otherwise, GET will be used.
     */
    method: null,

    /**
     * @cfg {Object} defaultHeaders
     * An object containing request headers which are added to each request made by this object.
     */
    defaultHeaders: null,

    /**
     * @cfg {String} defaultPostHeader
     * The default header to be sent out with any post request.
     */
    defaultPostHeader: 'application/x-www-form-urlencoded; charset=UTF-8',

    /**
     * @cfg {Boolean} useDefaultXhrHeader
     * `true` to send the {@link #defaultXhrHeader} along with any request.
     */
    useDefaultXhrHeader: true,

    /**
     * @cfg {String}
     * The header to send with Ajax requests. Also see {@link #useDefaultXhrHeader}.
     */
    defaultXhrHeader: 'XMLHttpRequest',

    /**
     * 禁用的
     * @cfg {String|Array} disabledInterceptors 禁用拦截
     */
    disabledInterceptors: null,

    /**
     * @cfg {String|Array} extraInterceptors 临时拦截器
     */
    extraInterceptors: null,

    /**
     * @cfg {Function} callback
     */
    callback: Ext.emptyFn()
});