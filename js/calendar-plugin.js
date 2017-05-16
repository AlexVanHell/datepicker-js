(function ($) {
	$.fn.datepicker = function( options ) {

		var calendarPluginDate = new Date(); 
		var settings = $.extend({
			inputId: undefined,
			leftButton: '',
			rightButton: '',
			backgroundColor: '#424242',
			buttonOpacity: '1',
			blockDays: false,
			separator: '/',
			yearSelection: true,
			startingYear: calendarPluginDate.getFullYear(),
			startingMonth: calendarPluginDate.getMonth() + 1,
			maxYear: calendarPluginDate.getFullYear(),
			minYear: calendarPluginDate.getFullYear() - 100,
			selectionCallBack: function() {},
        }, options );
        // Estos son los predeterminados

        var style = ''
			+	'<style type="text/css">'
			+ 		'.calendar_plugin_container .calendar_title .year_title button.year_change_button:hover{background-color: rgba(0,0,0,0.06);}'
			+ 		'.calendar_plugin_container .calendar_title .year_title ul.change_year_container li:hover{background-color: rgba(0,0,0,0.06);}'
			+ 		'.calendar_plugin_container .day_value.selected{background-color: ' + settings.backgroundColor + ';color: #fff;font-weight: bold;}'
			+ 		'.calendar_plugin_container .day_value:hover{background-color: rgba(0,0,0,0.06);}'
			+ 		'.calendar_plugin_container .day_value.selected:hover{background-color: #424242;color: #fff;font-weight: bold;}'
			+ 		'.calendar_plugin_container .calendar_buttons button:hover{background-color: rgba(0,0,0,0.07);}'
			+	'</style>';

		var days_labels = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
		var months_labels = ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];
		var days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		var current_date = new Date();

		return this.each( function() {
			var _this = $(this);
			var calendarObj = {};
			var todayDate = new Date();
			todayDate.setDate(todayDate.getDate() - 1);

			function Calendar( month, year ) {
				calendarObj.month = ( isNaN(month) || month == null ) ? current_date.getMonth() : month;
				calendarObj.year = ( isNaN(year) || year == null ) ? current_date.getFullYear() : year;
			}

			Calendar.prototype.generateHTML = function() {
				var firstDay = new Date(calendarObj.year, calendarObj.month, 1);
    			var startingDay = firstDay.getDay(); // Dia inicial en la semana
	      		var monthLength = days_in_month[calendarObj.month]; // Numero de dias en el mes
    			var month_string = calendarObj.month + 1;

				if ( calendarObj.month == 1 ) { // Febrero solamente
	            	if( ( calendarObj.year % 4 == 0 && calendarObj.year % 100 != 0 ) || calendarObj.year % 400 == 0 ) {
	                	monthLength = 29;
	            	}
	      		}

	      		if ( month_string < 10 ) {
	      			month_string = '0' + month_string;
	      		}

				var html = '';
				html += style;
				html += '<div class="calendar_plugin_container" style="width: 100%;margin: 0 auto;text-align: left;position: relative;fo">';
				html += 	'<div class="calendar_top">';
				html += 		'<div class="calendar_title" style="padding: 12px;padding-bottom: 18px;text-align: center;">';
				html +=				'<div class="month_title" style="padding: 0;font-weight: bold;font-size: 16px;">';
				html +=					months_labels[calendarObj.month];
				html += 			'</div>';
				html +=				'<div class="year_title" style="font-size: 14px;position: relative;">';
				html +=					calendarObj.year;
										if ( settings.yearSelection ) {
											html += '<button class="year_change_button" style="display: inline-block;line-height: 18px;margin: 0;padding: 0;width: 20px;height: 18px;vertical-align: middle;margin-left: 6px;cursor: pointer;background-color: transparent;text-align: center;border: none;position: relative;z-index: 2;">';
											html += 	'<i style="display: inline-block;width: 8px;height: 8px;vertical-align: middle;position: relative;top: -4px;border-right: 3px solid #000;border-bottom: 3px solid #000;opacity: 0.5;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-o-transform: rotate(45deg);-ms-transform: rotate(45deg);"></i></button>';
											html += '<ul class="change_year_container" style="position: absolute;margin: 0;padding: 0;background-color: #fff;box-shadow: 0 1px 4px rgba(0,0,0,0.18);z-index: 3;max-height: 120px;overflow: auto;display: none;width: 72px;left: 50%;margin-left: -36px;">';
											for ( var i = settings.maxYear ; i >= settings.minYear ; i-- ) {
												html += '<li class="year_selection" style="display: block;width: auto;cursor: pointer;padding: 6px;text-align: center;margin: 0;">' + i + '</li>';
											}
											html += '</ul>';
										}
				html += 			'</div>';
				html += 		'</div>';
				html += 		'<div class="calendar_buttons" style="width: 100%;height: 40px;padding: 0;position: absolute;top: 12px;">';
				html +=				'<button class="left" style="cursor: pointer;border: none;top: 0;width: 40px;height: 40px;background-size: 24px;background-repeat: no-repeat;background-position:center;background-color: transparent;opacity: '+ settings.buttonOpacity +';background-image: url('+ settings.leftButton +');"></button>';
				html +=				'<button class="right" style="cursor: pointer;border: none;top: 0;width: 40px;height: 40px;background-size: 24px;background-repeat: no-repeat;background-position:center;background-color: transparent;opacity: '+ settings.buttonOpacity +';background-image: url('+ settings.rightButton +');"></button>';
				html += 		'</div>';
				html += 	'</div>';
				html +=		'<div class="day_title" style="text-align: center;font-weight: bold;opacity: 0.6;">';
				html +=			'<div style="width: 14.285714285%;padding: 4px 0 4px 0;display: inline-block;margin: 0;vertical-align: top;">D</div><div style="width: 14.285714285%;padding: 4px 0 4px 0;display: inline-block;margin: 0;vertical-align: top;">L</div><div style="width: 14.285714285%;padding: 4px 0 4px 0;display: inline-block;margin: 0;vertical-align: top;">M</div><div style="width: 14.285714285%;padding: 4px 0 4px 0;display: inline-block;margin: 0;vertical-align: top;">M</div><div style="width: 14.285714285%;padding: 4px 0 4px 0;display: inline-block;margin: 0;vertical-align: top;">J</div><div style="width: 14.285714285%;padding: 4px 0 4px 0;display: inline-block;margin: 0;vertical-align: top;">V</div><div style="width: 14.285714285%;padding: 4px 0 4px 0;display: inline-block;margin: 0;vertical-align: top;">S</div>';
				html += 	'</div>';
				html += 	'<div class="calendar_m_cont" style="font-size: 15px;">';

			    // Llenar los dias
			    var day = 1;
			    // Bucle para las semanas
			    for ( var i = 0; i < 9; i++ ) {
			        // Dias de la semana
			        for ( var j = 0; j <= 6; j++ ) {
			            if ( day <= monthLength && ( i > 0 || j >= startingDay ) ) {
			            	var day_string = day > 9 ? day : '0' + day;
			            	var isValidDate = true;
			            	var newDate = new Date(calendarObj.year + '-' + month_string + '-' + day_string);

			            	if ( newDate.setHours(0,0,0,0) < todayDate.setHours(0,0,0,0) ) {
			            		isValidDate = false;
			            	}

			            	if ( settings.blockDays ) {
			            		if ( isValidDate ) {
			                		html += '<div class="day" style="width: 14.285714285%;height: 44px;display: inline-block;margin: 0;vertical-align: top;">';
			            		} else {
			            			html += '<div class="blocked_day" style="width: 14.285714285%;height: 44px;display: inline-block;margin: 0;vertical-align: top;opacity: 0.5;">';
			            		}
			            	} else {
			            		html += '<div class="day" style="width: 14.285714285%;height: 44px;display: inline-block;margin: 0;vertical-align: top;">';
			            	}
			                html += 	'<div class="day_value" data-value="' + day_string + settings.separator + month_string + settings.separator + calendarObj.year + '" style="line-height: 44px;text-align: center;cursor: pointer;width: auto;padding-left: 8px;padding-right: 8px;border-radius: 4px;">';
			                html +=			day;
			                html += 	'</div>';
			                html += '</div>';
			                
			                day++;
			            } else {
			                html += '<div class="day" style="width: 14.285714285%;height: 44px;display: inline-block;margin: 0;vertical-align: top;"></div>';
			            }
			        }
			        // Detener el ciclo al terminar los dias del mes
			        if ( day > monthLength ) {
			            break;
			        }
			    }
			    html += 	'</div>'
			    html += '</div>';

			    return html;
			}

			function changeMonth( status ) {
				if ( status ) {
					calendarObj.month--;
			    	if (calendarObj.month < 0) {
			        	calendarObj.month = 11;
			        	calendarObj.year--;
			    	}
				} else {
					calendarObj.month++;
				    if (calendarObj.month > 11) {
				        calendarObj.month = 0;
				        calendarObj.year++;
				    }
				}
			    _this.html( writeCalendar( calendarObj.month, calendarObj.year ) );
			}

		    function writeCalendar( month, year ) {
			    var cal = new Calendar( month,year );
			    return cal.generateHTML();
			}

			_this.html( writeCalendar( ( settings.startingMonth - 1 ), settings.startingYear ) );

		    function activeSelections() {
		    	_this.find('.day .day_value').click( function() {
		    		if ( $('input#'+ settings.inputId) ) {
		    			$('input#'+ settings.inputId).val( $(this).attr('data-value') );
		    		}
		    		_this.find('.day_value').removeClass('selected');
		    		$(this).addClass('selected');

		    		settings.selectionCallBack();
		    	});

		    	_this.click( function() {
		    		_this.find('.change_year_container').slideUp();
		    	});

		    	_this.find('button.year_change_button').on('click', function( event ) {
		    		event.preventDefault();
		    		event.stopPropagation();
		    		$(this).siblings('.change_year_container').slideDown().css('display', 'inline-block');
		    	});

		    	_this.find('.change_year_container li').on('click', function() {
		    		calendarObj.year = parseInt(jQuery(this).text());
		    		_this.html( writeCalendar( calendarObj.month, calendarObj.year ));
		    		activeSelections();
		    	});

		    	_this.find('button.left, button.right').on('click', function() {
			    	var checkMove = $(this).attr('class') == 'left' ? true : false;
			    	changeMonth( checkMove );

			    	activeSelections();
			    });
		    }

		    activeSelections();
		});
	};

}(jQuery));