function requireAll(r) {
  r.keys().forEach(r);
}

// Main css
import '@/styles/style';

// JS Modules
import other from '@/js/modules/other';
import jq from '@/js/modules/jq';

//import ad from '@/svg/address-blue.svg';

requireAll(require.context('@/svg/', true, /\.svg$/));

other();
jq();
