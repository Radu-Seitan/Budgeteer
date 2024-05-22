import store from '../store/store';
import { logout } from '../store/user/reducer';

async function signOutAndRedirect() {
    store.dispatch(logout());
}

export { signOutAndRedirect };
