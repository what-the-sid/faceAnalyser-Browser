# Face Analyser for Browsers

Simple Face detection and analyser for browser using [Tracking.js](https://trackingjs.com).

# Usage:

``` html
<video id="video"></video>
<canvas id="script"></canvas>

<script src="script/Analyser.js"></script>

```
# script

``` javascript

var analyser = new Analyser;

//Detect new face.
analyser.init_Face("video","canvas");  //id ofVideo and Canvas as params.

//get analysed brightness (returns 1 if normal brightness.
analyser.getBrightness(140,200);  //define minimum and maximum brightness as params[0-255].

//get distance of face from a centre area.
analyser.getDistancefromCentreRect(10);   //area(as rectangle) to be initialized as centre(in percentage) as params.

//get distnace of face from centre point.
analyser.getDistancefromCentrePoint;

```
