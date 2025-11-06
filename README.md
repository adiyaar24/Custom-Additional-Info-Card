# Custom Additional Info Card Plugin

A clean, elegant Backstage plugin for displaying custom metadata from your catalog entities.

## Features

- **Clean Display**: Elegant rendering of nested metadata with proper formatting
- **Flexible Configuration**: Customizable title, metadata path, and display options
- **Type-Aware Rendering**: Smart formatting for objects, arrays, booleans, and timestamps
- **Responsive Design**: Works seamlessly across different screen sizes

## Installation

1. Add the plugin to your Backstage app:

```bash
yarn add @adiyaar/backstage-plugin-custom-additional-info-card
```

2. Add the component to your EntityPage.tsx:

```typescript
import { HarnessAdditionalInfoCard } from '@adiyaar/backstage-plugin-custom-additional-info-card';

// In your entity overview section:
<Grid item md={12} xs={12}>
  <HarnessAdditionalInfoCard />
</Grid>
```

## Configuration

### Basic Usage

```typescript
<HarnessAdditionalInfoCard />
```

### Advanced Configuration

```typescript
<HarnessAdditionalInfoCard 
  title="Deployment Information"
  metadataPath="additionalInfo.deployment"
  maxLevel={2}
  textStyle="monospace"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | "Additional Information" | Custom title for the card |
| `metadataPath` | string | undefined | Specific path in metadata to display |
| `maxLevel` | number | 3 | Maximum nesting level for objects |
| `textStyle` | 'normal' \| 'monospace' \| 'condensed' | 'normal' | Text rendering style |

## YAML Configuration

Add custom metadata to your catalog entity files:

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
      healthEndpoint: /health
      metricsEndpoint: /metrics
spec:
  type: service
  lifecycle: experimental
  owner: platform-team
```

## Best Practices

1. **Structure Your Data**: Group related metadata under meaningful keys (e.g., deployment, monitoring)
2. **Use Descriptive Keys**: Choose clear, descriptive field names that will be readable when formatted
3. **Keep It Relevant**: Only include metadata that adds value for users viewing the entity
4. **Consider Nesting Levels**: Adjust maxLevel prop based on your data complexity

## Development

To test the plugin locally:

```bash
yarn start
```

This will start the development server and you can navigate to the plugin page to see the documentation and test the component.

## License

Apache-2.0