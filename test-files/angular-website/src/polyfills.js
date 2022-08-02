"use strict";
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes recent versions of Safari, Chrome (including
 * Opera), Edge on the desktop, and iOS and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */
Object.defineProperty(exports, "__esModule", { value: true });
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
/**
 * By default, zone.js will patch all possible macroTask and DomEvents
 * user can disable parts of macroTask/DomEvents patch by setting following flags
 * because those flags need to be set before `zone.js` being loaded, and webpack
 * will put import in the top of bundle, so user need to create a separate file
 * in this directory (for example: zone-flags.ts), and put the following flags
 * into that file, and then add the following code before importing zone.js.
 * import './zone-flags';
 *
 * The flags allowed in zone-flags.ts are listed here.
 *
 * The following flags will work for all browsers.
 *
 * (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
 * (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick
 * (window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames
 *
 *  in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
 *  with the following flag, it will bypass `zone.js` patch for IE/Edge
 *
 *  (window as any).__Zone_enable_cross_context_check = true;
 *
 */
/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
require("zone.js"); // Included with Angular CLI.
/***************************************************************************************************
 * APPLICATION IMPORTS
 */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWZpbGxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9seWZpbGxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7R0FjRzs7QUFFSDs7R0FFRztBQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUg7O0dBRUc7QUFDSCxtQkFBaUIsQ0FBRSw2QkFBNkI7QUFHaEQ7O0dBRUciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoaXMgZmlsZSBpbmNsdWRlcyBwb2x5ZmlsbHMgbmVlZGVkIGJ5IEFuZ3VsYXIgYW5kIGlzIGxvYWRlZCBiZWZvcmUgdGhlIGFwcC5cbiAqIFlvdSBjYW4gYWRkIHlvdXIgb3duIGV4dHJhIHBvbHlmaWxscyB0byB0aGlzIGZpbGUuXG4gKlxuICogVGhpcyBmaWxlIGlzIGRpdmlkZWQgaW50byAyIHNlY3Rpb25zOlxuICogICAxLiBCcm93c2VyIHBvbHlmaWxscy4gVGhlc2UgYXJlIGFwcGxpZWQgYmVmb3JlIGxvYWRpbmcgWm9uZUpTIGFuZCBhcmUgc29ydGVkIGJ5IGJyb3dzZXJzLlxuICogICAyLiBBcHBsaWNhdGlvbiBpbXBvcnRzLiBGaWxlcyBpbXBvcnRlZCBhZnRlciBab25lSlMgdGhhdCBzaG91bGQgYmUgbG9hZGVkIGJlZm9yZSB5b3VyIG1haW5cbiAqICAgICAgZmlsZS5cbiAqXG4gKiBUaGUgY3VycmVudCBzZXR1cCBpcyBmb3Igc28tY2FsbGVkIFwiZXZlcmdyZWVuXCIgYnJvd3NlcnM7IHRoZSBsYXN0IHZlcnNpb25zIG9mIGJyb3dzZXJzIHRoYXRcbiAqIGF1dG9tYXRpY2FsbHkgdXBkYXRlIHRoZW1zZWx2ZXMuIFRoaXMgaW5jbHVkZXMgcmVjZW50IHZlcnNpb25zIG9mIFNhZmFyaSwgQ2hyb21lIChpbmNsdWRpbmdcbiAqIE9wZXJhKSwgRWRnZSBvbiB0aGUgZGVza3RvcCwgYW5kIGlPUyBhbmQgQ2hyb21lIG9uIG1vYmlsZS5cbiAqXG4gKiBMZWFybiBtb3JlIGluIGh0dHBzOi8vYW5ndWxhci5pby9ndWlkZS9icm93c2VyLXN1cHBvcnRcbiAqL1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBCUk9XU0VSIFBPTFlGSUxMU1xuICovXG5cbi8qKlxuICogQnkgZGVmYXVsdCwgem9uZS5qcyB3aWxsIHBhdGNoIGFsbCBwb3NzaWJsZSBtYWNyb1Rhc2sgYW5kIERvbUV2ZW50c1xuICogdXNlciBjYW4gZGlzYWJsZSBwYXJ0cyBvZiBtYWNyb1Rhc2svRG9tRXZlbnRzIHBhdGNoIGJ5IHNldHRpbmcgZm9sbG93aW5nIGZsYWdzXG4gKiBiZWNhdXNlIHRob3NlIGZsYWdzIG5lZWQgdG8gYmUgc2V0IGJlZm9yZSBgem9uZS5qc2AgYmVpbmcgbG9hZGVkLCBhbmQgd2VicGFja1xuICogd2lsbCBwdXQgaW1wb3J0IGluIHRoZSB0b3Agb2YgYnVuZGxlLCBzbyB1c2VyIG5lZWQgdG8gY3JlYXRlIGEgc2VwYXJhdGUgZmlsZVxuICogaW4gdGhpcyBkaXJlY3RvcnkgKGZvciBleGFtcGxlOiB6b25lLWZsYWdzLnRzKSwgYW5kIHB1dCB0aGUgZm9sbG93aW5nIGZsYWdzXG4gKiBpbnRvIHRoYXQgZmlsZSwgYW5kIHRoZW4gYWRkIHRoZSBmb2xsb3dpbmcgY29kZSBiZWZvcmUgaW1wb3J0aW5nIHpvbmUuanMuXG4gKiBpbXBvcnQgJy4vem9uZS1mbGFncyc7XG4gKlxuICogVGhlIGZsYWdzIGFsbG93ZWQgaW4gem9uZS1mbGFncy50cyBhcmUgbGlzdGVkIGhlcmUuXG4gKlxuICogVGhlIGZvbGxvd2luZyBmbGFncyB3aWxsIHdvcmsgZm9yIGFsbCBicm93c2Vycy5cbiAqXG4gKiAod2luZG93IGFzIGFueSkuX19ab25lX2Rpc2FibGVfcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gdHJ1ZTsgLy8gZGlzYWJsZSBwYXRjaCByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAqICh3aW5kb3cgYXMgYW55KS5fX1pvbmVfZGlzYWJsZV9vbl9wcm9wZXJ0eSA9IHRydWU7IC8vIGRpc2FibGUgcGF0Y2ggb25Qcm9wZXJ0eSBzdWNoIGFzIG9uY2xpY2tcbiAqICh3aW5kb3cgYXMgYW55KS5fX3pvbmVfc3ltYm9sX19VTlBBVENIRURfRVZFTlRTID0gWydzY3JvbGwnLCAnbW91c2Vtb3ZlJ107IC8vIGRpc2FibGUgcGF0Y2ggc3BlY2lmaWVkIGV2ZW50TmFtZXNcbiAqXG4gKiAgaW4gSUUvRWRnZSBkZXZlbG9wZXIgdG9vbHMsIHRoZSBhZGRFdmVudExpc3RlbmVyIHdpbGwgYWxzbyBiZSB3cmFwcGVkIGJ5IHpvbmUuanNcbiAqICB3aXRoIHRoZSBmb2xsb3dpbmcgZmxhZywgaXQgd2lsbCBieXBhc3MgYHpvbmUuanNgIHBhdGNoIGZvciBJRS9FZGdlXG4gKlxuICogICh3aW5kb3cgYXMgYW55KS5fX1pvbmVfZW5hYmxlX2Nyb3NzX2NvbnRleHRfY2hlY2sgPSB0cnVlO1xuICpcbiAqL1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBab25lIEpTIGlzIHJlcXVpcmVkIGJ5IGRlZmF1bHQgZm9yIEFuZ3VsYXIgaXRzZWxmLlxuICovXG5pbXBvcnQgJ3pvbmUuanMnOyAgLy8gSW5jbHVkZWQgd2l0aCBBbmd1bGFyIENMSS5cblxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBBUFBMSUNBVElPTiBJTVBPUlRTXG4gKi9cbiJdfQ==