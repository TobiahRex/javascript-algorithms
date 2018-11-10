import Queue from '../../../data-structures/queue/Queue';

const bfs = (graph, startingVertex) => {
  const vertexQueue = new Queue(startingVertex);

  while (!vertexQueue.isEmpty()) {
    const currentVertex = vertexQueue.dequeue();

    graph.getNeighbors(currentVertex).forEach((vertex) => {
      vertexQueue.enqueue(vertex);
    });
  }
};

const bfs_advanced = (graph, startingVertex, customCallbacks) => {
  const cbs = initCallbacks(customCallbacks);
  const vertexQueue = new Queue(startingVertex);
  let previousVertex = null;

  while (!vertexQueue.isEmpty()) {
    const currentVertex = vertexQueue.dequeue();
    cb.enteringNode({ currentVertex, previousVertex });
    if (cb.allowTraversal(currentVertex)) {
      graph.getNeighbors(currentVertex).forEach((vertex) => {
        vertexQueue.enqueue(vertex);
      });
    }
    cb.leavingNode({ currentVertex });
    previousVertex = currentVertex;
  }
};

function initCallback(cbs = {}) {
  const initiatedCallbacks = cbs;
  const stubCallback = () => {};

  const allowTraversal = (() => {
    const seen = {};
    return ((vertex) => {
      if (!(vertex.getKey() in seen)) {
        seen[vertex.getKey()] = true;
        return true;
      }
      return false;
    });
  })();

  initiatedCallbacks.allowTraversal = cbs.allowTraversal || allowTraversal;
  initiatedCallbacks.enterVertex = cbs.enterVertex || stubCallback;
  initiatedCallbacks.leavingVertex = cbs.leavingVertex || stubCallback;
}
