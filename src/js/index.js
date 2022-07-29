function requireAll(r) {
  r.keys().forEach(r);
}

// Main css
import '@/styles/style';

// JS Modules
import vueCustom from '@/js/modules/vue-custom';
import MyFunctions from '@/js/modules/MyFunctions';
import other from '@/js/modules/other';
import jq from '@/js/modules/jq';
import hoverEffectBtns from '@/js/modules/hover-effect-btns';

requireAll(require.context('@/svg/', true, /\.svg$/));

window.myFunctions = new MyFunctions();

vueCustom();
other();
jq();
hoverEffectBtns();
