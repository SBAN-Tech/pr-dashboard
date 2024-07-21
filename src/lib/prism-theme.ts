import onelight from 'prism-theme-one-light-dark/prism-onelight.css?raw';
import onedark from 'prism-theme-one-light-dark/prism-onedark.css?raw';
let theme = `@media (prefers-color-scheme: light) { ${onelight} } @media(prefers-color-scheme: dark) { ${onedark} }`;
export default theme;
