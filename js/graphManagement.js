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

// s.graph.addNode({
//   id: 'n3',
//   size: 1,
//   x: 40,
//   y: -10
// });

// s.graph.addEdge({
//   id: 'e3',
//   source: 'n3',
//   target: 'n0'
// });

// Refresh map on start
s.refresh();