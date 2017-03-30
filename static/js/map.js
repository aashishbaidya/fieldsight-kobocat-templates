

var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var baseLayers = {
    "OpenStreetMap": osm,
    "Google Streets": googleStreets,
    "Google Hybrid": googleHybrid,
    "Google Satellite": googleSat,
    "Google Terrain": googleTerrain
};


markers = new L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
        icon = L.icon({
                        //iconSize: [27, 27],
                        iconAnchor: [13, 27],
                        popupAnchor:  [1, -24],
                        iconUrl: static_url+'css/images/marker-icon.png'
                        });
        //console.log(icon.options);
        var marker = L.marker(latlng, {icon: icon});
        return marker;
        
    }, 
    onEachFeature: function(feature, layer) {
        var address = feature.properties.address || "";
        var url = "<a href=fieldsight/site-dashboard/"+feature.id+">"+feature.properties.name+"</a>";
        layer.bindPopup(url+'<br/>'+address);
        
    }
});

        map = L.map("map",{layers:osm}).fitBounds(markers);
        
        //map.addLayer(osm);
        layerswitcher = L.control.layers(baseLayers, {}, {collapsed: true, position: "topleft"}).addTo(map);

        map.addLayer(markers);




// map.fitBounds(markers.getBounds());

        layerswitcher.addOverlay(markers, "Schools");

markers.on('click',function(e){
    var site_id = e.layer.feature.id;
    // console.log(server_url+'/fieldsight/api/site-schedules/'+site_id);
    $.ajax({
url: '/fieldsight/api/site-images/'+site_id,
type: 'get', // This is the default though, you don't actually need to always mention it
dataType: "json",
success: function(data) {
img = '';
for(i=0;i<data.images.length;i++){console.log(data.images[i]);
    img += '<img src = '+data.images[i]+'/>';
}

 $('.popop-container').show();
 $('.popop-gallery').html(img);
//$('.popop-gallery').html(data.images);
},
failure: function(data) { 
}
}); 
    $('.popop-head').addClass('changed');
    $('.popop-head').html(e.layer.feature.properties.name);
    $('.address-popop').html(e.layer.feature.properties.address);
    //$('.contact-popup').html(e.layer.feature.properties.contact);


});

map.on('click',function(){
    $('.popop-head').removeClass('changed');
    $('.popop-head').html('');
    $('.address-popop').html('');
    //$('.contact-popup').html('');
});

