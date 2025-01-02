"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_src_views_pages_user_faq_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/views/pages/user/faq.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/views/pages/user/faq.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/components/jumbotron/jumbotron.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  comopnents: {
    BJumbotron: bootstrap_vue__WEBPACK_IMPORTED_MODULE_0__.BJumbotron
  },
  data: function data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
        loading: true
      }
    };
  },
  methods: {
    submitForm: function submitForm() {
      // Handle form submission
      console.log("Form submitted:", this.form);
      // Reset form
      this.form.name = "";
      this.form.email = "";
      this.form.message = "";
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/views/pages/user/faq.vue?vue&type=template&id=056a2fc7&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/views/pages/user/faq.vue?vue&type=template&id=056a2fc7&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "h-full"
  }, [_c("section", {
    staticClass: "faq-section"
  }, [_c("b-jumbotron", {
    staticClass: "d-flex rounded-0",
    attrs: {
      "bg-variant": "info",
      "text-variant": "white"
    }
  }, [_c("h1", {
    staticClass: "text-center my-auto mx-auto"
  }, [_vm._v("Contact")])])], 1), _vm._v(" "), _c("section", {
    staticClass: "p-4"
  }, [_c("b-row", [_c("b-col", {
    attrs: {
      cols: "6"
    }
  }, [_c("div", {
    staticClass: "accordion",
    attrs: {
      role: "tablist"
    }
  }, [_c("b-card", {
    staticClass: "mb-1",
    attrs: {
      "no-body": ""
    }
  }, [_c("b-card-header", {
    staticClass: "p-1 d-flex align-items-center justify-content-center",
    attrs: {
      "header-tag": "header",
      role: "tab"
    }
  }, [_c("h3", [_vm._v("Frequently Asked Questions #1")]), _vm._v(" "), _c("b-link", {
    directives: [{
      name: "b-toggle",
      rawName: "v-b-toggle.accordion-1",
      modifiers: {
        "accordion-1": true
      }
    }],
    staticClass: "ml-auto"
  }, [_c("feather-icon", {
    staticClass: "when-open",
    attrs: {
      size: "25",
      icon: "ChevronRightIcon"
    }
  }), _vm._v(" "), _c("feather-icon", {
    staticClass: "when-closed",
    attrs: {
      size: "25",
      icon: "ChevronDownIcon"
    }
  })], 1)], 1), _vm._v(" "), _c("b-collapse", {
    attrs: {
      id: "accordion-1",
      visible: "",
      accordion: "my-accordion",
      role: "tabpanel"
    }
  }, [_c("b-card-body", [_c("b-card-text", [_vm._v("\n                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa,\n                  obcaecati sit officiis consectetur soluta molestiae tenetur ad\n                  voluptatem fugiat non aliquam mollitia architecto maxime voluptates\n                  magnam at dolore magni optio.\n                ")])], 1)], 1)], 1)], 1)])], 1)], 1)]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/src/views/pages/user/faq.vue":
/*!***************************************************!*\
  !*** ./resources/js/src/views/pages/user/faq.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _faq_vue_vue_type_template_id_056a2fc7_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./faq.vue?vue&type=template&id=056a2fc7&scoped=true */ "./resources/js/src/views/pages/user/faq.vue?vue&type=template&id=056a2fc7&scoped=true");
/* harmony import */ var _faq_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./faq.vue?vue&type=script&lang=js */ "./resources/js/src/views/pages/user/faq.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _faq_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _faq_vue_vue_type_template_id_056a2fc7_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _faq_vue_vue_type_template_id_056a2fc7_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "056a2fc7",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/pages/user/faq.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/pages/user/faq.vue?vue&type=script&lang=js":
/*!***************************************************************************!*\
  !*** ./resources/js/src/views/pages/user/faq.vue?vue&type=script&lang=js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_faq_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./faq.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/views/pages/user/faq.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_faq_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/pages/user/faq.vue?vue&type=template&id=056a2fc7&scoped=true":
/*!*********************************************************************************************!*\
  !*** ./resources/js/src/views/pages/user/faq.vue?vue&type=template&id=056a2fc7&scoped=true ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_faq_vue_vue_type_template_id_056a2fc7_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_faq_vue_vue_type_template_id_056a2fc7_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_faq_vue_vue_type_template_id_056a2fc7_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./faq.vue?vue&type=template&id=056a2fc7&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/views/pages/user/faq.vue?vue&type=template&id=056a2fc7&scoped=true");


/***/ })

}]);