function requireAll(r) {
  r.keys().forEach(r);
}

// Main css
import '@/styles/style';

// JS Modules
import vueCustom from '@/js/modules/vue-custom';
import other from '@/js/modules/other';
import jq from '@/js/modules/jq';
import hoverEffectBtns from '@/js/modules/hover-effect-btns';

requireAll(require.context('@/svg/', true, /\.svg$/));

vueCustom();
other();
jq();
hoverEffectBtns();
