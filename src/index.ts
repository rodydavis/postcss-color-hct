import * as postcss from "postcss";
import * as reduceFunctionCall from "reduce-function-call";
import { getColor } from "./utils";

function justFloat(n) {
  return parseFloat(n);
}

function colorValuesDefined(hct) {
  return !hct.some(isNaN);
}

function transformDecl(decl) {
  const value = decl.value;

  function reduceHcl(body) {
    const hctaValues = body.split(",").map(justFloat);

    if (!colorValuesDefined(hctaValues)) {
      throw decl.error('Unable to parse color: "' + value + '"');
    }

    try {
      return getColor(hctaValues);
    } catch (e) {
      throw decl.error(e);
    }
  }

  decl.value = reduceFunctionCall(value, "hct", reduceHcl);
}

function colorHcl(css) {
  css.walkDecls(transformDecl);
}

// Hack needed to get the plugin to work with postcss
declare var module: any;
module.exports = postcss.plugin("postcss-color-hct", function colorHclPlugin() {
  return colorHcl;
});
