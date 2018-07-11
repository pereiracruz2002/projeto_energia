//localization example for daterang picker
//change moment.js language to French
//example taken from: http://momentjs.com/docs/#/i18n/changing-language/
 moment.locale('pt-BR', {
    months : "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
    monthsShort : "jan._fev._mar_abr._mai_jun_jul._ago_set._out._nov._dez.".split("_"),
    weekdays : "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split("_"),
    weekdaysShort : "dom._seg._ter._qua._qui._sex._sab.".split("_"),
    weekdaysMin : "Do_Se_Ter_Qua_Qui_Se_Sa".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay: "[Hoje] LT",
        nextDay: '[Amanhã] LT',
        nextWeek: 'dddd [Próxima semana] LT',
        lastDay: '[Último dia] LT',
        lastWeek: 'dddd [Semana passada] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "em %s",
        past : "há %s",
        s : "segundos",
        m : "um minuto",
        mm : "%d minutos",
        h : "uma hora",
        hh : "%d horas",
        d : "um dia",
        dd : "%d dias",
        M : "um mês",
        MM : "%d meses",
        y : "um ano",
        yy : "%d anos"
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
 });

 //I've translated the following texts using Google Translate, so it may not be correct
 $('#id-date-range-picker-1').daterangepicker({
  locale : {
	applyLabel: 'Choisir',
	clearLabel: 'Nettoyer',
	fromLabel: 'Dès',
	toLabel: 'Vers',
	weekLabel: 'W',
	customRangeLabel: 'Plage personnalisée',
	daysOfWeek: moment()._locale._weekdaysMin,
	monthNames: moment()._locale._monthsShort,
	firstDay: 0
  }
 })/**.prev().on('click', function(){
	$(this).next().focus();
 });*/
