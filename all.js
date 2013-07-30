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
    , TODAYSDAYNAMELONG;
 
  DAYNAMES = 'Sun Mon Tue Wed Thu Fri Sat'.split(' ');
  DAYNAMESLONG = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' ');

  TEMPLATE = Handlebars
    .compile('{{#each events}}<div><h2>{{title}}</h2><p>{{start}} - {{end}}</p></div>{{/each}}');

  TODAYSDAYNAME = (/\w+/)
    .exec(new Date())[0];
 
  TODAYSDAYNAMELONG = DAYNAMESLONG[DAYNAMES.indexOf(TODAYSDAYNAME)];
 
  $.get(APICraft('agenda'), function (res) {
    var todays_events;
 
    todays_events = res.agenda
      .filter(function (item) {
        return ~item.end.indexOf(TODAYSDAYNAMELONG);
      });
 
    $('article')
      .html(TEMPLATE({'events': todays_events}));
  });
});