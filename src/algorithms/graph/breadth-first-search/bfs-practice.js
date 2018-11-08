import Queue from '../../../data-structures/queue/Queue';

function BFS_CORE(graph, startingVertex) { //eslint-disable-line
  const vertexQueue = new Queue();

  while (!vertexQueue.isEmpty()) {
    const currentVertex = vertexQueue.dequeue();

    graph.getNeighbors(currentVertex).forEach((nextVertex) => {
      vertexQueue.enqueue(nextVertex);
    });
  }
}

function BFS_ADVANCED(graph, startingVertex, cbs) { //eslint-disable-line
  const callbacks = initCallbacks(cbs); // eslint-disable-line
  const vertexQueue = new Queue();
  let previousVertex = null;

  while (!vertexQueue.isEmpty()) {
    const currentVertex = vertexQueue.dequeue();
    callbacks.enterVertex({ currentVertex, previousVertex });

    graph.getNeighbors(startingVertex).forEach((nextVertex) => {
      if (callbacks.allowTraversal({ previousVertex, currentVertex, nextVertex })) {
        vertexQueue.enqueue(nextVertex);
      }
    });
    callbacks.leavingVertex({ currentVertex });
    previousVertex = currentVertex;
  }
}

function initCallbacks(cbs = {}) {
  const initiatedCallback = cbs;

  const stubCallback = () => {};

  const allowTraversal = (() => {
    const seen = {};
    return ({ nextVertex }) => {
      if (!seen[nextVertex.getKey()]) {
        seen[nextVertex.getKey()] = true;
        return true;
      }
      return false;
    };
  })();

  initiatedCallback.allowTraversal = cbs.allowTraversal || allowTraversal;
  initiatedCallback.enterVertex = cbs.enterVertex || stubCallback;
  initiatedCallback.leaveVertex = cbs.leaveVertex || stubCallback;
}
