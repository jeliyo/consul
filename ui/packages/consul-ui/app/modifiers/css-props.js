import { modifier } from 'ember-modifier';
const STYLE_RULE = 1;
const getCustomProperties = function() {
  return Object.fromEntries(
    [...document.styleSheets].reduce(
      (prev, item) =>
        prev.concat(
          [...item.cssRules]
            .filter(item => item.type === STYLE_RULE)
            .reduce((prev, rule) => {
              const props = [...rule.style]
                .filter(prop => prop.startsWith('--'))
                .map(prop => [prop.trim(), rule.style.getPropertyValue(prop).trim()]);
              return [...prev, ...props];
            }, [])
        ),
      []
    )
  );
};
export default modifier(function enabled($element, [returns], global = false) {
  const style = getComputedStyle($element);
  if (true) {
    const props = getCustomProperties();
    const obj = {};
    Object.entries(props).forEach(([key, value]) => {
      const res = key.match(/^\-\-[a-z-]*/);
      let prop = res[0];
      if (prop.charAt(prop.length - 1) === '-') {
        prop = prop.substr(0, prop.length - 1);
      }
      if (typeof obj[prop] === 'undefined') {
        obj[prop] = {};
      }
      obj[prop][key] = value;
    });
    returns(obj);
  }
  // console.log(getComputedStyle($element).getPropertyValue('--brand-050'), getComputedStyle($element)[]);
});
