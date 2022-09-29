function requireAll(r) {
  r.keys().forEach(r);
}

// Libs
import '@/libs/css/normalize';
import '@/libs/css/fancybox';
import '@/libs/css/splide.min';
import '@/libs/css/materialize.min';
// Main css
import '@/styles/style';

// JS Modules
import MyFunctions from '@/js/modules/MyFunctions';
import jq from '@/js/modules/jq';

requireAll(require.context('@/svg/', true, /\.svg$/));

window.myFunctions = new MyFunctions();

jq();
