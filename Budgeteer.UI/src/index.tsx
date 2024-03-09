import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { initTranslations } from './i18next';
import { createRoot } from 'react-dom/client';
import { AppRoutes } from './configs/appRoutes';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import store from './store/store';

import './App.scss';

initTranslations();

const container = document.getElementById('root');
if (container) {
    let persistor = persistStore(store);
    const root = createRoot(container);

    root.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <AppRoutes></AppRoutes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}
