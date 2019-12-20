var blobs = [];
var bs=10;
var w=100;
var h=50;

configs = {
  groups: 2,
  bottom: 120,
  top: 130
}

function newBlob() {
  return   { r: random(90,120),
    p:  createVector(random(w), random(h)) ,
    a:  createVector(random(.1,1), random(.1,1)),
    s:  random(1,2) };  
}

function setup() {

  createCanvas(bs*w, bs*h);
  //  colorMode(HSB);

  for (var i=0; i < configs.groups; i++) {
    blobs.push(  newBlob() );
  }

  // var gui = createGui('My awesome GUI');
  // gui.addObject(configs);


}

function updateBlobs() {
  for (var b=0; b < blobs.length; b++) {
    blobs[b].p.add( blobs[b].a )
    if (blobs[b].p.x > w || blobs[b].p.x < 0) { blobs[b].a.x *= -1; }
    if (blobs[b].p.y > h || blobs[b].p.y < 0) { blobs[b].a.y *= -1;}

    // blobs[b].r -= blobs[b].s;
    //if (blobs[b].r <= 0) { blobs[b] = newBlob(); }
  }
}

function draw() {

  background(0);
  updateBlobs();
  // noStroke();
  // loadPixels(); 
  var points = [];

  for (var x=0; x < w; x++) {
    for (var y=0; y < h; y++) {
      var t = 0;
      for (var b=0; b < blobs.length; b++) {
        t += (10 * blobs[b].r) / Math.sqrt( ( Math.pow( x - blobs[b].p.x,2) + Math.pow(y - blobs[b].p.y,2)) );
      }
      // set(x,y, color(t, 255,255));
      t = Math.floor(t);
       if (t > configs.bottom && t < configs.top) {
        // fill ( color(t, 255,255) );
        // rect(x*bs, y*bs, bs,bs);
        points.push( createVector(x*bs, y*bs) );
      }
    }
  }
  
   var pointsPrime = points.map( v => [v.x, v.y] );
   var data = getClusters(pointsPrime, {numberOfClusters: configs.groups}) ;
   // var data = getClusters(pointsPrime);

   for (let d of data) {    
  
      if (d.data.length == 0) {
        continue;
      }

      var pointsVector = d.data.map( p => createVector(p[0], p[1]) );
      var hp = hull(pointsVector);

      fill("#f65c78");
      stroke("#ffd271");
     strokeWeight(5);
      beginShape();
        for (let p of hp) {
          vertex(p.x, p.y);
        }
      endShape(CLOSE);
  } 

}

function hull(points) {

  var currentVertex;
  var index=0;
  var leftMost;
  var nextIndex = -1;
  var nextVertex;
  var left;
  var hullPoints = [];

  points.sort( (a,b) => a.x > b.x  );
  left = points[0];
  leftMost = points[0];
  currentVertex = left;
  nextVertex = points[1];
  index = 2;
  hullPoints.push( currentVertex );

  while(true) {
    let checking = points[index];
    const a = p5.Vector.sub( nextVertex, currentVertex);
    const b = p5.Vector.sub( checking, currentVertex);  
    const cross = a.cross(b);

    if (cross.z < 0) {
      nextVertex = checking;
      nextIndex = index;
    }

    index++;

    if (index == points.length) {
      if (nextVertex == leftMost) { break; }
      hullPoints.push( nextVertex);
      currentVertex = nextVertex;
      index=0;
      nextVertex = leftMost; 
    }
  }
  return hullPoints;
}


function getClusters(data, options) {

	var numberOfClusters, distanceFunction, vectorFunction, minMaxValues, maxIterations;

	if (!options || !options.numberOfClusters) { numberOfClusters = getNumberOfClusters(data.length); }
	else { numberOfClusters = options.numberOfClusters; }

	if (!options || !options.distanceFunction) { distanceFunction = getDistance; }
	else { distanceFunction = options.distanceFunction; }

	if (!options || !options.vectorFunction) { vectorFunction = defaultVectorFunction; }
    else { vectorFunction = options.vectorFunction; }

    if (!options || !options.maxIterations) { maxIterations = 1000; }
    else { maxIterations = options.maxIterations; }


	var numberOfDimensions = getNumnerOfDimensions(data, vectorFunction);

	minMaxValues = getMinAndMaxValues(data, numberOfDimensions, vectorFunction);

	return getClustersWithParams(data, numberOfDimensions, numberOfClusters, distanceFunction, vectorFunction, minMaxValues, maxIterations).clusters;
}


