"use strict";

const postcss = require("postcss");
// const hct = require('./../index');
const hct = require("./../dist/postcss-color-hct.cjs");
const test = require("tape");

function useHct() {
  return postcss().use(hct());
}

test("filterDeclarations()", function (t) {
  t.plan(9);

  t.equal(
    useHct().process("a { color: hct(0, 0, 50); }").css,
    "a { color: rgb(119, 119, 119); }",
    "should convert hct(H, C, L) to rgb(R, G, B)."
  );

  t.equal(
    useHct().process("a { color: hct(0, 0%, 50%); }").css,
    "a { color: rgb(119, 119, 119); }",
    "should convert hct(H, C%, L%) to rgb(R, G, B)."
  );

  t.equal(
    useHct().process("a { color: hct(21, 70, 50, 0.5); }").css,
    "a { color: rgba(211, 69, 71, 0.5); }",
    "should convert hct(H, C, L, α) to rgba(R, G, B, α)."
  );

  t.equal(
    useHct().process("a { color: rgb(255, 0, 0); }").css,
    "a { color: rgb(255, 0, 0); }",
    "should not modify original CSS when hct() is not used."
  );

  t.equal(
    useHct().process("a { color: hct(180, 80, 80); }").css,
    "a { color: rgb(0, 223, 190); }",
    "should return limited values when color is out of range."
  );

  t.throws(
    function () {
      useHct().process("a { color: hct(); }").css;
    },
    /Unable to parse color: "hct\(\)"/,
    "should throw an error when hct() doesn't take any arguments."
  );

  t.throws(
    function () {
      useHct().process("a { color: hct(,foo); }").css;
    },
    /Unable to parse color: "hct\(,foo\)"/,
    "should throw an error when hct() takes invalid arguments."
  );

  t.throws(
    function () {
      useHct().process("a {color: hct(red); }", { from: "fixture.css" }).css;
    },
    /fixture\.css:1:4: Unable to parse color: "hct\(red\)"/,
    "should throw a detailed error when a source file is specified."
  );

  t.throws(
    function () {
      useHct().process("a {color: hct(,)}", { map: true }).css;
    },
    /<css input>:1:4: Unable to parse color: "hct\(,\)"/,
    "should throw a detailed error when source map is enabled but file isn't specified."
  );
});
