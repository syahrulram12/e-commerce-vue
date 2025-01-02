import { extend, localize } from "vee-validate";
import {
    required as rule_required,
    email as rule_email,
    min as rule_min,
    max as rule_max,
    required_if as rule_required_if,
    min_value as rule_min_value,
    max_value as rule_max_value,
    confirmed as rule_confirmed,
    regex as rule_regex,
    between as rule_between,
    alpha as rule_alpha,
    integer as rule_integer,
    digits as rule_digits,
    alpha_dash as rule_alpha_dash,
    alpha_num as rule_alpha_num,
    length as rule_length,
    numeric as rule_numeric,
} from "vee-validate/dist/rules";
import id from "vee-validate/dist/locale/id.json";

// eslint-disable-next-line object-curly-newline
import {
    validatorPositive,
    validatorUrlValidator,
    validatorPassword,
    validatorCheckNotIf,
    validatorCreditCard,
    validatorIsNot,
} from "./validators";

// ////////////////////////////////////////////////////////
// General
// ////////////////////////////////////////////////////////

localize({ en: { messages: id.messages } });

export const required = extend("required", rule_required);

export const email = extend("email", rule_email);

export const min = extend("min", rule_min);

export const max = extend("max", rule_max);

export const min_value = extend("min_value", rule_min_value);

export const max_value = extend("max_value", rule_max_value);

export const confirmed = extend("confirmed", rule_confirmed);

export const required_if = extend("required_if", rule_required_if);

export const regex = extend("regex", rule_regex);

export const between = extend("between", rule_between);

export const alpha = extend("alpha", rule_alpha);

export const integer = extend("integer", rule_integer);

export const digits = extend("digits", rule_digits);

export const alphaDash = extend("alpha-dash", rule_alpha_dash);

export const alphaNum = extend("alpha-num", rule_alpha_num);

export const length = extend("length", rule_length);

export const numeric = extend("numeric", rule_numeric);

export const positive = extend("positive", {
    validate: validatorPositive,
    message: "Masukkan Angka Positif!",
});

export const credit = extend("credit-card", {
    validate: validatorCreditCard,
    message: "Kartu Kredit Tidak Valid",
});

export const password = extend("password", {
    validate: validatorPassword,
    message:
        "{_field_} setidaknya harus mempunyai 1 huruf besar, satu huruf kecil, dan satu spesial karakter dan 1 digit",
});

export const url = extend("url", {
    validate: validatorUrlValidator,
    message: "URL is invalid",
});

export const check_is_not = extend("check_is_not", {
    validate: validatorIsNot,
    message: "{_field_} harus diisi",
});

export const check_is_not_if = extend("check_is_not_if", {
    validate: validatorCheckNotIf,
    message: "{_field_} harus diisi",
});
