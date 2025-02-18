/**
 * HTMLElement's `style` property is readonly, so you can't
 * set multiple properties at once which can be cumbersome.
 * 
 * This function makes programmatically setting multiple
 * style values simpler by converting an object into a
 * CSS string that can be set at once using `setAttribute()`.
 * 
 * Usage:
 * 
 *    const el = new HTMLDivElement()
 *    el.setAttribute('style' convertToCssString({
 *      height: '16px',
 *      'font-size': '12px'
 *    }))
 * 
 * Please note that you can not use camel-case keys like
 * the are being used with `style`. Use the actual kebab-case
 * CSS key instead.
 */
export function convertToCssString(object: {[key:string]:any}):string {
  return Object.entries(object).map(([key, value]) => `${key}: ${value}`).join(';')
}