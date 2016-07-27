= Earthquake scrapper (usgs datas)= 

== links ==
* API documentation : http://earthquake.usgs.gov/fdsnws/event/1/
* EarthQuake of the day 2.5+ (geoJson) : http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson
* Feed documentation : http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

== Issues == 

Getting timestamp, have to divide by 100


print datetime.datetime.fromtimestamp(1469507540390/1000).strftime('%Y-%m-%d %H:%M:%S.%f')

http://stackoverflow.com/questions/10286224/javascript-timestamp-to-python-datetime-conversion
