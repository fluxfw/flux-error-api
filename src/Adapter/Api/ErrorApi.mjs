import { ErrorService } from "../../Service/Error/Port/ErrorService.mjs";

/** @typedef {import("../../../../flux-css-api/src/Adapter/Api/CssApi.mjs").CssApi} CssApi */

const __dirname = import.meta.url.substring(0, import.meta.url.lastIndexOf("/"));

export class ErrorApi {
    /**
     * @type {CssApi}
     */
    #css_api;
    /**
     * @type {ErrorService | null}
     */
    #error_service = null;

    /**
     * @param {CssApi} css_api
     * @returns {ErrorApi}
     */
    static new(css_api) {
        return new this(
            css_api
        );
    }

    /**
     * @param {CssApi} css_api
     * @private
     */
    constructor(css_api) {
        this.#css_api = css_api;
    }

    /**
     * @returns {Promise<void>}
     */
    async init() {
        this.#error_service ??= this.#getErrorService();

        this.#css_api.importCssToRoot(
            document,
            `${__dirname}/../Error/ErrorVariables.css`
        );
        this.#css_api.importCss(
            `${__dirname.substring(0, __dirname.lastIndexOf("/"))}/Error/ErrorElement.css`
        );
    }

    /**
     * @param {string} title
     * @param {string} description
     * @param {{[key: string]: string}} buttons
     * @returns {Promise<string>}
     */
    async showError(title, description, buttons) {
        return this.#error_service.showError(
            title,
            description,
            buttons
        );
    }

    /**
     * @returns {ErrorService}
     */
    #getErrorService() {
        return ErrorService.new(
            this.#css_api
        );
    }
}