function getClustersWithParams(data, numberOfDimensions ,numberOfClusters, distanceFunction, vectorFunction, minMaxValues, maxIterations) {

	var means = createRandomMeans(numberOfDimensions, numberOfClusters, minMaxValues);

	var clusters = createClusters(means);

	var prevMeansDistance = 999999;

    var numOfInterations = 0;
    var iterations = [];


	while(numOfInterations < maxIterations) {

		initClustersData(clusters);

	    assignDataToClusters(data, clusters, distanceFunction, vectorFunction);

		updateMeans(clusters, vectorFunction);

		var meansDistance = getMeansDistance(clusters, vectorFunction, distanceFunction);

	    //iterations.push(meansDistance);
        // console.log(numOfInterations + ': ' + meansDistance);
        numOfInterations++;
	}

	// console.log(getMeansDistance(clusters, vectorFunction, distanceFunction));

    return { clusters: clusters, iterations: iterations };
}

function defaultVectorFunction(vector) {
	return vector;
}

function getNumnerOfDimensions(data, vectorFunction) {
    if (data[0]) {
        return vectorFunction(data[0]).length;
    }
	return 0;
}

function getNumberOfClusters(n) {
	return Math.ceil(Math.sqrt(n/2));
}

function getMinAndMaxValues(data, numberOfDimensions, vectorFunction) {

	var minMaxValues = initMinAndMaxValues(numberOfDimensions);

	data.forEach(function (vector) {

		for (var i = 0; i < numberOfDimensions; i++) {

			if (vectorFunction(vector)[i] < minMaxValues.minValue[i]) {
				minMaxValues.minValue[i] = vectorFunction(vector)[i];
			}

			if(vectorFunction(vector)[i] > minMaxValues.maxValue[i]) {
				minMaxValues.maxValue[i] = vectorFunction(vector)[i];
			}
		};
	});


	return minMaxValues;
}


function initMinAndMaxValues(numberOfDimensions) {

	var result = { minValue : [], maxValue : [] }

	for (var i = 0; i < numberOfDimensions; i++) {
		result.minValue.push(9999);
		result.maxValue.push(-9999);
	};

	return result;
}


function printMeans(clusters) {
	var means = '';

	clusters.forEach(function (cluster) {
		means = means + ' [' + cluster.mean + ']'
	});

	// console.log(means);
}

function getMeansDistance(clusters, vectorFunction, distanceFunction) {

	var meansDistance = 0;

	clusters.forEach(function (cluster) {

		cluster.data.forEach(function (vector) {

		    meansDistance = meansDistance + Math.pow(distanceFunction(cluster.mean, vectorFunction(vector)), 2);
		});
	});


	return meansDistance;
}

function updateMeans(clusters, vectorFunction) {

	clusters.forEach(function (cluster) {
		updateMean(cluster, vectorFunction);

	});
}


function updateMean(cluster, vectorFunction) {

	var newMean = [];

	for (var i = 0; i < cluster.mean.length; i++) {
		newMean.push(getMean(cluster.data, i, vectorFunction));
	};


	cluster.mean = newMean;

}

function getMean(data, index, vectorFunction) {
	var sum =  0;
	var total = data.length;

	if(total == 0) return 0;

	data.forEach(function (vector) {

			sum = sum + vectorFunction(vector)[index];
	});


	return sum / total;
}

function assignDataToClusters(data, clusters, distanceFunction, vectorFunction) {


	data.forEach(function (vector) {
	    var cluster = findClosestCluster(vectorFunction(vector), clusters, distanceFunction);

	    if(!cluster.data) cluster.data = [];

		cluster.data.push(vector);
	});
}


function findClosestCluster(vector, clusters, distanceFunction) {

	var closest = {};
	var minDistance = 9999999;

	clusters.forEach(function (cluster) {

		var distance = distanceFunction(cluster.mean, vector);
		if (distance < minDistance) {
			minDistance = distance;
			closest = cluster;
		};
	});

	return closest;
}

function initClustersData(clusters) {
	clusters.forEach(function (cluster) {
		cluster.data = [];
	});
}

function createClusters(means) {
	var clusters = [];

	means.forEach(function (mean) {
		var cluster = { mean : mean, data : []};

		clusters.push(cluster);
	});

	return clusters;
}

function createRandomMeans(numberOfDimensions, numberOfClusters, minMaxValues) {

	var means = [];

	for (var i = 0; i < numberOfClusters; i++) {
		means.push(createRandomPoint(numberOfDimensions, minMaxValues.minValue[i], minMaxValues.maxValue[i]));
	};

	return means;
}

function createRandomPoint(numberOfDimensions, minValue, maxValue) {
	var point = [];

	for (var i = 0; i < numberOfDimensions; i++) {
		point.push(random(minValue, maxValue));
	};

	return point;
}

function random (low, high) {

    return Math.random() * (high - low) + low;
}

function getDistance(vector1, vector2) {
	var sum = 0;

	for (var i = 0; i < vector1.length; i++) {
		sum = sum + Math.pow(vector1[i] - vector2[i],2)
	};

	return Math.sqrt(sum);

}


