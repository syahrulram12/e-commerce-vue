"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_src_views_pages_user_product_detail_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/views/pages/user/product/detail.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/views/pages/user/product/detail.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_api_product__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/api/product */ "./resources/js/src/services/api/product.js");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/components/card/card.js");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/components/layout/row.js");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/components/card/card-body.js");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/components/breadcrumb/breadcrumb.js");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/components/form-select/form-select.js");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/components/form-group/form-group.js");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/components/form-input/form-input.js");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/components/input-group/input-group.js");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/components/input-group/input-group-append.js");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/components/input-group/input-group-prepend.js");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/components/breadcrumb/breadcrumb-item.js");
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/components/layout/col.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    BCard: bootstrap_vue__WEBPACK_IMPORTED_MODULE_1__.BCard,
    BRow: bootstrap_vue__WEBPACK_IMPORTED_MODULE_2__.BRow,
    BCardBody: bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__.BCardBody,
    BBreadcrumb: bootstrap_vue__WEBPACK_IMPORTED_MODULE_4__.BBreadcrumb,
    BFormSelect: bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__.BFormSelect,
    BFormGroup: bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__.BFormGroup,
    BFormInput: bootstrap_vue__WEBPACK_IMPORTED_MODULE_7__.BFormInput,
    BInputGroup: bootstrap_vue__WEBPACK_IMPORTED_MODULE_8__.BInputGroup,
    BInputGroupAppend: bootstrap_vue__WEBPACK_IMPORTED_MODULE_9__.BInputGroupAppend,
    BInputGroupPrepend: bootstrap_vue__WEBPACK_IMPORTED_MODULE_10__.BInputGroupPrepend,
    BBreadcrumbItem: bootstrap_vue__WEBPACK_IMPORTED_MODULE_11__.BBreadcrumbItem,
    BCol: bootstrap_vue__WEBPACK_IMPORTED_MODULE_12__.BCol
  },
  data: function data() {
    var _this = this;
    var slug = this.$route.params.slug || 0;
    // if (id === 0) this.$router.back()
    (0,_services_api_product__WEBPACK_IMPORTED_MODULE_0__.getDetail)(slug).then(function (response) {
      _this.loading = false;
      _this.product = response.data;
    })["catch"](function (error) {
      console.log(error);
    });
    return {
      product: {},
      formData: {
        variant: "",
        size: "",
        quantity: 1
      },
      loading: true,
      variants: [{
        text: "Black",
        value: "black"
      }, {
        text: "White",
        value: "white"
      }, {
        text: "Red",
        value: "red"
      }, {
        text: "Green",
        value: "green"
      }],
      sizes: {
        XS: "Extra Small",
        S: "Small",
        M: "Medium",
        L: "Large",
        XL: "Extra Large"
      }
    };
  },
  created: function created() {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/views/pages/user/product/detail.vue?vue&type=template&id=0b64bcd0&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/views/pages/user/product/detail.vue?vue&type=template&id=0b64bcd0&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [!_vm.loading ? _c("section", {
    staticClass: "product-detail-section position-relative z-1"
  }, [_c("div", {
    staticClass: "jumbotron d-flex rounded-0 h-full",
    staticStyle: {
      "flex-direction": "column"
    }
  }, [_c("div", {
    staticClass: "overlay"
  }), _vm._v(" "), _c("img", {
    attrs: {
      src: "http://127.0.0.1:8000/images/product_jumbotron.png",
      alt: "E-commerce Store",
      height: "100%",
      width: "100%"
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "jumbotron-content"
  }, [_c("h1", {
    staticClass: "text-left my-0 p-0"
  }, [_vm._v(_vm._s(_vm.product.category_name))]), _vm._v(" "), _c("h2", {
    staticClass: "text-left my-0 p-0"
  }, [_vm._v(_vm._s(_vm.product.name))]), _vm._v(" "), _vm.$route.meta.breadcrumb ? _c("b-breadcrumb", {
    staticClass: "bg-transparent p-0 my-2"
  }, _vm._l(_vm.$route.meta.breadcrumb, function (breadCrumb) {
    return _c("b-breadcrumb-item", {
      key: breadCrumb.text,
      staticClass: "text-white",
      attrs: {
        to: {
          route: breadCrumb.route
        }
      }
    }, [_vm._v(_vm._s(breadCrumb.text))]);
  }), 1) : _vm._e()], 1)])]) : _vm._e(), _vm._v(" "), !_vm.loading ? _c("section", [_c("b-row", {
    staticClass: "px-4 py-4"
  }, [_c("b-col", {
    staticClass: "text-justify",
    attrs: {
      cols: "6"
    }
  }, [_c("div", {}, [_c("div", {
    staticClass: "image-card shadow-sm my-2"
  }, [_c("img", {
    attrs: {
      src: _vm.product.image_link,
      alt: "Product image"
    }
  })]), _vm._v(" "), _c("h3", [_vm._v("Description")]), _vm._v(" "), _c("p", [_vm._v(_vm._s(_vm.product.description))])])]), _vm._v(" "), _c("b-col", {
    attrs: {
      cols: "6"
    }
  }, [_c("b-card", {
    staticClass: "shadow-sm px-2 py-2"
  }, [_c("b-card-body", [_c("div", {
    staticClass: "product-summary justify-content-between mb-2"
  }, [_c("h3", {
    staticClass: "text-left"
  }, [_vm._v("Price:")]), _vm._v(" "), _c("h3", {
    staticClass: "text-right"
  }, [_vm._v("Rp" + _vm._s(_vm.product.price.toLocaleString()))])]), _vm._v(" "), _c("hr"), _vm._v(" "), _c("h5", [_vm._v("About Product")]), _vm._v(" "), _c("p", [_vm._v(_vm._s(_vm.product.about_product))]), _vm._v(" "), _c("b-row", [_c("b-col", {
    staticClass: "mb-2",
    attrs: {
      cols: "6"
    }
  }, [_c("h5", [_vm._v("Variant")]), _vm._v(" "), _c("b-form-select", {
    model: {
      value: _vm.formData.variant,
      callback: function callback($$v) {
        _vm.$set(_vm.formData, "variant", $$v);
      },
      expression: "formData.variant"
    }
  }, _vm._l(_vm.variants, function (option) {
    return _c("option", {
      key: option.value,
      domProps: {
        value: option.value
      }
    }, [_c("div", {
      staticClass: "d-flex justify-content-between"
    }, [_vm._v("\n                      " + _vm._s(option.text) + "\n                    ")])]);
  }), 0)], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-2",
    attrs: {
      cols: "6"
    }
  }, [_c("h5", [_vm._v("Size")]), _vm._v(" "), _c("b-form-select", {
    model: {
      value: _vm.formData.size,
      callback: function callback($$v) {
        _vm.$set(_vm.formData, "size", $$v);
      },
      expression: "formData.size"
    }
  }, _vm._l(_vm.sizes, function (option, key) {
    return _c("option", {
      key: key,
      domProps: {
        value: option
      }
    }, [_c("div", {
      staticClass: "d-flex justify-content-between"
    }, [_vm._v("\n                      " + _vm._s(option) + "\n                    ")])]);
  }), 0)], 1), _vm._v(" "), _c("b-col", {
    staticClass: "mb-2",
    attrs: {
      cols: "7"
    }
  }, [_c("h5", [_vm._v("Quantity")]), _vm._v(" "), _c("b-form-group", [_c("b-input-group", [_c("b-form-input", {
    attrs: {
      type: "number",
      min: "1"
    },
    model: {
      value: _vm.formData.quantity,
      callback: function callback($$v) {
        _vm.$set(_vm.formData, "quantity", $$v);
      },
      expression: "formData.quantity"
    }
  }), _vm._v(" "), _c("b-input-group-append", [_c("b-button", {
    attrs: {
      variant: "outline-secondary"
    },
    on: {
      change: function change($event) {
        _vm.formData.quantity += 1;
      }
    }
  }, [_c("feather-icon", {
    attrs: {
      icon: "PlusIcon",
      size: "16"
    }
  })], 1), _vm._v(" "), _c("b-button", {
    attrs: {
      variant: "outline-secondary"
    },
    on: {
      change: function change($event) {
        _vm.formData.quantity += 1;
      }
    }
  }, [_c("feather-icon", {
    attrs: {
      icon: "MinusIcon",
      size: "16"
    }
  })], 1)], 1)], 1)], 1)], 1)], 1), _vm._v(" "), _c("b-button", {
    staticClass: "mt-2",
    attrs: {
      block: "",
      variant: "primary"
    }
  }, [_c("span", {
    staticClass: "d-flex align-items-center justify-content-center"
  }, [_c("feather-icon", {
    staticClass: "mr-2",
    attrs: {
      icon: "ShoppingCartIcon",
      size: "16"
    }
  }), _vm._v("\n                Add to Cart\n              ")], 1)])], 1)], 1)], 1)], 1)], 1) : _vm._e(), _vm._v(" "), _vm.loading ? _c("section", {
    staticClass: "d-flex h-full justify-content-center align-items-center"
  }, [_c("b-spinner")], 1) : _vm._e()]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/src/services/api/product.js":
/*!**************************************************!*\
  !*** ./resources/js/src/services/api/product.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteData: () => (/* binding */ deleteData),
