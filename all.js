/*jshint laxcomma:true*/
var APICraft = (function APICraft_API_closure (baseURL) {
  return function (endpoint) {
    return baseURL + endpoint;
  };
}('http://api.api-craft.org/conferences/detroit2013/'));

$.fn.ready(function ($) {
  var DAYNAMES
    , DAYNAMESLONG
    , TEMPLATE
    , TODAYSDAYNAME
    , TODAYSDAYNAMELONG
    , YEAR;

  DAYNAMES = 'Sun Mon Tue Wed Thu Fri Sat'.split(' ');
  DAYNAMESLONG = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' ');

  TEMPLATE = Handlebars
    .compile('{{#each events}}<div><h3>{{title}} <small>@{{location}}</small></h3><p>{{{detail}}}</p></div>{{/each}}');

  TODAYSDAYNAME = (/\w+/)
    .exec(new Date())[0];

  TODAYSDAYNAMELONG = DAYNAMESLONG[DAYNAMES.indexOf(TODAYSDAYNAME)];

  YEAR = (new Date()).getFullYear();

  $.get(APICraft('agenda'), function (res) {
    var todays_events;

    todays_events = res.agenda
      .map(function (item) {
        item.detail = item.start
          .replace(YEAR, YEAR + '<br />');

        item.detail += ' - ' + item.end
          .split(' ')
          .slice(-2)
          .join(' ');

        return item;
      }, []);

    $('article')
      .html(TEMPLATE({'events': todays_events}));
  });
});