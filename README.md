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
 //id ofVideo and Canvas as params.
analyser.init_Face("video:,"canvas");

//get analysed brightness (returns 1 if normal brightness.
  //define minimum and maximum brightness as params.
analyser.getBrightness(140,200);

//get distance of face from a centre area.
   //area(as rectangle) to be initialized as centre(in percentage) as params.
analyser.getDistancefromCentreRect(10);

//get distnace of face from centre point.
analyser.getDistancefromCentrePoint;

```
