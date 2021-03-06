const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const random = require('random');

const FILE_PATH = './data.json';

const makeCommit = (n) => {
    if (n ===0 ) { return simpleGit().push()}
    const x = random.int(0,4);
    const y = random.int(0,5);
     const DATE = moment().subtract(1, 'y').subtract(100,'d').subtract(3,'m')
         .add(x, 'w').add(y, 'd')
         .format();
    
   //  const DATE = moment().subtract(2,'days').format();
   // const DATE = moment().format();
    const data = {
        data: DATE + '(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-0a5319e5"], {\n' +
            '  cc80: function (e, t, a) {\n' +
            '    "use strict";\n' +
            '    var s = function () {\n' +
            '      var e = this, t = e.$createElement, a = e._self._c || t;\n' +
            '      return a("div", {staticClass: "mt-1"}, [e.condition ? a("ValidationProvider", {\n' +
            '        attrs: {\n' +
            '          vid: e.validation_label,\n' +
            '          name: e.validation_label,\n' +
            '          rules: e.getRules\n' +
            '        }, scopedSlots: e._u([{\n' +
            '          key: "default", fn: function (t) {\n' +
            '            var s = t.errors;\n' +
            '            return [a("div", {staticClass: "upload-btn-wrapper"}, [a("button", {\n' +
            '              class: {\n' +
            '                btn_success: e.file || !s[0],\n' +
            '                btn_danger: !e.file && !!s[0]\n' +
            '              }\n' +
            '            }, [e._v("Upload a file")]), a("input", {\n' +
            '              attrs: {type: "file", name: "myfile"}, on: {\n' +
            '                change: function (t) {\n' +
            '                  return e.fileUploader(t)\n' +
            '                }\n' +
            '              }\n' +
            '            })]), e.condition && e.file || s[0] ? a("vs-chip", {\n' +
            '              staticClass: "mt-4",\n' +
            '              attrs: {closable: "", transparent: "", color: e.file || !s[0] ? "dark" : "danger"},\n' +
            '              on: {click: e.onClickFileRemove}\n' +
            '            }, [a("a", {\n' +
            '              staticClass: "text-dark",\n' +
            '              staticStyle: {"text-decoration": "none"},\n' +
            '              attrs: {target: "_blank", href: e.file}\n' +
            '            }, [e._v(e._s(e.__nameSplitter(e.file)))])]) : e._e(), a("span", {staticStyle: {display: "none"}}, [e._v(e._s(e.file))])]\n' +
            '          }\n' +
            '        }], null, !1, 415637285)\n' +
            '      }) : e._e()], 1)\n' +
            '    }, l = [], r = (a("96cf"), a("1da1")), n = a("4012"), o = n["a"].get("supplier"), i = {\n' +
            '      name: "FileUploader", props: {file: String, condition: null, required: !0}, data: function () {\n' +
            '        return {validation_label: Math.floor(999999 * Math.random()) + 1 + " "}\n' +
            '      }, computed: {\n' +
            '        getRules: function () {\n' +
            '          return this.file ? "" : "file_required"\n' +
            '        }\n' +
            '      }, methods: {\n' +
            '        onClickFileRemove: function () {\n' +
            '          this.file = "", this.$emit("onClickFileRemove")\n' +
            '        }, fileUploader: function () {\n' +
            '          var e = Object(r["a"])(regeneratorRuntime.mark((function e(t) {\n' +
            '            var a, s, l;\n' +
            '            return regeneratorRuntime.wrap((function (e) {\n' +
            '              while (1) switch (e.prev = e.next) {\n' +
            '                case 0:\n' +
            '                  return this.$vs.loading(), e.prev = 1, e.next = 4, t.target.files[0];\n' +
            '                case 4:\n' +
            '                  return a = e.sent, s = new FormData, s.append("file", a), e.next = 9, o.uploadFile(s);\n' +
            '                case 9:\n' +
            '                  l = e.sent.data.data.file, this.file = l, this.$emit("onSetFileName", l), e.next = 17;\n' +
            '                  break;\n' +
            '                case 14:\n' +
            '                  e.prev = 14, e.t0 = e["catch"](1), this.convertAndNotifyError(e.t0);\n' +
            '                case 17:\n' +
            '                  this.$vs.loading.close();\n' +
            '                case 18:\n' +
            '                case"end":\n' +
            '                  return e.stop()\n' +
            '              }\n' +
            '            }), e, this, [[1, 14]])\n' +
            '          })));',
        count: n
    };
    console.log(`${DATE} - COUNT: ${n}`);

    jsonfile.writeFile(FILE_PATH, data, { flag: 'a' }, () => {
        simpleGit().add([FILE_PATH]).commit('updated',
            makeCommit.bind(this, --n));
    });
};

makeCommit(3);


