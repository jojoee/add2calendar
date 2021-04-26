/* global module */
// prefix: a2cldr

var Add2Calendar = function(eventData) {

  /*================================================================ Util
  */

  /**
   * Check if the element has this class name
   *
   * @param  {[type]} ele
   * @param  {String} cls
   * @return {Boolean}
   */
  this.hasClass = function(ele, cls) {
    return (' ' + ele.className + ' ').indexOf(' ' + cls + ' ') > -1;
  };

  this.mergeObj = function(obj1, obj2) {
    var result = {}

    for (var attr1 in obj1) { result[attr1] = obj1[attr1]; }
    for (var attr2 in obj2) { result[attr2] = obj2[attr2]; }

    return result;
  };

  /**
   * @see https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
   * @param {Number} number 
   * @param {Number} size 
   */
  this.pad = function(number, size) {
    var num = number.toString();
    while (num.length < size) num = "0" + num;
    return num;
  };
  
  /**
   * formatTime
   * 
   * @todo change naming
   * @param  {Date} date
   * @return {string} e.g. "20191223T110000Z", "20191223T230000Z"
   */
  this.formatTime = function(date) {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };
    
  /**
   * [formatTime2 description]
   * this method ignore timezone
   * 
   * @see https://stackoverflow.com/questions/43670062/get-iso-string-from-a-date-without-time-zone
   * @todo change naming
   * @param  {Date} date
   * @return {string} e.g. "20191223", "20191224"
   */
  this.formatTime2 = function(date) {
    return this.pad(date.getFullYear(), 4) + this.pad(date.getMonth() + 1, 2) + this.pad(date.getDate(), 2)
  };

  /**
   * [isValidEventData description]
   * UNUSED, UNCOMPLETE
   * TODO
   * - validate `eventData`
   * - require only `start`
   * - validate both single and multi
   * 
   * @see http://stackoverflow.com/questions/5812220/how-to-validate-a-date
   * @see http://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
   * 
   * @param  {[type]}  args [description]
   * @return {Boolean}      [description]
   */
  this.isValidEventData = function(eventData) {
    if (this.isSingleEvent) {
      // HACK
      return true;

    } else {
      if (eventData.length > 0) {
        // HACK
        return true;
      }
    }

    return false;
  };

  this.isObjectType = function(obj, type) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  };

  /**
   * [isDateObject description]
   * UNUSED
   * 
   * @see http://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date
   * 
   * @param  {[type]}  obj [description]
   * @return {Boolean}     [description]
   */
  this.isDateObject = function(obj) {
    return this.isObjectType(obj, 'Date');
  };

  this.isArray = function(obj) {
    return this.isObjectType(obj, 'Array');
  };

  this.isFunc = function(obj) {
    return this.isObjectType(obj, 'Function');
  };

  /**
   * [serialize description]
   * Object to query string (encode)
   *
   * @see http://stackoverflow.com/questions/1714786/querystring-encoding-of-a-javascript-object
   * 
   * @param  {[type]} obj [description]
   * @return {[type]}     [description]
   */
  this.serialize = function(obj) {
    var str = [];
    for (var p in obj) {
      // eslint-disable-next-line
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }

    return str.join('&');
  };
  
  /**
   * [replaceSpecialCharacterAndSpaceWithHyphen description]
   *
   * @see http://stackoverflow.com/questions/18936483/regex-for-replacing-all-special-characters-and-spaces-in-a-string-with-hyphens
   * 
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   */
  this.replaceSpecialCharacterAndSpaceWithHyphen = function(str) {
    // eslint-disable-next-line
    return str.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'');
  };

  this.getLinkHtml = function(text, url, customClass, isEnableDownloadAttr, uniqueId) {
    if (typeof isEnableDownloadAttr === 'undefined') { isEnableDownloadAttr = false; }
    if (typeof uniqueId === 'undefined') { uniqueId = this.getCurrentUtcTimestamp(); }

    var downloadAttr = '';

    if (isEnableDownloadAttr) {
      var fileName = 'add2Calendar-' + this.replaceSpecialCharacterAndSpaceWithHyphen(text).toLowerCase() + '-' + uniqueId;

      downloadAttr = ' download="' + fileName + '" ';
    }

    return '<a ' + downloadAttr + ' class="' + customClass + '" target="_blank" href="' + url + '">' + text + '</a>';
  };

  /**
   * [getLiHtml description]
   *
   * @see http://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers
   * 
   * @param  {[type]}  text                 [description]
   * @param  {[type]}  url                  [description]
   * @param  {[type]}  customClass          [description]
   * @param  {Boolean} isEnableDownloadAttr [description]
   * @return {[type]}                       [description]
   */
  this.getLiHtml = function(text, url, customClass, isEnableDownloadAttr, uniqueId) {
    var result = '',
      isValid = false;

    // Validate
    if (url) {
      if (customClass === 'ical' || customClass === 'outlook') {
        isValid = true;

      } else {
        var urlLength = url.length;

        if (urlLength <= 20000) {
          isValid = true;

        } else {
          console.log('Url longer than 2000');
        }
      }
    }

    if (isValid) {
      var linkHtml = this.getLinkHtml(text, url, 'icon-' + customClass, isEnableDownloadAttr, uniqueId);
      result = '<li class="a2cldr-item a2cldr-' + customClass + '">' + linkHtml + '</li>';
    }

    return result;
  };

  this.getCurrentUtcTimestamp = function() {
    return Date.now();
  };

  /*================================================================ Google
  */

  /**
   * @todo take an arguments and return it instead of doing internal manipulation
   */
  this.updateGoogleUrl = function() {
    if (this.isSingleEvent) {
      var startDate = this.eventData.isAllDay
        ? this.formatTime2(new Date(this.eventData.start))
        : this.formatTime(new Date(this.eventData.start));
      var endDate = this.eventData.isAllDay
        ? this.formatTime2(new Date(this.eventData.end))
        : this.formatTime(new Date(this.eventData.end));

      var googleArgs = {
        'text'      : (this.eventData.title || ''),
        'dates'     : startDate + '/' + endDate,
        'location'  : (this.eventData.location || ''),
        'details'   : (this.eventData.description || ''),
        'ctz'       : (this.eventData.timezone || ''),
        'locale'    : (this.eventData.locale || ''),
        'sprop'     : ''
      };

      this.googleUrl = 'https://www.google.com/calendar/render?action=TEMPLATE&' + this.serialize(googleArgs);
    }

    return this.googleUrl;
  }

  this.getGoogleUrl = function() {
    return this.googleUrl;
  };

  this.getGoogleLiHtml = function() {
    return this.getLiHtml('Google', this.googleUrl, 'google');
  };

  this.openGoogle = function() {
    window.open(this.googleUrl);
  };

  /*================================================================ iCal / Outlook
  */
 
  /**
   * @todo take an arguments and return it instead of doing internal manipulation
   */
  this.updateICalUrl = function() {
    var url = typeof document !== 'undefined' ? document.URL : ''; // todo fix it
    var startDate = ''
    var endDate = ''

    if (this.isSingleEvent) {
      startDate = this.eventData.isAllDay
        ? this.formatTime2(new Date(this.eventData.start))
        : this.formatTime(new Date(this.eventData.start));
      endDate = this.eventData.isAllDay
        ? this.formatTime2(new Date(this.eventData.end))
        : this.formatTime(new Date(this.eventData.end));

      this.iCalUrl = encodeURI(
        'data:text/calendar;charset=utf8,' +
        [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'BEGIN:VEVENT',
          'URL:'          + url,
          'DTSTART:'      + startDate,
          'DTEND:'        + endDate,
          'SUMMARY:'      + (this.eventData.title || ''),
          'DESCRIPTION:'  + (this.eventData.description || ''),
          'LOCATION:'     + (this.eventData.location || ''),
          'END:VEVENT',
          'END:VCALENDAR'
        ].join('\n')
      );

    } else {
      var i = 0,
        n = this.eventData.length;
      
      var iCalData = [];
      for (i = 0; i < n; i++) {
        var data = this.eventData[i];
        startDate = this.eventData.isAllDay
          ? this.formatTime2(new Date(data.start))
          : this.formatTime(new Date(data.start));
        endDate = this.eventData.isAllDay
          ? this.formatTime2(new Date(data.end))
          : this.formatTime(new Date(data.end));

        var tmp = [
          'BEGIN:VEVENT',
          'URL:'          + url,
          'DTSTART:'      + startDate,
          'DTEND:'        + endDate,
          'SUMMARY:'      + (data.title || ''),
          'DESCRIPTION:'  + (data.description || ''),
          'LOCATION:'     + (data.location || ''),
          'END:VEVENT',
        ];

        iCalData = iCalData.concat(tmp);
      }

      var iCalDataBegin = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0'
      ];
      var iCalDataAfter = [
        'END:VCALENDAR'
      ];
      iCalData = iCalDataBegin.concat(iCalData, iCalDataAfter).join('\n');
      
      this.iCalUrl = encodeURI('data:text/calendar;charset=utf8,' + iCalData);
    }

    // data is truncated when it contains a "#" character
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI
    // https://en.wikipedia.org/wiki/Percent-encoding
    this.iCalUrl = this.iCalUrl.replace(/#/g, '%23');

    return this.iCalUrl;
  };

  this.getICalUrl = function() {
    return this.iCalUrl;
  };

  this.getICalLiHtml = function() {
    return this.getLiHtml('iCal', this.iCalUrl, 'ical', true);
  };

  this.openICal = function() {
    window.open(this.iCalUrl);
  };

  // Same as getICalUrl
  this.getOutlookUrl = function() {
    return this.iCalUrl;
  };

  // Same as getICalLiHtml
  this.getOutlookLiHtml = function() {
    return this.getLiHtml('Outlook', this.iCalUrl, 'outlook', true);
  };

  // Same as openICal
  this.openOutlook = function() {
    window.open(this.iCalUrl);
  };

  /*================================================================ Outlook Online
  */
  
  /**
   * @todo complete it
   * @todo take an arguments and return it instead of doing internal manipulation
   */
  this.updateOutlookOnlineUrl = function() {
    if (this.isSingleEvent) {
      var startDate = new Date(this.eventData.start),
        endDate = new Date(this.eventData.end);

      var startDateTimezoneOffset = startDate.getTimezoneOffset();
      startDate.setMinutes(startDate.getMinutes() - 2 * startDateTimezoneOffset); // HACK

      var endDateTimezoneOffset = endDate.getTimezoneOffset();
      endDate.setMinutes(endDate.getMinutes() - endDateTimezoneOffset); // HACK

      startDate = this.formatTime(startDate).slice(0, -1);
      endDate =  this.formatTime(endDate).slice(0, -1);

      var outlookOnlineArgs = {
        'summary'     : (this.eventData.title || ''),
        'dtstart'     : startDate,
        'dtend'       : endDate,
        'location'    : (this.eventData.location || ''),
        'description' : (this.eventData.description || '')
      };

      this.outlookOnlineUrl = 'http://calendar.live.com/calendar/calendar.aspx?rru=addevent&' + this.serialize(outlookOnlineArgs);
    }

    return this.outlookOnlineUrl;
  };

  this.getOutlookOnlineUrl = function() {
    return this.outlookOnlineUrl;
  };

  this.getOutlookOnlineLiHtml = function() {
    return this.getLiHtml('Outlook Online', this.outlookOnlineUrl, 'outlook-online');
  };

  this.openOutlookOnline = function() {
    window.open(this.outlookOnlineUrl);
  };

  /*================================================================ Yahoo
  */
 
  /**
   * @todo take an arguments and return it instead of doing internal manipulation
   */
  this.updateYahooUrl = function() {
    if (this.isSingleEvent) {
      var startDate = this.eventData.isAllDay
        ? this.formatTime2(new Date(this.eventData.start))
        : this.formatTime(new Date(this.eventData.start))

      // FIXED: Yahoo! calendar bug
      // 
      // Yahoo! did calculate timezone for `start`
      // but they did not calculate timezone for `end`
      var tmp = new Date(this.eventData.end);
      var timezoneOffset = tmp.getTimezoneOffset();
      tmp.setMinutes(tmp.getMinutes() - timezoneOffset);
      var endDate = this.eventData.isAllDay
        ? this.formatTime2(tmp)
        : this.formatTime(tmp)

      var yahooArgs = {
        'view'      : 'd',
        'type'      : '20',
        'title'     : (this.eventData.title || ''),
        'st'        : startDate,
        'et'        : endDate,
        // 'dur'       : '',
        'in_loc'    : (this.eventData.location || ''),
        'desc'      : (this.eventData.description || '')
      };

      this.yahooUrl = 'https://calendar.yahoo.com/?v=60&' + this.serialize(yahooArgs);
    }

    return this.yahooUrl;
  };

  this.getYahooUrl = function() {
    return this.yahooUrl;
  };

  this.getYahooLiHtml = function() {
    return this.getLiHtml('Yahoo!', this.yahooUrl, 'yahoo');
  };

  this.openYahoo = function() {
    window.open(this.yahooUrl);
  };

  /*================================================================ Widget
  */
  
  this.getEventListHtml = function() {
    var html = '<ul class="a2cldr-list">';

    html += this.getEventListItemsHtml();
    html += '</ul>';

    return html;
  };

  this.getEventListItemsHtml = function() {
    var html = '';

    html += this.getGoogleLiHtml();
    html += this.getICalLiHtml();
    html += this.getOutlookLiHtml();
    html += this.getOutlookOnlineLiHtml();
    html += this.getYahooLiHtml();

    return html;
  };

  // UNUSED
  // QUITE DUPLICATE
  this.getEventNotFoundListHtml = function() {
    var html = '<ul class="a2cldr-list">';

    html += this.getEventNotFoundListItemsHtml();
    html += '</ul>';

    return html;
  };

  // UNUSED
  // QUITE DUPLICATE
  this.getEventNotFoundListItemsHtml = function() {
    var html = '';

    html += '<li class="a2cldr-item a2cldr-not-found">';
    html += '<span class="not-found" href="javascript:;">Not Found</span>';
    html += '</li>';

    return html;
  };

  this.getWidgetNode = function() {
    var html = '<button class="a2cldr-btn" type="button">';
    html += this.getWidgetBtnText();
    html += '</button>';
    html += this.getEventListHtml();

    var result = document.createElement('div');
    result.innerHTML = html;
    result.className = this.textDomain;

    return result;
  };

  this.getWidgetBtnText = function() {
    var result = (this.option.buttonText)
      ? this.option.buttonText
      : this.add2calendarBtnTextMap[this.option.lang];

    return result;
  };

  /*================================================================ API (Public)
  */

  this.createWidget = function(selector, cb) {
    this.selector = selector;
    this.eWidget = document.querySelector(selector);

    // create and append into the DOM
    var node = this.getWidgetNode();
    this.eWidget.appendChild(node);

    // bind an event
    this.eButton = document.querySelector(selector + ' > .a2cldr > .a2cldr-btn');
    this.bindClickEvent();

    // callback
    if (this.isFunc(cb)) {
      cb();
    }
  };

  this.bindClickEvent = function() {
    var activeClassName = 'active';
    var self = this;
    var ele = this.eButton;
    
    ele.onclick = function() {
      var parent = ele.parentNode;
      if (self.hasClass(parent, activeClassName)) {
        parent.classList.remove(activeClassName);
      } else {
        parent.classList.add(activeClassName);
      }
    }
  };

  this.unBindClickEvent = function() {
    if (this.eButton && this.eButton.onclick) {
      this.eButton.onclick = null;
    }
  };

  this.setOption = function(option) {
    this.userOption = option;
    this.option = this.mergeObj(this.defaultOption, this.userOption);
  };

  this.resetOption = function() {
    this.option = this.defaultOption;
  };

  /*================================================================ API (Public) - In progress
  */

  this.update = function(eventData) {
    this.init(eventData);
  };

  this.updateWidget = function(eventData, cb) {
    this.update(eventData);

    var ele = document.querySelector(this.selector + ' .a2cldr-list');
    ele.innerHTML = this.getEventListItemsHtml();

    if (this.isFunc(cb)) {
      cb();
    }
  };

  /*================================================================ Global var
  */
 
  this.textDomain = 'a2cldr';
  this.add2calendarBtnTextMap = {
    'en': 'Add to Calendar',
    'th': 'เพิ่มเข้าปฏิทิน',
    'jp': 'カレンダーに追加',
    'kr': '캘린더에 추가',
    'ja': 'カレンダーに追加',
    'cn': '添加到日历',
    'de': 'In den Kalender',
    'es': 'Añadir al Calendario',
    'fr': 'Ajouter au calendrier',
    'ru': 'Добавить в календарь'
  };

  this.isSingleEvent;

  // constructor parameter
  this.eventData;

  this.selector;
  this.eWidget;

  // option
  this.defaultOption;
  this.userOption;
  this.option;

  this.googleUrl;
  this.iCalUrl; // iCal and Outlook
  this.yahooUrl;
  this.outlookOnlineUrl;
 
  /*================================================================ Init & Others
  */

  this.updateAllCalendars = function() {
    this.updateGoogleUrl();
    this.updateICalUrl();
    this.updateYahooUrl();

    // disabled@01112016-1146 - cause it's not working
    // this.updateOutlookOnlineUrl();
  };

  this.init = function(eventData) {
    this.isSingleEvent = ! this.isArray(eventData);

    if (! this.isValidEventData(eventData)) {
      console.log('Event data format is not valid');

      return false;
    }

    this.eventData = eventData;
    
    this.selector = '';
    this.eWidget = null; // widget element
    this.eButton = null; // button element to click for opening the list

    this.defaultOption = {
      lang: 'en',
      buttonText: '',
    };
    this.option = this.defaultOption;

    this.googleUrl = '';
    this.iCalUrl = ''; // iCal and Outlook
    this.yahooUrl = '';
    this.outlookOnlineUrl = '';

    this.updateAllCalendars();
  };

  this.init(eventData);
};

if (typeof module !== 'undefined' &&
  module.exports != null) {
  module.exports = Add2Calendar
}