/* harmony export */   getDetail: () => (/* binding */ getDetail),
/* harmony export */   getList: () => (/* binding */ getList),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
/* harmony import */ var _core_libs_network_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/libs/network-service */ "./resources/js/src/@core/libs/network-service.js");

var resourcePath = "/api/product";
var getList = function getList() {
  var _httpService$getHttp;
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return (_httpService$getHttp = _core_libs_network_service__WEBPACK_IMPORTED_MODULE_0__["default"].getHttp()).get.apply(_httpService$getHttp, [resourcePath].concat(args));
};
var postData = function postData() {
  var _httpService$getHttp2;
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  return (_httpService$getHttp2 = _core_libs_network_service__WEBPACK_IMPORTED_MODULE_0__["default"].getHttp()).post.apply(_httpService$getHttp2, [resourcePath].concat(args));
};
var getDetail = function getDetail(id) {
  return _core_libs_network_service__WEBPACK_IMPORTED_MODULE_0__["default"].getHttp().get("".concat(resourcePath, "/").concat(id));
};
var deleteData = function deleteData(id) {
  return _core_libs_network_service__WEBPACK_IMPORTED_MODULE_0__["default"].getHttp()["delete"]("".concat(resourcePath, "/").concat(id));
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/views/pages/user/product/detail.vue?vue&type=style&index=0&id=0b64bcd0&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/views/pages/user/product/detail.vue?vue&type=style&index=0&id=0b64bcd0&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.product-summary[data-v-0b64bcd0] {\r\n  display: flex;\n}\n.product-detail-section[data-v-0b64bcd0] {\r\n  padding: 20px;\r\n  min-height: 300px !important;\r\n  height: 200px !important;\r\n  text-align: center;\n}\n.image-card[data-v-0b64bcd0] {\r\n  width: 15rem;\r\n  height: 18rem;\r\n  border: #d7d7d7 2px solid;\r\n  overflow: hidden;\n}\na.router-link-active[data-v-0b64bcd0] {\r\n  color: #ffffff !important;\n}\n.breadcrumb-item + .breadcrumb-item[data-v-0b64bcd0]::before {\r\n  color: #ffffff;\n}\n.image-card img[data-v-0b64bcd0] {\r\n  -o-object-fit: cover;\r\n     object-fit: cover;\r\n  height: 100%;\n}\n.product-detail-section .jumbotron h1[data-v-0b64bcd0] {\r\n  text-shadow: none;\r\n  color: black;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/views/pages/user/product/detail.vue?vue&type=style&index=0&id=0b64bcd0&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/views/pages/user/product/detail.vue?vue&type=style&index=0&id=0b64bcd0&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_style_index_0_id_0b64bcd0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./detail.vue?vue&type=style&index=0&id=0b64bcd0&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/views/pages/user/product/detail.vue?vue&type=style&index=0&id=0b64bcd0&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_style_index_0_id_0b64bcd0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_style_index_0_id_0b64bcd0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/src/views/pages/user/product/detail.vue":
/*!**************************************************************!*\
  !*** ./resources/js/src/views/pages/user/product/detail.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _detail_vue_vue_type_template_id_0b64bcd0_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detail.vue?vue&type=template&id=0b64bcd0&scoped=true */ "./resources/js/src/views/pages/user/product/detail.vue?vue&type=template&id=0b64bcd0&scoped=true");
/* harmony import */ var _detail_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail.vue?vue&type=script&lang=js */ "./resources/js/src/views/pages/user/product/detail.vue?vue&type=script&lang=js");
/* harmony import */ var _detail_vue_vue_type_style_index_0_id_0b64bcd0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detail.vue?vue&type=style&index=0&id=0b64bcd0&scoped=true&lang=css */ "./resources/js/src/views/pages/user/product/detail.vue?vue&type=style&index=0&id=0b64bcd0&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _detail_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _detail_vue_vue_type_template_id_0b64bcd0_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _detail_vue_vue_type_template_id_0b64bcd0_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "0b64bcd0",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/pages/user/product/detail.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/pages/user/product/detail.vue?vue&type=script&lang=js":
/*!**************************************************************************************!*\
  !*** ./resources/js/src/views/pages/user/product/detail.vue?vue&type=script&lang=js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./detail.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/views/pages/user/product/detail.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/pages/user/product/detail.vue?vue&type=template&id=0b64bcd0&scoped=true":
/*!********************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/user/product/detail.vue?vue&type=template&id=0b64bcd0&scoped=true ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_template_id_0b64bcd0_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_template_id_0b64bcd0_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_template_id_0b64bcd0_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./detail.vue?vue&type=template&id=0b64bcd0&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/views/pages/user/product/detail.vue?vue&type=template&id=0b64bcd0&scoped=true");


/***/ }),

/***/ "./resources/js/src/views/pages/user/product/detail.vue?vue&type=style&index=0&id=0b64bcd0&scoped=true&lang=css":
/*!**********************************************************************************************************************!*\
  !*** ./resources/js/src/views/pages/user/product/detail.vue?vue&type=style&index=0&id=0b64bcd0&scoped=true&lang=css ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_detail_vue_vue_type_style_index_0_id_0b64bcd0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./detail.vue?vue&type=style&index=0&id=0b64bcd0&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/views/pages/user/product/detail.vue?vue&type=style&index=0&id=0b64bcd0&scoped=true&lang=css");


/***/ })

}]);