import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { customAdditionalInfoCardPlugin } from '../src/plugin';
import { CatalogAdditionalInfoCard } from '../src/components/CatalogAdditionalInfoCard';

createDevApp()
  .registerPlugin(customAdditionalInfoCardPlugin)
  .addPage({
    element: <CatalogAdditionalInfoCard title="Dev Demo" />,
    title: 'Catalog Card Demo',
    path: '/custom-additional-info-card'
  })
  .render();
