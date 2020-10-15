import AnimationLibrary from "./animation-library";
import Clovers from "./presets/clovers";
import Flowers from "./presets/flowers";

switch (new window.URLSearchParams(window.location.search).get('preset')) {
  case 'flowers':
    new AnimationLibrary(document.body, Flowers)
    break

  default:
    new AnimationLibrary(document.body, Clovers)
    break
}
