import { createPlugin, createComponentExtension } from '@backstage/core-plugin-api';

export const customAdditionalInfoCardPlugin = createPlugin({
  id: 'custom-additional-info-card',
});

export const CustomAdditionalInfoCard = customAdditionalInfoCardPlugin.provide(
  createComponentExtension({
    name: 'CustomAdditionalInfoCard',
    component: {
      lazy: () => 
        import('./components/CatalogAdditionalInfoCard').then(m => m.CatalogAdditionalInfoCard),
    },
  }),
);
