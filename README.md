# Face Analyser for Browsers

Simple Face detection and analyser for browser using [clmtrackr](https://github.com/auduno/clmtrackr).

# Usage:

``` html
<script src="script/clmtrackr.min.js"></script>
<script src="script/Analyser.js"></script>
<p id = "status"></p>
</head>
<video id="video" width="640" height="480" preload autoplay loop muted></video>
<canvas id="canvas" width="640" height="480"></canvas>

```
# script

``` javascript

<script>
var analyser = new Analyser(); //create new analyzing instance

analyser.features = {'centre_w':160, //width of centre rectangle
                'centre_h':120,  //height of centre rectangle
              'drawLandmarks':true, //draw facial landmarks
            'drawCentreMark':true, //draw rectangle guide in centre
            'strokeColor_before':'#FF0000', //color before right alignment
            'strokeColor_after': '#00FF00', //color after right alignment
            'status_elementId': document.getElementById("status") //input status to an element
          }
analyser.init_Face("video","canvas")  //id ofVideo and Canvas as params.
</script>

```
