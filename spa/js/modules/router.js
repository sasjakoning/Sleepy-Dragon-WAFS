import routes from "./routes.js";

window.addEventListener("load", () => {
    onRouteChanged(window.location.hash);
});

window.addEventListener("hashchange", () => onRouteChanged(window.location.hash));

function onRouteChanged(myHash) {

    const hash = myHash ?? window.location.hash;
    console.log(hash);

    // console.log(allApiStories);
    
    switch(hash) {
        case '': 
            console.log("home");
            routes.home();        
            break;
        case "#home":
            console.log("home");
            routes.home();
            break;
        case "#story":
            console.log("story");
            routes.story();
            break;
        case "#saved":
            console.log("saved");
            routes.saved();
            break;
        case "#settings":
            console.log("settings");
            break;
        case "#credits":
            console.log("credits");
            break;
        default:
            console.log("default");
            break;
    }
}
  


export { onRouteChanged };