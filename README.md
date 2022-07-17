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

analyser.features = {
            'enableCustomStreaming':true, // Enable Analyser.js camera streaming. Else code it manually
            'centre_w':160, //width of the rectangle in centre
            'centre_h':120, //height of the rectangle in centre
            'drawLandmarks':true, //draw landMarks on face
            'drawCentreMark':true, //draw centre rectangle for alignment
            'strokeColor_before':'#FF0000', //color of markings on wrong alignment 'red'
            'strokeColor_after': '#00FF00', //color of markings on right alignment 'green'
            'status_elementId': document.getElementById("status"), //Element in which the status should be updated
          }
analyser.init_Face("video","canvas")  //id ofVideo and Canvas as params.
</script>

```

for demo [click here](https://what-the-sid.github.io/faceAnalyser-Browser/)
