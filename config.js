/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "localhost", // Address to listen on, can be:
	                      // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	                      // - another specific IPv4/6 to listen on a specific interface
	                      // - "", "0.0.0.0", "::" to listen on any interface
	                      // Default, when address config is left out, is "localhost"
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	                                                       // or add a specific IPv4 of 192.168.1.5 :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	                                                       // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	language: "en",
	timeFormat: 24,
	units: "metric",

	modules: [
//Control modules	
		{
			module: 'MMM-ModuleScheduler',
			        config: {
					            // SHOW MODULES WITH THE CLASS 'daytime_scheduler' AT 06:00 AND HIDE AT 22:00 EVERY DAY
						    //minutes, hours, days, months, weekday 
						global_schedule:[
							{from: '0 6 * * *', to: '0 9 * * *', groupClass: 'morning_schedule'},
							{from: '0 9 * * *', to: '0 17 * * *', groupClass: 'midday_schedule'},
							{from: '0 17 * * *', to: '0 23 * * *', groupClass: 'evening_schedule'}, 
							{from: '0 6 * * 1-5', to: '0 9 * * 1-5', groupClass: 'weekday_mornings'},
							{from: '* * 1 3 *', to: '* * 28 8 *', groupClass: 'MLB_schedule'}, 
							]
					}
		},
//		{
//			module: 'MMM-LCDControl',
//				config:
//				{
//					GPIO_PIR: 17,
//				        GPIO_LCD_ONOFF: 20,
//				        GPIO_LCD_STATUS: 12,
//				        screenOffTimer: 3
//					}
//		},
//Generic modules
		{
			module: "alert",
			postition: "top_bar",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			showWeek: true,
			displayType: "both",
			analogPlacement: "left",
			position: "top_bar"
		},
//Calendar Modules		
//		{
//			module: "calendar",
//			header: "Adam's Calendar",
//			position: "top_left",
//			config: {
//				calendars: [
//					{
//						symbol: "calendar-check-o ",
//						url: "https://calendar.google.com/calendar/ical/adam.forch%40gmail.com/private-63d14ee676a70cb50744223fc311a319/basic.ics"
//					}
//				]
//			}
//		},
		{
			module: "MMM-MyCalendar",
			header: "Kalendar van aankomende evenementen",
			position: "top_left",	// This can be any of the regions. Best results in left or right regions.
				config: {
						columns: true,
						colored: true,
						joiningWord: "om",
						calendars: [
							{
								url: "https://calendar.google.com/calendar/ical/adam.forch%40gmail.com/private-63d14ee676a70cb50744223fc311a319/basic.ics",
								symbol: 'calendar',
								color: '#10f263',
							},
							{
								url: "https://calendar.google.com/calendar/ical/amycol83%40gmail.com/private-5474050266e05d221fdef1f4187381f1/basic.ics",
								symbol: 'calendar',
								color: '#ef9621',
							},
							{
								url: "https://calendar.google.com/calendar/ical/en.dutch%23holiday%40group.v.calendar.google.com/public/basic.ics",
								symbol: 'calendar',
								color: '#f41844',
							}
						]
					}
		},
//Weather Modules
		{
			module: "MMM-rainfc",
			position: "top_right",
		        	header: "Regen voorspelling",
				config: {
					lat: "52.37",
					lon: "4.90", 
					width: 200,
					height: 150,
					lineWidth: 2,
					lineColor: "#e0ffe0",
					fillColor: "#e0ffe0",
					maxPower: 300,
					rainText: "Tot: ",
					noRainText: "Geen regen tot: ",
					nrOfTimeLabels: 5 // advised values: 2-5
					}
		},
		{
			module: 'MMM-WunderGround',
		    	position: 'top_right',
		    	config: {
			            apikey: 'ff69fb6d808fbc73', // private; don't share!
			            pws: 'pws:IZHLEIDE2', //Leiden NL
			            coloricon: true,
				    hourly: '0',
			            fctext: '1',
			            fcdaycount: "5",
			            fcdaystart: "0",
			            hourlyinterval: "8",
			            hourlycount: "1",
			            alerttime: 10000,
			            alerttruncatestring: "dutch:",
			    	roundTmpDecs: 1,
			    	UseCardinals: 0,
			    	layout: "vertical",
			    	sysstat: 0
			        }
		},
//Traffic Modules
		{
			module: 'MMM-GoogleMapsTraffic',
			position: 'bottom',
			classes: 'weekday_mornings',
				config: {
				key: 'AIzaSyBUlnbFgVNYkTKvf4kEo41Q4VzHdrGkIwU',
				//lat: 52.232240,
				//lng: 4.645028,
				lat: 52.237993,
				lng: 4.573202,
				height: '500px',
				width: '950px',
				zoom: 11
				}
		},
		{
			module: 'MMM-Traffic',
			position: 'bottom',
			classes: 'dimmed medium',
			classes: 'weekday_mornings',
			//classes: 'morning_schedule',//optional, default is 'bright medium', only applies to commute info not route_name
			config: {
						api_key: 'AIzaSyBUlnbFgVNYkTKvf4kEo41Q4VzHdrGkIwU',
						mode: 'driving',
						origin: 'Damloperwerf 49, 2317DT Leiden',
						destination: 'Taurusavenue 111, 2132LS Hoofddorp',
						//mon_destination: '116th St & Broadway, New York, NY 10027',
						//fri_destination: '1 E 161st St, Bronx, NY 10451',
						//arrival_time: '0800', //optional, but needs to be in 24 hour time if used.
						route_name: 'Huis naar kantoor',
						changeColor: true,
						showGreen: false,
						limitYellow: 5, //Greater than 5% of journey time due to traffic
						limitRed: 20, //Greater than 20% of journey time due to traffic
						traffic_model: 'pessimistic',
						interval: 120000, //2 minutes
						showWeekend: false,
						allTime: false
					}
		},
		{
			module: "bustimes",
			position: "top_left",
		        header: "Bustijden",
			config: {
				timepointcode: "54445370",
				displaymode: "large",
				departs: 3 
					}
		},
//"Other" modules
//		{
//			module: 'MMM-ImageSlideshow',
//			position: 'bottom_center',
//			classes: 'midday_schedule',
//			config: {
//				imagePaths: ['images/'],
//				fixedImageHeight: 500,
//				slideshowSpeed: 90000,
//			}	
//		},
		{
			module: "MMM-ImagesPhotos",
			position: "bottom_center",
			classes: "midday_schedule",
			config: {
				getInterval: 90000,
				opacity: 0.9,
				animationSpeed: 500,
				updateInterval: 15000,
				}
		},
		{
			module: 'MMM-MLB',
			position: 'right',
			classes: 'evening_schedule',
			config: {			      
					maxWidth: "400px",
					header: true,
					logo: true,
					focus_on: ["Rockies","Astros","Giants","Nationals"]
				}
		}
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
