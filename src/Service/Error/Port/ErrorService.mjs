/** @typedef {import("../../../../../flux-css-api/src/Adapter/Api/CssApi.mjs").CssApi} CssApi */

export class ErrorService {
    /**
     * @type {CssApi}
     */
    #css_api;

    /**
     * @param {CssApi} css_api
     * @returns {ErrorService}
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
     * @param {string} title
     * @param {string} description
     * @param {{[key: string]: string}} buttons
     * @returns {Promise<string>}
     */
    async showError(title, description, buttons) {
        return (await import("../Command/ShowErrorCommand.mjs")).ShowErrorCommand.new(
            this.#css_api
        )
            .showError(
                title,
                description,
                buttons
            );
    }
}
