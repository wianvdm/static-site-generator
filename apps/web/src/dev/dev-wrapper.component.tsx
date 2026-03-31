import { useState, useMemo } from 'react';
import { componentMap } from '../engine/component-map';
import { SectionsRenderer } from '../engine/sections-renderer.component';
import type { SiteConfig } from '../engine/validate-config';
import { DevToolbar } from './dev-toolbar.component';

interface VariantOption {
  layoutKey: string;
  sectionType: string;
  label: string;
}

type RegistryTuple = readonly [string, unknown, unknown];

const demoContentModules = import.meta.glob<Record<string, unknown>>(
  './content/*.json',
  { eager: true },
);

function groupVariantsByType(map: readonly RegistryTuple[]): Map<string, VariantOption[]> {
  const grouped = new Map<string, VariantOption[]>();

  for (const [layoutKey] of map) {
    const sectionType = extractSectionType(layoutKey);
    const label = toLabel(layoutKey);
    const option: VariantOption = { layoutKey, sectionType, label };

    const existing = grouped.get(sectionType);
    if (existing) {
      existing.push(option);
    } else {
      grouped.set(sectionType, [option]);
    }
  }

  return grouped;
}

function extractSectionType(layoutKey: string): string {
  const lastHyphen = layoutKey.lastIndexOf('-');
  return lastHyphen === -1 ? layoutKey : layoutKey.slice(0, lastHyphen);
}

function toLabel(layoutKey: string): string {
  return layoutKey
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function loadVariantContent(sectionType: string, layoutKey: string): Record<string, unknown> {
  const moduleKey = `./content/${layoutKey}.json`;
  const mod = demoContentModules[moduleKey];
  if (!mod) {
    return { sectionType, layout: layoutKey };
  }
  return { ...mod, sectionType };
}

export function DevWrapper() {
  const variantsByType = useMemo(() => groupVariantsByType(componentMap), []);
  const sectionTypes = useMemo(() => Array.from(variantsByType.keys()), [variantsByType]);

  const [selectedSection, setSelectedSection] = useState<string>(sectionTypes[0]);
  const [isOpen, setIsOpen] = useState(false);

  const currentVariants = variantsByType.get(selectedSection) ?? [];
  const [activeLayouts, setActiveLayouts] = useState<Map<string, string>>(() => {
    const initial = new Map<string, string>();
    for (const [sectionType, options] of variantsByType) {
      initial.set(sectionType, options[0].layoutKey);
    }
    return initial;
  });

  const activeLayout = activeLayouts.get(selectedSection) ?? currentVariants[0]?.layoutKey ?? '';

  const devConfig = useMemo<SiteConfig>(() => ({
    siteName: 'Dev Preview',
    sections: [{ type: selectedSection, layout: activeLayout }],
  }), [selectedSection, activeLayout]);

  const devContent = useMemo<Record<string, unknown>>(() => ({
    [selectedSection]: loadVariantContent(selectedSection, activeLayout),
  }), [selectedSection, activeLayout]);

  function handleSectionChange(sectionType: string) {
    setSelectedSection(sectionType);
  }

  function handleLayoutChange(layoutKey: string) {
    setActiveLayouts((prev) => {
      const next = new Map(prev);
      next.set(selectedSection, layoutKey);
      return next;
    });
  }

  return (
    <>
      <SectionsRenderer config={devConfig} content={devContent} />
      <DevToolbar
        sections={sectionTypes}
        selectedSection={selectedSection}
        onSectionChange={handleSectionChange}
        variants={currentVariants}
        activeLayout={activeLayout}
        onLayoutChange={handleLayoutChange}
        isOpen={isOpen}
        onToggle={() => setIsOpen((prev) => !prev)}
      />
    </>
  );
}