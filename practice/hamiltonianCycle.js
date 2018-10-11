/*
Hamiltonian path (or traceable path) is a path in an undirected or directed
graph that visits each vertex exactly once. A Hamiltonian cycle (or
Hamiltonian circuit) is a Hamiltonian path that is a cycle. Determining whether
such paths and cycles exist in graphs is the Hamiltonian path problem.

******************************
*** BackTracking-Algorithm ***
******************************
Create an empty path array and add vertex 0 to it.
Add other vertices, starting from the vertex 1.
Before adding a vertex,
  check for whether it is adjacent to the previously added vertex and not already added.
If we find such a vertex, we add the vertex as part of the solution.
If we do not find a vertex then we return false.
*/
