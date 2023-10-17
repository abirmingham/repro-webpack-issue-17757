import { printStuff } from './printStuff';

import './styles.css';

printStuff();

new Worker(
    new URL(
        'a.worker',
        import.meta.url,
    ),
);

new Worker(
    new URL(
        'b.worker',
        import.meta.url,
    ),
);

new Worker(
    new URL(
        'c.worker',
        import.meta.url,
    ),
);
import(/* webpackChunkName: "monaco" */ 'monaco-editor').then(
    mod => console.log(mod.editor),
);
