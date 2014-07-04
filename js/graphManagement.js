var numOfNodes = 0;
var nodes = [];

// Create sigma container
s = new sigma({
  renderer: {
    container: document.getElementById('container'),
    type: 'canvas'
  }
});

// Initialize empty graph
s.graph.read({
  nodes: [    ],
  edges: [    ]
});

function addNode(marker, x, y){
  var node = {
    id: 'n'+(++numOfNodes),
    size: 1,
    x: x+180,
    y: ((-1)*y)+90
  };
  node.marker = marker;
  s.graph.addNode(node);
  nodes.push(node);

  s.refresh();
}

function removeNode(marker){
  nodes.forEach(function(node){
    if(node.marker == marker){
      // Need to handle event
    }
  });
}

function moveNode(marker, x ,y){
  nodes.forEach(function(node){
    if(node.marker == marker){
      var x = marker.position.lng();
      var y = marker.position.lat();
      x += 180;
      y = ((-1)*y)+90; 
      console.log(x+"   "+y);
      node.x = x;
      node.y = y;
    }
  });
}


// s.graph.addEdge({
//   id: 'e3',
//   source: 'n3',
//   target: 'n0'
// });

// Refresh map on start
s.refresh();