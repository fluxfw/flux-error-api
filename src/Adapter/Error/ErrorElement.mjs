/** @typedef {import("./close.mjs").close} _close */
/** @typedef {import("../../../../flux-css-api/src/Adapter/Api/CssApi.mjs").CssApi} CssApi */

const __dirname = import.meta.url.substring(0, import.meta.url.lastIndexOf("/"));

export class ErrorElement extends HTMLElement {
    /**
     * @type {{[key: string]: string}}
     */
    #buttons;
    /**
     * @type {string}
     */
    #description;
    /**
     * @type {_close}
     */
    #close;
    /**
     * @type {CssApi}
     */
    #css_api;
    /**
     * @type {string}
     */
    #title;
    /**
     * @type {ShadowRoot}
     */
    #shadow;

    /**
     * @param {CssApi} css_api
     * @param {string} title
     * @param {string} description
     * @param {{[key: string]: string}} buttons
     * @param {_close} close
     * @returns {ErrorElement}
     */
    static new(css_api, title, description, buttons, close) {
        return new this(
            css_api,
            title,
            description,
            buttons,
            close
        );
    }

    /**
     * @param {CssApi} css_api
     * @param {string} title
     * @param {string} description
     * @param {{[key: string]: string}} buttons
     * @param {_close} close
     * @private
     */
    constructor(css_api, title, description, buttons, close) {
        super();

        this.#css_api = css_api;
        this.#title = title;
        this.#description = description;
        this.#buttons = buttons;
        this.#close = close;

        this.#shadow = this.attachShadow({ mode: "closed" });
        this.#css_api.importCssToRoot(
            this.#shadow,
            `${__dirname}/${this.constructor.name}.css`
        );

        this.#render();
    }

    /**
     * @param {string} id
     * @returns {void}
     */
    #click(id) {
        for (const button_element of this.#shadow.querySelectorAll("button")) {
            if (button_element.disabled) {
                return;
            }

            button_element.disabled = true;
        }

        this.#close(
            id
        );
    }

    /**
     * @returns {void}
     */
    #render() {
        const title_element = document.createElement("div");
        title_element.classList.add("title");
        title_element.innerText = this.#title;
        this.#shadow.appendChild(title_element);

        const description_element = document.createElement("div");
        description_element.classList.add("description");
        description_element.innerText = this.#description;
        this.#shadow.appendChild(description_element);

        for (const [
            id,
            label
        ] of Object.entries(this.#buttons)) {
            const button_element = document.createElement("button");
            button_element.innerText = label;
            button_element.addEventListener("click", () => {
                this.#click(
                    id
                );
            });
            this.#shadow.appendChild(button_element);
        }
    }
}

export const ERROR_ELEMENT_TAG_NAME = "flux-error";

customElements.define(ERROR_ELEMENT_TAG_NAME, ErrorElement);
