import AnimationLibrary from "./animation-library";
import Clovers from "./presets/clovers";
import Flowers from "./presets/flowers";

const canvas = document.querySelector('canvas')

switch (new window.URLSearchParams(window.location.search).get('preset')) {
  case 'flowers':
    new AnimationLibrary(canvas, Flowers)
    break

  default:
    new AnimationLibrary(canvas, Clovers)
    break
}
