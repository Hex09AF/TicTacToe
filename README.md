# Tic tac toe aka Caro
- Implement bot using minimax algorithm

# State
- State is the heart of each application and there is no quicker way to create buggy, unmanageable applications than by producing an inconsistent state or state that is out-of-sync with local variables that linger around

- Many state management solutions try to restrict the ways in which you can modify state (making state immutable). But data needs to be normalized, referential integrity can no longer be guaranteed and it becomes next to impossible to use powerful concepts like classes in case you fancy those.

# Mobx
MobX is a simple, scalable and battle tested state management solution.

Important concepts of MobX:
- MobX is a standalone library, but most people are using it with React.

- The strategy to achieve that is simple: Make sure that everything that can be derived from the application state, will be derived. Automatically.

- Application state

- Derivations
Using the observable and computed annotations we can introduce observable properties on an object

- Reactions
Become observable so that MobX can track all the changes that are being made


- Actions