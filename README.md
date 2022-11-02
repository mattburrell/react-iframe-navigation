# react-iframe-navigation

A React app showing how to run another React app inside an iframe - whilst keeping the url state and navigation (back & forward buttons) in sync.

Uses iframe messages to push the child app's state to the url of the outer app and to notify the child app when the back/forward buttons have been clicked so the child app can reinstate the previous/next state.

## Dependencies

Both React apps were bootstrapped using [Vite](https://vitejs.dev/) and use React Router v6.

## Installation

```sh
npm run install
npm run dev
```