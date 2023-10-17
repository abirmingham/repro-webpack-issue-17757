import { printStuff } from './printStuff';

const workerScope = self;

// Handle browser messages
workerScope.addEventListener('message', (_e) => {
    printStuff();
    workerScope.postMessage({type: 'complete'});
});
