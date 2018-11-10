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

function initCallback() {
  
}
