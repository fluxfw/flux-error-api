/** @typedef {import("../../../../../flux-css-api/src/Adapter/Api/CssApi.mjs").CssApi} CssApi */

export class ShowErrorCommand {
    /**
     * @type {CssApi}
     */
    #css_api;

    /**
     * @param {CssApi} css_api
     * @returns {ShowErrorCommand}
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
        const { ErrorElement } = await import("../../../Adapter/Error/ErrorElement.mjs");

        return new Promise(resolve => {
            const error_element = ErrorElement.new(
                this.#css_api,
                title,
                description,
                buttons,
                id => {
                    error_element.remove();

                    resolve(id);
                }
            );

            document.body.prepend(error_element);
        });
    }
}
