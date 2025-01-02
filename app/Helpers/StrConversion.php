<?php

namespace App\Helpers;

use Carbon\Carbon;
use Illuminate\Support\Str;

class StrConversion
{
    /**
     * Convert a string to snake case.
     *
     * @param  string  $value
     * @param  string  $delimiter
     * @return string
     */
    public static function snake($value, $delimiter = '_')
    {
        if (!ctype_lower($value)) {
            $value = preg_replace('/\s+/u', '', ucwords($value));
            $value = strtolower(preg_replace('/(.)(?=[A-Z])/u', '$1' . $delimiter, $value));
        }

        return $value;
    }

    /**
     * Convert a string to camel case.
     *
     * @param  string  $value
     * @return string
     */
    public static function camel($value)
    {
        $value = ucwords(str_replace(['-', '_'], ' ', $value));
        $value = str_replace(' ', '', $value);
        $value = lcfirst($value);

        return $value;
    }

    /**
     * Convert a string to kebab case.
     *
     * @param  string  $value
     * @return string
     */
    public static function kebab($value)
    {
        return strtolower(preg_replace('/[A-Z]/', '-$0', lcfirst($value)));
    }

    public static function toSlug($firstStr, $secondStr = null)
    {
        $slug = Str::slug($firstStr);
        if ($secondStr) {
            $slug = $slug . '-' . Str::slug($secondStr);
        }

        return $slug;
    }
}
