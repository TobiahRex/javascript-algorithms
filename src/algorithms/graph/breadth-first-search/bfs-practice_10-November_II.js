import Queue from '../../../data-structures/queue/Queue';

const bfsCore = (graph, startingVertex) => {
  const vertexQueue = new Queue(startingVertex);

  while (!vertexQueue.isEmpty()) {
    const currentVertex = vertexQueue.dequeue();
    graph.getNeighbors(currentVertex).forEach((vertex) => {
      vertexQueue.enqueue(vertex);
    });
  }
};

const bfsAdvanced = (graph, startingVertex, cbs) => {
  const callbacks = initCallbacks(cbs);
  const vertexQueue = new Queue(startingVertex);
  const previousVertex = null;

  while (!vertexQueue.isEmpty()) {
    const currentVertex = vertexQueue.dequeue();
    if (callbacks.allowTraversal(currentVertex)) {
      callbacks.enterVertex({ currentVertex });
      graph.getNeighbors(currentVertex).forEach((vertex) => {
        vertexQueue.enqueue(vertex);
      });
    }
    callbacks.leavingVertex({ currentVertex, previousVertex });
  }
};
