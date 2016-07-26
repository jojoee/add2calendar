function hasClass(ele, cls) {
  return (' ' + ele.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function onA2cldrClicked(ele) {
  var activeClassName = 'active';
  var parent = ele.parentNode;

  if (hasClass(parent, activeClassName)) {
    parent.classList.remove(activeClassName);

  } else {
    parent.classList.add(activeClassName);
  }
}

var Add2Calendar = function(eventData) {

  /*================================================================ Util
  */
  
  /**
   * [formatTime description]
   * 
   * @param  {[type]} date [description]
   * @return {[type]}      [description]
   */
  this.formatTime = function(date) {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  }
    
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
  }

  this.isObjectType = function(obj, type) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  }

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
  }

  // UNUSED
  this.isArray = function(obj) {
    return this.isObjectType(obj, 'Array');
  }

  // UNUSED
  this.isFunc = function(obj) {
    return this.isObjectType(obj, 'Function');
  }

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
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }

    return str.join('&');
  }

  this.getLinkHtml = function(text, url, customClass) {
    return '<a class="' + customClass + '" target="_blank" href="' + url + '">' + text + '</a>';
  }

  /**
   * [getLiHtml description]
   *
   * @see http://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers
   * 
   * @param  {[type]} text        [description]
   * @param  {[type]} url         [description]
   * @param  {[type]} customClass [description]
   * @return {[type]}             [description]
   */
  this.getLiHtml = function(text, url, customClass) {
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
      var linkHtml = this.getLinkHtml(text, url, 'icon-' + customClass);
      result = '<li class="a2cldr-item a2cldr-' + customClass + '">' + linkHtml + '</li>';
    }

    return result;
  }

  /*================================================================ Google
  */

  this.updateGoogleUrl = function() {
    if (this.isSingleEvent) {
      var startDate = this.formatTime(new Date(this.eventData.start)),
        endDate = this.formatTime(new Date(this.eventData.end));

      var googleArgs = {
        'text'      : this.eventData.title,
        'dates'     : startDate + '/' + endDate,
        'location'  : this.eventData.location,
        'details'   : this.eventData.description,
        'sprop'     : ''
      };

      this.googleUrl = 'https://www.google.com/calendar/render?action=TEMPLATE&' + this.serialize(googleArgs);
    }
  }

  this.getGoogleUrl = function() {
    return this.googleUrl;
  }

  this.getGoogleLiHtml = function() {
    return this.getLiHtml('Google', this.googleUrl, 'google');
  }

  this.openGoogle = function() {
    window.open(this.googleUrl);
  }

  /*================================================================ iCal / Outlook
  */
 
  this.updateICalUrl = function() {
    if (this.isSingleEvent) {
      var startDate = this.formatTime(new Date(this.eventData.start)),
        endDate = this.formatTime(new Date(this.eventData.end));

      this.iCalUrl = encodeURI(
        'data:text/calendar;charset=utf8,' +
        [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'BEGIN:VEVENT',
          'URL:'          + document.URL,
          'DTSTART:'      + startDate,
          'DTEND:'        + endDate,
          'SUMMARY:'      + this.eventData.title,
          'DESCRIPTION:'  + this.eventData.description,
          'LOCATION:'     + this.eventData.location,
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

        var startDate = this.formatTime(new Date(data.start)),
          endDate = this.formatTime(new Date(data.end));

        var tmp = [
          'BEGIN:VEVENT',
          'URL:'          + document.URL,
          'DTSTART:'      + startDate,
          'DTEND:'        + endDate,
          'SUMMARY:'      + data.title,
          'DESCRIPTION:'  + data.description,
          'LOCATION:'     + data.location,
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
  }

  this.getICalUrl = function() {
    return this.iCalUrl;
  }

  this.getICalLiHtml = function() {
    return this.getLiHtml('iCal', this.iCalUrl, 'ical');
  }

  this.openICal = function() {
    window.open(this.iCalUrl);
  }

  // Same as getICalUrl
  this.getOutlookUrl = function() {
    return this.iCalUrl;
  }

  // Same as getICalLiHtml
  this.getOutlookLiHtml = function() {
    return this.getLiHtml('Outlook', this.iCalUrl, 'outlook');
  }

  // Same as openICal
  this.openOutlook = function() {
    window.open(this.iCalUrl);
  }

  /*================================================================ Outlook Online
  */
  
  this.updateOutlookOnlineUrl = function() {
    if (this.isSingleEvent) {
      var startDate = new Date(this.eventData.start),
        endDate = new Date(this.eventData.end);

      startDateTimezoneOffset = startDate.getTimezoneOffset();
      startDate.setMinutes(startDate.getMinutes() - 2 * startDateTimezoneOffset); // HACK

      endDateTimezoneOffset = endDate.getTimezoneOffset();
      endDate.setMinutes(endDate.getMinutes() - endDateTimezoneOffset); // HACK

      startDate = this.formatTime(startDate).slice(0, -1);
      endDate =  this.formatTime(endDate).slice(0, -1);

      var outlookOnlineArgs = {
        'summary'     : this.eventData.title,
        'dtstart'     : startDate,
        'dtend'       : endDate,
        'location'    : this.eventData.location,
        'description' : this.eventData.description
      };

      this.outlookOnlineUrl = 'http://calendar.live.com/calendar/calendar.aspx?rru=addevent&' + this.serialize(outlookOnlineArgs);
    }
  }

  this.getOutlookOnlineUrl = function() {
    return this.outlookOnlineUrl;
  }

  this.getOutlookOnlineLiHtml = function() {
    return this.getLiHtml('Outlook Online', this.outlookOnlineUrl, 'outlook-online');
  }

  this.openOutlookOnline = function() {
    window.open(this.outlookOnlineUrl);
  }

  /*================================================================ Yahoo
  */
 
  this.updateYahooUrl = function() {
    if (this.isSingleEvent) {
      var startDate = this.formatTime(new Date(this.eventData.start));

      // FIXED: Yahoo! calendar bug
      // 
      // Yahoo! did calculate timezone for `start`
      // but they did not calculate timezone for `end`
      var tmp = new Date(this.eventData.end);
      var timezoneOffset = tmp.getTimezoneOffset();
      tmp.setMinutes(tmp.getMinutes() - timezoneOffset);
      var endDate = this.formatTime(tmp);

      var yahooArgs = {
        'view'      : 'd',
        'type'      : '20',
        'title'     : this.eventData.title,
        'st'        : startDate,
        'et'        : endDate,
        // 'dur'       : '',
        'in_loc'    : this.eventData.location,
        'desc'      : this.eventData.description
      };

      this.yahooUrl = 'https://calendar.yahoo.com/?v=60&' + this.serialize(yahooArgs);
    }
  }

  this.getYahooUrl = function() {
    return this.yahooUrl;
  }

  this.getYahooLiHtml = function() {
    return this.getLiHtml('Yahoo!', this.yahooUrl, 'yahoo');
  }

  this.openYahoo = function() {
    window.open(this.yahooUrl);
  }

  /*================================================================ Widget
  */
  
  this.getSingleEventWidgetNode = function() {
    var html = '<span class="a2cldr-btn" onclick="onA2cldrClicked(this);">Add to Calendar</span>' +
      '<ul class="a2cldr-list">';

    html += this.getGoogleLiHtml();
    html += this.getICalLiHtml();
    html += this.getOutlookLiHtml();
    html += this.getOutlookOnlineLiHtml();
    html += this.getYahooLiHtml();

    var result = document.createElement('div');
    result.innerHTML = html;
    result.className = 'a2cldr';
    result.id = 'a2cldr';

    return result;
  }
  
  /*================================================================ Init & Others
  */ 
  
  // http://stackoverflow.com/questions/3390396/how-to-check-for-undefined-in-javascript
  // http://stackoverflow.com/questions/2647867/how-to-determine-if-variable-is-undefined-or-null
  if (typeof eventData == 'undefined') return false;
  if (! this.isValidEventData(eventData)) return false;
  
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

  this.defaultEventData = {
    title       : '',
    location    : '',
    description : '',
    customClass : this.textDomain,
    customId    : this.textDomain,
    lang        : 'en' // country code
  };

  // TODO
  // merge `eventData` with `defaultEventData`
  this.eventData = eventData;
  this.isSingleEvent = ! this.isArray(eventData);

  this.googleUrl = '';
  this.iCalUrl = ''; // iCal and Outlook
  this.yahooUrl = '';
  this.outlookOnline = '';

  this.updateAllCalendars = function() {
    this.updateGoogleUrl();
    this.updateICalUrl();
    this.updateYahooUrl();
    this.updateOutlookOnlineUrl();
  }

  this.init = function() {
    this.updateAllCalendars();
  }

  this.init();
};
