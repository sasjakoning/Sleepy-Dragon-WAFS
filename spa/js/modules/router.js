import routes from './routes.js';

function onRouteChanged(myHash) {

    const hash = myHash ?? window.location.hash;

    switch (hash) {
        case '':
            console.log('home');
            routes.home();
            break;
        case '#home':
            console.log('home');
            routes.home();
            break;
        case '#story':
            console.log('story');
            routes.story();
            break;
        case '#saved':
            console.log('saved');
            routes.saved();
            break;
        case '#settings':
            console.log('settings');
            routes.error()
            break;
        case '#credits':
            console.log('credits');
            routes.error()
            break;
        default:
            if (hash.includes('#id=')) {
                const id = hash.substring(4);
                routes.story(id)
            } else {
                routes.error()
            }
            break;
    }
}



export default {
    onRouteChanged,
};