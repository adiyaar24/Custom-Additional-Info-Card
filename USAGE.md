# Catalog Additional Info Card

This plugin provides a component that integrates with Backstage catalog to display additional information from entity metadata.

## 🚀 Usage in EntityPage

### Basic Integration

```typescript
import React from 'react';
import { CatalogAdditionalInfoCard } from '@adiyaar/backstage-plugin-custom-additional-info-card';
import { Grid } from '@material-ui/core';

// In your EntityPage.tsx
const overviewContent = (
  <Grid container spacing={3} alignItems="stretch">
    <Grid item md={12} xs={12}>
      <CatalogAdditionalInfoCard 
        title="Deployment Information" 
        metadataPath="metadata.additionalInfo.deployment"
      />
    </Grid>
  </Grid>
);
```

## 🔧 Entity Metadata Structure

The component reads from your entity's metadata. Example entity:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: my-service
  additionalInfo:
    deployment:
      environment: production
      region: us-east-1
      version: v1.2.3
    monitoring:
      healthcheck: /health
      uptime: 99.9%
spec:
  type: service
  lifecycle: production
  owner: platform-team
```

## 📝 Component Props

```typescript
interface CatalogAdditionalInfoCardProps {
  metadataPath?: string;                 // Path to metadata (e.g., "metadata.additionalInfo.deployment")
  title?: string;                        // Card title (default: "Additional Information")
  maxLevel?: number;                     // Max nesting level (default: 3)
  textStyle?: 'normal' | 'monospace' | 'condensed';
}
```

## 🎨 Examples

### Default Usage (reads metadata.additionalInfo)
```typescript
<CatalogAdditionalInfoCard />
```

### Specific Metadata Path
```typescript
<CatalogAdditionalInfoCard 
  title="Deployment Info"
  metadataPath="metadata.additionalInfo.deployment"
/>
```

### Custom Styling
```typescript
<CatalogAdditionalInfoCard 
  title="Technical Details"
  textStyle="monospace"
  maxLevel={2}
/>
```

## 🏃‍♂️ Testing Locally

1. Start the development server:
```bash
yarn dev
```

2. Navigate to any service entity to see the card in action

3. The card will show an empty state if no additionalInfo exists in the entity metadata

## ✨ Features

- ✅ Integrates with Backstage catalog API
- ✅ Reads entity metadata automatically
- ✅ Supports nested data structures
- ✅ Configurable metadata paths
- ✅ Graceful empty state handling
- ✅ Clean, elegant Material-UI design