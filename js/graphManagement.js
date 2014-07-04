s = new sigma({
    renderer: {
      container: document.getElementById('container'),
      type: 'canvas'
    }
  });
  c = s.camera;

  // Initialize graph:
  s.graph.read({
    nodes: [
      {
        id: 'n0',
        size: 1,
        x: 0,
        y: -80,
      },
      {
        id: 'n1',
        size: 1,
        x: 10,
        y: -100,
      },
      {
        id: 'n2',
        size: 1,
        x: 20,
        y: -80,
      }
    ],
    edges: [
      {
        id: 'e0',
        source: 'n0',
        target: 'n1',
      },
      {
        id: 'e1',
        source: 'n1',
        target: 'n2',
      },
      {
        id: 'e2',
        source: 'n2',
        target: 'n0',
      }
    ]
  });

  s.refresh();