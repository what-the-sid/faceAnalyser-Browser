function Analyser()
{
  this.features = {}
  this.points;
  this.result = {};
  this.centreSize = 10;
  this.getBrightnessBool = false;
  this.getDistancefromCentreRectBool = false;
}

Analyser.prototype.getCentreRect = function(canvas)
{
  var centre = []
  var w_incrm = this.features['centre_w']
  var h_incrm = this.features['centre_h']
  centre = [canvas.width/2,canvas.height/2]
  var central =[]


  centre[0] = centre[0] - w_incrm;
  centre[1] = centre[1] - h_incrm;

  centre[2] = w_incrm*2;
  centre[3] = h_incrm*2;
  this.points = centre
  return centre
}

Analyser.prototype.getDistancefromCentreRect = function(matrix,points)
{
  var check = []
  function isBetween(array)
  {
    //console.log([array[0]-points[0],array[0]-points[2]])
    if(array[0]>=points[0] && array[0]<=points[2]+points[0]
      &&array[1]>=points[1]&&array[1]<=points[3]+points[1])
    return 1
    else {
      return 0
    }
  }

  for(i=0;i<matrix.length;i++){
    check[i]=isBetween(matrix[i])
  }

  return check
}

// Analyser.prototype.getBrightness = function()
// {
//   var brightness = 0;
//   var count = 0
//   if(this.face.length>=1)
//   {
//   var imgData = this.context.getImageData(this.face[0]+10, this.face[1]+10, this.face[2]-10, this.face[3]-10);
//   for (i = 0; i < imgData.data.length; i += 4) {
//     count += 3
//     value = (imgData.data[i] + imgData.data[i+1]+ imgData.data[i+2])/3
//     if(value>0)
//     brightness += value
//   }
// console.log(brightness/count)
// return brightness
//   }
// }

Analyser.prototype.liveStreaming = function()
{
  const constraints = {
    video: true
  };

  const video = document.querySelector("video");

  function handleSuccess(stream) {
    video.srcObject = stream;
  }

  function handleError(error) {
    console.error('Rejected!', error);
  }

  navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);
}


Analyser.prototype.init_Face = function(videoId,canvasId)
{
  if(this.features['enableCustomStreaming']==true)
    this.liveStreaming();

  var pointer=this
  var videoInput = document.getElementById(videoId);
  canvas = document.getElementById(canvasId);
  context = canvas.getContext('2d')
  var ctracker = new clm.tracker();
  ctracker.init();
  ctracker.start(videoInput);
  var points = this.getCentreRect(canvas)
  var statusElement = pointer.features['status_elementId']
  // var statusDomain = pointer.features['status_elementDomain;']

  function positionLoop() {

    requestAnimationFrame(positionLoop);

    if(pointer.features['drawCentreMark']==true){
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.rect(points[0],points[1],points[2],points[3])
      context.stroke();
    }

    var positions = ctracker.getCurrentPosition();
    try{
    if(pointer.features['drawLandmarks']==true){
      if(pointer.result['alignment']!=false){
        if(pointer.result['alignment'][0]==1 && pointer.result['alignment'][1]==1 && pointer.result['alignment'][2]==1) {
          context.strokeStyle = pointer.features['strokeColor_after']
          statusElement.innerHTML = "Hurray!! Level completed"
        }

        else{
          context.strokeStyle = pointer.features['strokeColor_before']
          statusElement.innerHTML = "Game Level: Move the triangle into the rectangle"
        }
      }
      context.beginPath();
      context.moveTo(positions[0][0], positions[0][1]);
      context.lineTo(positions[14][0], positions[14][1]);
      context.lineTo(positions[7][0], positions[7][1]);
      context.closePath();
      context.stroke();
    }
    var marks = [positions[0],positions[14],positions[7]]

      var value=pointer.getDistancefromCentreRect(marks,points)
      pointer.result = {'alignment':value,'face':true}
    }

    catch(err){
      pointer.result = {'alignment':false,'face':false}
      statusElement.innerHTML = "No Face found"
    }
  }
  positionLoop();
}
