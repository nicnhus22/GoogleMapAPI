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
  s.graph.nodes().forEach(function(node){
    if(node.marker == marker){
      var idx = s.graph.nodes().indexOf(node);
      if(idx >= 0){
        s.graph.nodes().splice(idx,1);
        s.refresh();
      }
    }
  });
}

function moveNode(marker, x ,y){
  s.graph.nodes().forEach(function(node){
    if(node.marker == marker){

      var x = marker.position.lng();
      var y = marker.position.lat();
      x += 180;
      y = ((-1)*y)+90; 

      node.x = x;
      node.y = y;

      s.refresh();
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