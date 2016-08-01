/**
 * Created by fyl08 on 2015/12/19.
 */
Ext.define('CACS.form.field.Datetime', {
    extend: 'Ext.form.field.Picker',

    alias: 'widget.datetimefield',

    requires: ['CACS.picker.Datetime'],

    alternateClassName: ['CACS.form.DatetimeField', 'CACS.form.Datetime'],

    format: "m/d/Y H:i",

    altFormats: "m/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j",

    disabledDaysText: "Disabled",

    disabledDatesText: "Disabled",

    minText: "时间日期必须大于等于 {0}",

    maxText: "时间日期必须小于等于 {0}",

    invalidText: "{0} 不是一个有效的值 - 格式必须按照 {1}",

    triggerCls: Ext.baseCSSPrefix + 'form-date-trigger',

    showToday: true,

    useStrict: undefined,

    initTime: '12', // 24 hour format

    initTimeFormat: 'H',

    matchFieldWidth: false,

    startDay: 0,

    valuePublishEvent: ['select', 'blur'],

    timeSpan: 30,

    initComponent: function () {
        var me = this,
            isString = Ext.isString,
            min, max;

        min = me.minValue;
        max = me.maxValue;
        if (isString(min)) {
            me.minValue = me.parseDate(min);
        }
        if (isString(max)) {
            me.maxValue = me.parseDate(max);
        }
        me.disabledDatesRE = null;
        me.initDisabledDays();

        me.callParent();
    },

    initValue: function () {
        var me = this,
            value = me.value;

        // If a String value was supplied, try to convert it to a proper Date
        if (Ext.isString(value)) {
            me.value = me.rawToValue(value);
        }

        me.callParent();
    },

    // private
    initDisabledDays: function () {
        if (this.disabledDates) {
            var dd = this.disabledDates,
                len = dd.length - 1,
                re = "(?:",
                d,
                dLen = dd.length,
                date;

            for (d = 0; d < dLen; d++) {
                date = dd[d];

                re += Ext.isDate(date) ? '^' + Ext.String.escapeRegex(date.dateFormat(this.format)) + '$' : date;
                if (d !== len) {
                    re += '|';
                }
            }

            this.disabledDatesRE = new RegExp(re + ')');
        }
    },

    setDisabledDates: function (disabledDates) {
        var me = this,
            picker = me.picker;

        me.disabledDates = disabledDates;
        me.initDisabledDays();
        if (picker) {
            picker.setDisabledDates(me.disabledDatesRE);
        }
    },

    setDisabledDays: function (disabledDays) {
        var picker = this.picker;

        this.disabledDays = disabledDays;
        if (picker) {
            picker.setDisabledDays(disabledDays);
        }
    },

    setMinValue: function (value) {
        var me = this,
            picker = me.picker,
            minValue = (Ext.isString(value) ? me.parseDate(value) : value);

        me.minValue = minValue;
        if (picker) {
            picker.minText = Ext.String.format(me.minText, me.formatDate(me.minValue));
            picker.setMinDate(minValue);
        }
    },

    setMaxValue: function (value) {
        var me = this,
            picker = me.picker,
            maxValue = (Ext.isString(value) ? me.parseDate(value) : value);

        me.maxValue = maxValue;
        if (picker) {
            picker.maxText = Ext.String.format(me.maxText, me.formatDate(me.maxValue));
            picker.setMaxDate(maxValue);
        }
    },

    getErrors: function (value) {
        value = arguments.length > 0 ? value : this.formatDate(this.processRawValue(this.getRawValue()));

        var me = this,
            format = Ext.String.format,
            clearTime = Ext.Date.clearTime,
            errors = me.callParent([value]),
            disabledDays = me.disabledDays,
            disabledDatesRE = me.disabledDatesRE,
            minValue = me.minValue,
            maxValue = me.maxValue,
            len = disabledDays ? disabledDays.length : 0,
            i = 0,
            svalue,
            fvalue,
            day,
            time;


        if (value === null || value.length < 1) { // if it's blank and textfield didn't flag it then it's valid
            return errors;
        }

        svalue = value;
        value = me.parseDate(value);
        if (!value) {
            errors.push(format(me.invalidText, svalue, Ext.Date.unescapeFormat(me.format)));
            return errors;
        }

        time = value.getTime();
        if (minValue && time < clearTime(minValue).getTime()) {
            errors.push(format(me.minText, me.formatDate(minValue)));
        }

        if (maxValue && time > clearTime(maxValue).getTime()) {
            errors.push(format(me.maxText, me.formatDate(maxValue)));
        }

        if (disabledDays) {
            day = value.getDay();

            for (; i < len; i++) {
                if (day === disabledDays[i]) {
                    errors.push(me.disabledDaysText);
                    break;
                }
            }
        }

        fvalue = me.formatDate(value);
        if (disabledDatesRE && disabledDatesRE.test(fvalue)) {
            errors.push(format(me.disabledDatesText, fvalue));
        }

        return errors;
    },

    rawToValue: function (rawValue) {
        return this.parseDate(rawValue) || rawValue || null;
    },

    valueToRaw: function (value) {
        return this.formatDate(this.parseDate(value));
    },

    safeParse: function (value, format) {
        var me = this,
            utilDate = Ext.Date,
            result = null,
            strict = me.useStrict,
            parsedDate;

        if (utilDate.formatContainsHourInfo(format)) {
            // if parse format contains hour information, no DST adjustment is necessary
            result = utilDate.parse(value, format, strict);
        } else {
            // set time to 12 noon, then clear the time
            parsedDate = utilDate.parse(value + ' ' + me.initTime, format + ' ' + me.initTimeFormat, strict);
            if (parsedDate) {
                result = utilDate.clearTime(parsedDate);
            }
        }
        return result;
    },

    // @private
    getSubmitValue: function () {
        var format = this.submitFormat || this.format,
            value = this.getValue();

        return value ? Ext.Date.format(value, format) : '';
    },

    /**
     * @private
     */
    parseDate: function (value) {
        if (!value || Ext.isDate(value)) {
            return value;
        }

        var me = this,
            val = me.safeParse(value, me.format),
            altFormats = me.altFormats,
            altFormatsArray = me.altFormatsArray,
            i = 0,
            len;

        if (!val && altFormats) {
            altFormatsArray = altFormatsArray || altFormats.split('|');
            len = altFormatsArray.length;
            for (; i < len && !val; ++i) {
                val = me.safeParse(value, altFormatsArray[i]);
            }
        }
        return val;
    },

    // private
    formatDate: function (date) {
        return Ext.isDate(date) ? Ext.Date.dateFormat(date, this.format) : date;
    },

    createPicker: function () {
        var me = this,
            format = Ext.String.format;

        // Create floating Picker BoundList. It will acquire a floatParent by looking up
        // its ancestor hierarchy (Pickers use their pickerField property as an upward link)
        // for a floating component.
        return new CACS.picker.Datetime({
            pickerField: me,
            floating: true,
            focusable: false, // Key events are listened from the input field which is never blurred
            hidden: true,
            minDate: me.minValue,
            maxDate: me.maxValue,
            disabledDatesRE: me.disabledDatesRE,
            disabledDatesText: me.disabledDatesText,
            disabledDays: me.disabledDays,
            disabledDaysText: me.disabledDaysText,
            format: me.format,
            showToday: me.showToday,
            startDay: me.startDay,
            minText: format(me.minText, me.formatDate(me.minValue)),
            maxText: format(me.maxText, me.formatDate(me.maxValue)),
            timeSpan: me.timeSpan,
            listeners: {
                scope: me,
                select: me.onSelect
            },
            keyNavConfig: {
                esc: function () {
                    me.collapse();
                }
            }
        });
    },

    onSelect: function (m, d) {
        var me = this;

        me.setValue(d);
        me.fireEvent('select', me, d);
        //me.collapse();
    },

    onExpand: function () {
        var value = this.getValue();
        this.picker.setValue(Ext.isDate(value) ? value : new Date());
    },

    // private
    onBlur: function (e) {
        var me = this,
            v = me.rawToValue(me.getRawValue());

        if (Ext.isDate(v)) {
            me.setValue(v);
        }
        me.callParent([e]);
    }

});
