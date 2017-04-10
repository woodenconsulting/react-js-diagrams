/**
 * @fileoverview Rule to flag use of console.log object
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
  return {
    "MemberExpression": function(node) {
      if (node.object.name === "console" && node.property.name === 'log') {
        context.report(node, 'Unexpected console.log statement.');
      }
    }
  };
};

module.exports.schema = [];
