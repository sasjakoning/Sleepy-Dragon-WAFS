import routes from "./routes.js";

window.addEventListener("hashchange", onRouteChanged);

function onRouteChanged() {
    console.log(window.location.hash);

    const hash = window.location.hash;
    
    switch(hash) {
        case "#home":
            console.log("home");
            routes.home();
            break;
        case "#story":
            console.log("story");
            routes.story();
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