/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require('react');
const safePrefix = require('./src/utils/safePrefix').default;

exports.onRenderBody = function({ setHeadComponents, setPostBodyComponents }) {
  setHeadComponents([
    // EN GREVE
    <script
      dangerouslySetInnerHTML={{
        __html: `
            var DIGITAL_STRIKE_OPTIONS = {
                showCloseButtonOnFullPageWidget: true,
                alwaysShowWidget: true
            };
        `
      }}
    />,
    <script src="https://noelmace.github.io/widget-engreve/widget.js" async />
  ]);

  setPostBodyComponents([
    <React.Fragment>
      <script src={safePrefix('assets/js/plugins.js')} />
      <script src={safePrefix('assets/js/main.js')} />
    </React.Fragment>
  ]);
};
