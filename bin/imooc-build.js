#!/usr/bin/env node

checkDebug();

const { program, args, option } = require("commander");
const pkg = require("../package.json");
const checkNode = require("../lib/checkNode");
const startServer = require("../lib/start/startServer");
const build = require("../lib/build/build");
const { default: separator } = require("inquirer/lib/objects/separator");

const MIN_NODE_VERSION = "8.9.0";

function checkDebug() {
  if (process.argv.indexOf("--debug") >= 0 || process.argv.indexOf("-d") >= 0) {
    process.env.LOG_LEVEL = "verbose";
  } else {
    process.env.LOG_LEVEL = "info";
  }
}
//生成脚手架的帮助文档， imooc-build

(async () => {
  try {
    // 校验npm 版本
    if (!checkNode(MIN_NODE_VERSION)) {
      throw new Error(
        "Please upgrade your node version to v" + MIN_NODE_VERSION
      );
    }

    program.version(pkg.version);

    program
      .command("start")
      .option("-c, --config <config>", "配置文件路径")
      .option("--stop-build", "停止启动服务")
      .option("--custom-webpack-path <customWebpackPath>", "自定义webpack路径")
      .description("start server by imooc-build")
      .allowUnknownOption() //
      .action(startServer);

    program
      .command("build")
      .option("-c, --config <config>", "配置文件路径")
      .option("--custom-webpack-path <customWebpackPath>", "自定义webpack路径")
      .description("build project by imooc-build")
      .allowUnknownOption()
      .action(build);

    // .action((args,option) => {
    // 1: -s<char>
    // 2: -s <char>
    // 3 --separator <char>
    // 4 --separator<char>
    // })

    program.option("-d, --debug", "开启调试模式");

    program.parse(process.argv);
  } catch (e) {
    console.log(e.message);
  }
})();
