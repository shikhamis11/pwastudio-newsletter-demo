/* eslint-disable */
/**
 * Custom interceptors for the project.
 *
 * This project has a section in its package.json:
 *    "pwa-studio": {
 *        "targets": {
 *            "intercept": "./local-intercept.js"
 *        }
 *    }
 *
 * This instructs Buildpack to invoke this file during the intercept phase,
 * as the very last intercept to run.
 *
 * A project can intercept targets from any of its dependencies. In a project
 * with many customizations, this function would tap those targets and add
 * or modify functionality from its dependencies.
 */

function localIntercept() {}
function localIntercept(targets) {
    const { Targetables } = require('@magento/pwa-buildpack');
    const targetables = Targetables.using(targets);

    // Create a TargetableReactComponent linked to the `footer.js` file
    const FooterComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/Footer/footer.js'
    );
    // Add an import statement for Newsletter component
    const NewsLetter = FooterComponent.addImport(
        "NewsLetter from '/src/components/NewsLetter'"
    );
    // Use targetable method to append newsletter component inside div of footer component
    FooterComponent.appendJSX(
        '<div className={classes.links}>',
        `<${NewsLetter}/>`
    );
}
module.exports = localIntercept;
