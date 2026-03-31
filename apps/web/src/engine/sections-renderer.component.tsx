import type { ComponentType } from 'react';
import { componentMap } from './component-map';
import type { SiteConfig } from './validate-config';
import configData from '../../data/config.json';
import contentData from '../../data/content.json';
import { validateConfig } from './validate-config';

const validatedConfig = validateConfig(configData);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const registry = new Map<string, ComponentType<Record<string, any>>>(
  componentMap.map(([key, , Comp]) => [key, Comp as ComponentType<Record<string, any>>]),
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultContent = contentData as Record<string, any>;

interface SectionsRendererProps {
  config?: SiteConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: Record<string, any>;
}

export function SectionsRenderer({ config = validatedConfig, content = defaultContent }: SectionsRendererProps) {
  return (
    <>
      {config.sections.map((section, index) => {
        const Comp = registry.get(section.layout);
        if (!Comp) {
          return null;
        }
        const sectionContent = content[section.type] ?? {};
        return <Comp key={`${section.type}-${index}`} {...sectionContent} />;
      })}
    </>
  );
}
