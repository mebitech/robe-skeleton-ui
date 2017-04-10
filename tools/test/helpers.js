const path = require("path");
const Module = require("module");
const moduleJson = require("./paths.json");
const rootPath = (!moduleJson.rootDir || moduleJson.rootDir == ".") ? process.cwd() : path.resolve(process.cwd(), moduleJson.rootDir);
var originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain) {
    try {
        return originalResolveFilename(request, parent, isMain);
    } catch (e) {
        if (!moduleJson.modules || moduleJson.modules.length === 0 || !request) throw e;
        var parentDir = path.dirname(parent.filename);
        if (!parentDir || parentDir.length <= rootPath.length);
        var dirs = [];
        var importPath = request;
        var isUp = importPath.startsWith("../");
        var isSibling = importPath.startsWith("./");
        if (isSibling || isUp) {
            while (parentDir.length > rootPath.length) {
                dirs.push(path.basename(parentDir));
                parentDir = path.dirname(parentDir);
            }
            dirs.pop();
            if (isUp) {
                do {
                    dirs.pop();
                    importPath = importPath.substring(3);
                } while (importPath.startsWith("../"));
            }
        } else {

        }

        for (var i = 0; i < moduleJson.modules.length; i++) {
            var pathArrays = [rootPath, moduleJson.modules[i]];
            pathArrays = pathArrays.concat(dirs);
            pathArrays.push(importPath);
            var moduleImport = path.resolve.apply(path, pathArrays);
            try {
                var result = originalResolveFilename(moduleImport, parent, isMain);
                if (result) {
                    return result;
                }
            } catch (e) {

            }
        }
        throw e;
    }
};


import {expect} from "chai";
import {sinon, spy} from "sinon";
import {mount, render, shallow} from "enzyme";

global.expect = expect;
global.sinon = sinon;
global.spy = spy;

global.mount = mount;
global.render = render;
global.shallow = shallow;

var
    istanbul = require("istanbul"),
    collector = new istanbul.Collector(),
    reporter = new istanbul.Reporter();

// hook into mocha global after to write coverage reports if found
after(function () {
    if (global.__coverage__) {
        // before exiting, print coverage report
        collector.add(global.__coverage__)
        reporter.addAll(["text", "html", "lcov"])
        reporter.write(collector, true, () => {
            console.log("Coverage report saved to coverage/index.html")
        })
    }
});
