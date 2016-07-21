# Create OpenEventDB map with uMap

## Umap

>[Umap](http://umap.openstreetmap.fr) is an open source, WTFPL-licensed software. An instance of it lets you create a map with OpenStreetMap layers in a minute and embed them in your site. You can create custom maps (see the examples at the instances' front pages).

See documentation on openstreetmap wiki : http://wiki.openstreetmap.org/wiki/UMap

<img src="./img/umap-start.jpg" width="700">


## A map with OpenEventDB datas

It's possible to create a map linked to OpenEventDatabase stream (datas)

### opening umap
Open [uMap](http://umap.openstreetmap.fr/fr/) and register and choose a provider (OpenStreetMap, GitHub, BitBucket or twitter at the moment).

<img src="./img/first-map.jpg" width="500">

### create a new map and quick settings
Click on "create a map", you can :

####Change basemap

<img src="./img/basemap-panel.jpg" width="500">

####Edit properties : 

<img src="./img/properties-map.jpg" width="500">

Now we want to add datas...

### adding OpenEventDB datas

Just let me take an exemple, **soccer competition "euro 2016"**.

To generate the stream it's quiet simple, just with an URL : http://api.openeventdatabase.org/event?what=sport.match.soccer.euro2016&start=2016-06-10&stop=2016-07-14

URL actually defines 2 filters : 
- when : start=2016-06-10&stop=2016-07-14
- what : sport.match.soccer.euro2016

Finally you have to define geojson format (default geojson).

<img src="./img/importing-oedb-settings.jpg" width="500">

Click on "Import" and enjoy the result...

<img src="./img/import-oedb-dataset.jpg" width="500">

###Customize popups

Now we have events diplayed on map but no popup on click...

By default key "name" is default field diplayed in popup.

If you want to diplay another field (or more) you can do it by customizing popup options.

It's quiet simple, you just have to type keys under brackets like {label}. That will bind datas if keys exists. Note that markdown format is supported for formatting, thats very flexible.

**You must desactivate edition to see result (allow click to popup)**

<img src="./img/customize-popup.jpg" width="500">

###Creating a realtime layer

The last exemple (euro 2016) is cool but only display static content.

You can also use live datas just in selecting the right filters (and a live datasource).

Exemple : today accidents

API offers special filters for when like last5minutes, today, lastmonth...

You just have to take the previos sample with this URL : http://api.openeventdatabase.org/event?what=traffic.accident&when=today 

<img src="./img/live-accidents.png" width="500">

## Links 

Editing filters doc : https://github.com/openeventdatabase/backend/wiki







