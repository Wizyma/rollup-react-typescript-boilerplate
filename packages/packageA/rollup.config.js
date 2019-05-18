import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import nodeGlobals from "rollup-plugin-node-globals";
import filesize from "rollup-plugin-filesize";
import includePaths from "rollup-plugin-includepaths";
import analyze from "rollup-plugin-analyzer";
import typescript from "rollup-plugin-typescript2";
import { DEFAULT_EXTENSIONS } from "@babel/core";

const globals = {
  react: "React",
  "prop-types": "PropTypes"
};

const pkgJson = require("./package.json");
const external = Object.keys(pkgJson.peerDependencies);

const babelOptions = {
  exclude: "node_modules/**",
  presets: ["@babel/preset-typescript", "@babel/preset-react", "@babel/preset-env"],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false
      }
    ],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread"
  ],
  runtimeHelpers: true,
  extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
  babelrc: false
};

const commonjsOptions = {
  include: /node_modules/,
  namedExports: {
    "./node_modules/prop-types/index.js": [
      "elementType",
      "bool",
      "func",
      "object",
      "oneOfType",
      "element",
      "arrayOf",
      "shape",
      "oneOf",
      "number"
    ],
    "./node_modules/react-is/index.js": [
      "ForwardRef",
      "isLazy",
      "isMemo",
      "isValidElementType",
      "Component",
      "createElement"
    ]
  }
};

function onwarn(warning) {
  throw Error(warning.message);
}

export default {
  input: "src/index.ts",
  onwarn,
  output: [
    {
      file: "./build/index.js",
      format: "cjs",
      interop: false,
      name: pkgJson.name,
      banner: `/* ${pkgJson.name} v${pkgJson.version} */`,
      globals
    },
    {
      file: "./build/index.es.js",
      format: "es",
      interop: false,
      banner: `/* ${pkgJson.name} v${pkgJson.version} */`,
      name: pkgJson.name,
      globals
    }
  ],
  external,
  plugins: [
    peerDepsExternal({
      includeDependencies: true
    }),
    nodeResolve({
      extensions: [".js", ".ts", ".tsx"],
      dedupe: ["react"],
      jail: "src/",
      customResolveOptions: {
        moduleDirectory: "node_modules"
      }
    }),
    babel(babelOptions),
    commonjs(commonjsOptions),
    nodeGlobals(),
    analyze({
      stdout: true,
    }),
    filesize(),
    includePaths({
      paths: ["./src"]
    }),
    typescript({
      tsconfig: "./tsconfig.json",
      typescript: require("typescript"),
      cacheRoot: "../../temp",
      rollupCommonJSResolveHack: true,
      exclude: "**/__tests__/**",
      clean: true
    })
  ]
};
