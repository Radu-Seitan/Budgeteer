export type MenuEntry = {
    key: string;
    title: string;
    route: string;
};

export const settingsItems: MenuEntry[] = [
    {
        key: 'settings',
        title: 'Settings',
        route: '/settings',
    },
];
