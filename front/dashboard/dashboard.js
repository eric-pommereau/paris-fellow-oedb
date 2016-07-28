var map;
var api = 'http://api.openeventdatabase.org/event';

// Pour chaque requête prédéfinie on associe le div destination

var preDefinedEvents =[
    {"btn":"btn_total_5_min", "glyph":"th-list", "reqDatas":jQuery.param({"when":"last5minutes"}), "layer": L.geoJson()},
    {"btn":"btn_traffic_1_hour", "glyph":"road", "reqDatas":jQuery.param({"when":"last30minutes", "what":"traffic", "near":"2.36,48.85,20000"}), "layer": L.geoJson()},
    {"btn":"btn_nature_2_days", "glyph":"globe", "reqDatas":jQuery.param({"when":"last48hours", "what":"nature"}), "layer": L.geoJson()},
    {"btn":"btn_weather_12_hours", "glyph":"cloud", "reqDatas":jQuery.param({"when":"last12hours", "what":"weather", "near":"2.36,48.85,20000"}), "layer": L.geoJson()},
    {"btn":"btn_health_blood_12_hours", "glyph":"heart", "reqDatas":jQuery.param({"when":"last12hours", "what":"health.blood.collect"}), "layer": L.geoJson()},
    {"btn":"btn_transports_6_hours", "glyph":"plane", "reqDatas":jQuery.param({"when":"last6hours", "what":"public_transport"}), "layer": L.geoJson()}
];

function getPredefinedEvent(targetId) {
    for(var i=0;i<preDefinedEvents.length;i++) {
        item = preDefinedEvents[i];
        if(targetId == item.btn) return item; 
    }
    return 0;
}

function init() {
                    
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors&nbsp;|&nbsp;Events : <a href="https://github.com/openeventdatabase/backend/wiki">OpenEvenDB</a>',
        osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});
    map = new L.Map('map', {layers: [osm], center: new L.LatLng(46.9886, 2.08740), zoom: 6 });

    for(var i=0;i<preDefinedEvents.length;i++) {
        item = preDefinedEvents[i];
        updateEvents(item.reqDatas, item.btn, false);
    }

    $("#btn_total_5_min").click(function(event) {
        var reqDatas =  jQuery.param({"when":"last5minutes"});
        updateEvents(reqDatas, 'btn_total_5_min', true);
    });
    
    $("#btn_traffic_1_hour").click(function(event) {
        var reqDatas =  jQuery.param({"when":"last30minutes", "what":"traffic", "near":"2.36,48.85,20000"});
        updateEvents(reqDatas, 'btn_traffic_1_hour', true);
    });
    
    $("#btn_nature_2_days").click(function(event) {
        var reqDatas =  jQuery.param({"when":"last48hours", "what":"nature"});
        updateEvents(reqDatas, 'btn_nature_2_days', true);
    });    
    
    $("#btn_weather_12_hours").click(function(event) {
        var reqDatas =  jQuery.param({"when":"last12hours", "what":"weather", "near":"2.36,48.85,20000"});
        updateEvents(reqDatas, 'btn_weather_12_hours', true);
    });        

    $("#btn_health_blood_12_hours").click(function(event) {
        var reqDatas =  jQuery.param({"when":"last12hours", "what":"health.blood.collect"});
        updateEvents(reqDatas, 'btn_health_blood_12_hours', true);
    });
    
    $("#btn_transports_6_hours").click(function(event) {
        var reqDatas =  jQuery.param({"when":"last6hours", "what":"public_transport"});
        updateEvents(reqDatas, 'btn_transports_6_hours', true);
        
    });

}

function updateEvents(reqDatas, targetId, bFitBounds) {
    // console.log(reqDatas, targetId);
    $.ajax({
            url : api,
            data: decodeURIComponent(reqDatas),
            dataType : 'json',
            context: {"targetId":targetId, "fitBounds" : bFitBounds}
        }).done(function(events) {
            var context = this;
            $("#"+ context.targetId + " .count").html( events.count );
            updateMap(context.targetId, events, context.fitBounds);
        });
}

function updateMap(targetId, events, fitBounds) {
    console.log(targetId, events, fitBounds);
    evt = getPredefinedEvent(targetId);
    evt.layer.clearLayers();
    // console.log(evt.layer);
    evt.layer = L.geoJson(events,{pointToLayer: function(feature, latlng){
        var marker = L.marker(latlng, {
            icon: L.icon.glyph({
                prefix: 'glyphicon',
                glyph: evt.glyph
            })
        });
        popup = "<b>" + feature.properties.name + "</b>" + 
                "<br />What : " + feature.properties.what + 
                "<br />Source : " + feature.properties.source; 
        return marker.addTo(map).bindPopup(popup);
    }}).addTo(map);
    
    evt.layer.bringToFront();
    
    if(fitBounds == true) {
        console.log(fitBounds);
        map.fitBounds(evt.layer.getBounds());    
    }
    
}
