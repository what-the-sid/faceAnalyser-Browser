function testVideo()
{
  this.face = []
  this.x;
  this.canvas;
  this.context;
  this.getData('face-min.js',callback);
  this.getData('stats.min.js',callback);
  this.getData('tracking-min.js',callback);
}


testVideo.protoype.getFaceRect = function(rect)
{
  this.face[0] = rect.x
  this.face[1] = rect.y
  this.face[2] = rect.width
  this.face[3] = rect.height
}


testVideo.protoype.getCentreRect = function(incrm)
{
  var centre = []

  width = findPerValue(this.face[2],incrm)
  height = findPerValue(this.face[3],incrm)

  centre[0] = this.canvas.width - width;
  centre[1] = this.canvas.height - height;

  centre[2] = this.canvas.width + width;
  centre[3] = this.canvas.height + height;

  return centre
}

function findPerValue(x,incrm)
{
  var value = x/100*incrm
  value = x+value
}


function findCentrePoints(coord)
{
  centre = {}
  centre_points = [(coord[2]+coord[0])/2,(coord[3]+coord[1])/2]
  point = 0

  for(i=0;i<2;i++){
    for(j=0;j<2;j++){
      centre[point]={x:centre_points[i],y:centre_points[j]}
      point++
    }
  }
  return centre
}


function findDistance(centreX,centreY,initX,initY)
{
  distance = Math.sqrt(((centreX-initX)*(centreX-initX)) + ((centreY-initY)*(centreY-initY)))
  return distance
}


testVideo.protoype.getDistancefromCentreRect = function(incrm)
{
  var centre_c = findCentrePoints(getCentreRect(incrm))
  var centre_f = findCentrePoints(getCentreRect(this.face))
  var faceDiff=[]

  for(i=0;i<4;i++){
  faceDiff[i] = findDistance(centre_c[i].x,centre_c[i].y,centre_f[i].x,centre_f[i].x)
  }

  return faceDiff
}


testVideo.prototype.getDistancefromCentrePoint = function()
{
  distance = 0

  var centreX = this.face[0]+(((this.face[0]+this.face[2])-this.face[0])/2)
  var centreY = this.face[1]+(((this.face[1]+this.face[3])-this.face[1])/2)

  var initX = this.canvas.width;
  var initY = this.canvas.height;

  return findDistance(centreX,centreY,initX,initY)

}


testVideo.protoype.getBrightness = function(min,max)
{
  var brightness = 0;
  var imgData = this.context.getImageData(this.face[0], this.face[1], this.face[2], this.face[3]);
  for (i = 0; i < imgData.data.length; i += 4) {
    brightness += 0.299*imgData.data[i] + 0.587*imgData.data[i+1] + 0.114*imgData.data[i+2]
  }

  brightness = brightness/imgData.data.length

  if(brightness <= min || brightness >= max)
    return 0
  else
    return 1
}


testVideo.prototype.init_Face = function(videoId,canvasId)
{
  var video = document.getElementById(videoId);
  this.canvas = document.getElementById(canvasId);
  this.context = canvas.getContext('2d');
  var tracker = new tracking.ObjectTracker('face');

  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);
  tracking.track(video.id, tracker, { camera: true });
  tracker.on('track', function(event) {
    event.data.forEach(function(rect) {
      this.getFaceRect(rect)
    });
  });
}

var callback = function(){
  return "Done"
}

testVideo.prototype.getData(jsFilePath,callback)
{
  var js = document.createElement("script");

  js.type = "text/javascript";
  js.src = jsFilePath;

  document.head.appendChild(js);

  js.onreadystatechange = callback;
  js.onload = callback;
}
