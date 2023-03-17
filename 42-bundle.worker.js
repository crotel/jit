self.webpackChunk([42],{55:function(e,n,r){"use strict";r.r(n),n.default='/*! *****************************************************************************\nCopyright (c) Microsoft Corporation. All rights reserved.\nLicensed under the Apache License, Version 2.0 (the "License"); you may not use\nthis file except in compliance with the License. You may obtain a copy of the\nLicense at http://www.apache.org/licenses/LICENSE-2.0\n\nTHIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\nKIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED\nWARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,\nMERCHANTABLITY OR NON-INFRINGEMENT.\n\nSee the Apache Version 2.0 License for specific language governing permissions\nand limitations under the License.\n***************************************************************************** */\n\n\n\n/// <reference no-default-lib="true"/>\r\n\n\n/// <reference lib="es2015.iterable" />\r\n/// <reference lib="es2015.symbol" />\r\n\r\ninterface SymbolConstructor {\r\n    /**\r\n     * A regular expression method that matches the regular expression against a string. Called\r\n     * by the String.prototype.matchAll method.\r\n     */\r\n    readonly matchAll: symbol;\r\n}\r\n\r\ninterface RegExp {\r\n    /**\r\n     * Matches a string with this regular expression, and returns an iterable of matches\r\n     * containing the results of that search.\r\n     * @param string A string to search within.\r\n     */\r\n    [Symbol.matchAll](str: string): IterableIterator<RegExpMatchArray>;\r\n}\r\n'}});