var numOfNodes = 0;
var nodes = [];

// Create sigma container
s = new sigma({
  renderer: {
    container: document.getElementById('graph_container'),
    type: 'canvas'
  }
});

// Initialize empty graph
s.graph.read({
  nodes: [    ],
  edges: [    ]
});

/*
 *  This clears the old graph and recreates one with the 
 *  updated nodes[] array.
 */
function _recreateGraph(){
  // Clear old graph
  s.graph.clear();
  // Build new graph with updates nodes[]
  nodes.forEach(function(node){
    s.graph.addNode(node);
  });
  // Refresh graph to view changes
  s.refresh();
}

/*
 *  This is called whenever a marker is set on the map
 *  and adds a node on the graph
 */
function _addNode(name,marker, x, y){
  // Create node with good coordinates
  var node = {
    id: 'n'+(++numOfNodes),
    label: name,
    size: 1,
    x: x+180,
    y: ((-1)*y)+90
  };

  // Link the marker to the node
  node.marker = marker;

  // Add node to the graph
  s.graph.addNode(node);

  // Add node to the array
  nodes.push(node);

  // Refresh graph to view changes
  s.refresh();
}

/*
 *  This is called whenever a marker is removed. It removes
 *  the node from the nodes[] array and rebuilds the graph.
 */
function _removeNode(marker){
  nodes.forEach(function(node){
    if(node.marker == marker){
      var i = nodes.indexOf(node);
      nodes.splice(i,1);
      // This will rebuild the graph without the newly deleted node
      _recreateGraph();
    }
  });
}

function _moveNode(marker, x ,y){
  s.graph.nodes().forEach(function(node){
    if(node.marker == marker){
      // Build coordinates
      var x = marker.position.lng();
      var y = marker.position.lat();
      x += 180;
      y = ((-1)*y)+90; 
      // Change node coordinates with new ones
      node.x = x;
      node.y = y;
      // Refresh graph to view changes
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