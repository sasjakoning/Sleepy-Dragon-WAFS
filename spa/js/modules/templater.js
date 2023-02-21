// Function to define a custom element based on a template file
async function defineTemplate(templatePath) {
    // Fetch the template file
    const response = await fetch(templatePath);
    const html = await response.text();
  
    const template = document.createElement("template");
    template.innerHTML = html;
  
    // Define a custom element using the template file
    class CustomElement extends HTMLElement {
      constructor() {
        super();
        //   Shadow DOM is a way to encapsulate styles and markup in a custom element.
        // It ignores styles outside of the element and styles inside the element don't affect the rest of the page.
        // Very cool.
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      }
    }
  
    // Get the tag name from the "data-tag-name" attribute in the template file
    const tagName = template.content
      .querySelector("[data-tag-name]")
      .getAttribute("data-tag-name");
  
    // Define the custom element using the tag name and the custom element class
    customElements.define(tagName, CustomElement);
}


// Function to load all the templates
async function loadTemplates(templates) {
    for (let i = 0; i < templates.length; i++) {
      await defineTemplate(templates[i]);
    }
}

export { defineTemplate, loadTemplates };