// Keep track of nodes and edges on the graph
var numOfNodes = 0;
var numOfEdges = 0;

var nodes = [];
var edges = [];

// Create sigma container
s = new sigma({
  renderer: {
    container: document.getElementById('graph_container'),
    type: 'canvas'
  }
});

s.drawingProperties({
  defaultEdgeType: 'curve'
})

// Bind the events:
s.bind('overNode', function(e) {

  console.log(e.data.node);

}).bind('outNode',function(e){
  console.log(e.type, e.data.node.label);
}).bind('clickNode',function(e){
  console.log(e.type, e.data.node.label);
}).bind('doubleClickNode',function(e){
  console.log(e.type, e.data.node.label);
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

  // Build new graph with updated edges
  edges.forEach(function(edge){
    if(edge.source && edge.target)
      s.graph.addEdge(edge);
  });

  // Refresh graph to view changes
  s.refresh();
}

function _addEdge(source, target){

  var edge = {
    id: 'e'+(++numOfEdges),
    source: source.id,
    target: target.id,
    type: ['curve', 'arrow', 'curvedArrow'][Math.random() * 3 | 0]
  };
  s.graph.addEdge(edge);

  // Add edge to the list
  edges.push(edge)

  // Refresh graph to view changes
  s.refresh();
}

/*
 *  This is called whenever a marker is set on the map
 *  and adds a node on the graph
 */
function _addNode(country, marker, x, y){
  // Create node with good coordinates
  var node = {
    id: 'n'+(++numOfNodes),
    label: country.name,
    size: country.population,
    x: x+180,
    y: ((-1)*y)+90
  };

  // Link the marker to the node
  node.marker = marker;

  // Add node to the graph
  s.graph.addNode(node);

  // Add node to the array
  nodes.push(node);

  // Add edge between last created node and new one
  if(nodes.length > 1){
    _addEdge(nodes[numOfNodes-2], nodes[numOfNodes-1]);
  }

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

function _moveNode(updatedCountry, marker, x ,y){
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
      node.label = updatedCountry.name;
      node.size  = updatedCountry.population;
      // Refresh graph to view changes
      s.refresh();
    }
  });
}

function _moveNodeWithoutUpdating(marker, x ,y){
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

// Refresh map on start
s.refresh();