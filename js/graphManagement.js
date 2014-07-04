var numOfNodes = 0;

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

function addNode(x, y){
  s.graph.addNode({
    id: 'n'+(--numOfNodes),
    size: 1,
    x: x+180,
    y: ((-1)*y)+90
  });

  s.refresh();
}


// s.graph.addEdge({
//   id: 'e3',
//   source: 'n3',
//   target: 'n0'
// });

// Refresh map on start
s.refresh();