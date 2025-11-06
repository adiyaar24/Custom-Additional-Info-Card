import React from 'react';
import { useEntity } from '@backstage/plugin-catalog-react';
import { 
  Typography, 
  Box, 
  Chip
} from '@mui/material';

interface RenderObjectProps {
  data: Record<string, any>;
  level?: number;
  maxLevel?: number;
  textStyle?: 'normal' | 'monospace' | 'condensed';
}

// Clean text formatting
const formatValue = (value: any): string => {
  if (typeof value === 'boolean') {
    return value ? 'Enabled' : 'Disabled';
  }
  if (typeof value === 'string') {
    // Format timestamps
    if (value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
      const date = new Date(value);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }
  }
  return String(value);
};

// Clean key formatting
const formatKey = (key: string): string => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
};

function RenderObject({ 
  data, 
  level = 0, 
  maxLevel = 3,
  textStyle = 'normal'
}: RenderObjectProps) {
  if (!data || typeof data !== 'object') {
    return (
      <Box p={2}>
        <Typography variant="body2" color="textSecondary">
          No data available
        </Typography>
      </Box>
    );
  }

  if (level >= maxLevel) {
    return (
      <Box p={1}>
        <Typography variant="body2" color="textSecondary">
          Maximum nesting level reached
        </Typography>
      </Box>
    );
  }

  const entries = Object.entries(data).filter(([_, value]) => value !== null && value !== undefined);

  if (entries.length === 0) {
    return (
      <Box p={2}>
        <Typography variant="body2" color="textSecondary">
          No data available
        </Typography>
      </Box>
    );
  }

  const getTextStyle = () => {
    switch (textStyle) {
      case 'monospace':
        return { fontFamily: 'monospace' };
      case 'condensed':
        return { fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '-0.025em' };
      default:
        return {};
    }
  };

  return (
    <Box sx={{ backgroundColor: 'white', p: 2 }}>
      {entries.map(([key, value], index) => {
        if (value === null || value === undefined) return null;
        
        const isObject = typeof value === 'object' && !Array.isArray(value);
        const isArray = Array.isArray(value);
        const formattedKey = formatKey(key);
        
        return (
          <Box key={key} sx={{ mb: 2 }}>
            {isObject ? (
              <Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    color: '#333',
                    mb: 1.5,
                    ...getTextStyle()
                  }}
                >
                  {formattedKey}
                </Typography>
                <Box sx={{ pl: 2, borderLeft: '3px solid #f0f0f0' }}>
                  <RenderObject 
                    data={value} 
                    level={level + 1} 
                    maxLevel={maxLevel}
                    textStyle={textStyle}
                  />
                </Box>
              </Box>
            ) : isArray ? (
              <Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 1,
                    color: '#333',
                    ...getTextStyle()
                  }}
                >
                  {formattedKey}
                </Typography>
                <Box sx={{ pl: 2 }}>
                  {value.map((item: any, index: number) => {
                    // Check if array item is an object
                    if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
                      return (
                        <Box key={index} sx={{ mb: 2, borderLeft: '3px solid #e0e0e0', pl: 2 }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 500, 
                              mb: 1, 
                              color: '#666',
                              ...getTextStyle()
                            }}
                          >
                            Item {index + 1}
                          </Typography>
                          <RenderObject 
                            data={item} 
                            level={level + 1} 
                            maxLevel={maxLevel}
                            textStyle={textStyle}
                          />
                        </Box>
                      );
                    } else {
                      // For primitive values, use chips as before
                      return (
                        <Chip
                          key={index}
                          label={formatValue(item)}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            backgroundColor: 'white',
                            borderColor: '#e0e0e0',
                            mr: 1,
                            mb: 1
                          }}
                        />
                      );
                    }
                  })}
                </Box>
              </Box>
            ) : (
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  py: 1,
                  borderBottom: index < entries.length - 1 ? '1px solid #f5f5f5' : 'none'
                }}
              >
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: 500,
                    color: '#333',
                    minWidth: 120,
                    ...getTextStyle()
                  }}
                >
                  {formattedKey}:
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#555',
                    wordBreak: 'break-word',
                    textAlign: 'right',
                    maxWidth: 300,
                    ...getTextStyle()
                  }}
                >
                  {formatValue(value)}
                </Typography>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

export interface CatalogAdditionalInfoCardProps {
  /** Path to the metadata (e.g., "metadata.additionalInfo.deployment") */
  metadataPath?: string;
  /** Card title (defaults to "Additional Information") */
  title?: string;
  /** Maximum nesting level for objects (defaults to 3) */
  maxLevel?: number;
  /** Text style for rendering (defaults to "normal") */
  textStyle?: 'normal' | 'monospace' | 'condensed';
}

export function CatalogAdditionalInfoCard({
  metadataPath,
  title = "Additional Information",
  maxLevel = 5,
  textStyle = 'normal'
}: CatalogAdditionalInfoCardProps) {
  const { entity } = useEntity();
  
  // Get data from specified path or entire additionalInfo
  const getData = () => {
    if (!entity?.metadata) return null;
    
    if (metadataPath) {
      const path = metadataPath.split('.');
      let data: any = entity;
      
      for (const key of path) {
        if (data && typeof data === 'object' && key in data) {
          data = data[key];
        } else {
          return null;
        }
      }
      
      return data;
    }
    
    // Default to additionalInfo if no path specified
    return entity.metadata.additionalInfo || null;
  };

  const data = getData();

  if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
    return (
      <Box sx={{ backgroundColor: 'white', p: 3, borderRadius: 1, border: '1px solid #e0e0e0' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          No additional information available          
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: 'white', borderRadius: 1, border: '1px solid #e0e0e0' }}>
      <Box sx={{ p: 3, pb: 0 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
          {title}
        </Typography>
      </Box>
      <RenderObject data={data} maxLevel={maxLevel} textStyle={textStyle} />
    </Box>
  );
}