import './dev-toolbar.css';

interface VariantOption {
  layoutKey: string;
  sectionType: string;
  label: string;
}

interface DevToolbarProps {
  sections: string[];
  selectedSection: string;
  onSectionChange: (sectionType: string) => void;
  variants: VariantOption[];
  activeLayout: string;
  onLayoutChange: (layoutKey: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function DevToolbar({
  sections,
  selectedSection,
  onSectionChange,
  variants,
  activeLayout,
  onLayoutChange,
  isOpen,
  onToggle,
}: DevToolbarProps) {
  return (
    <div className="dev-toolbar">
      <button
        className="dev-toolbar__toggle"
        onClick={onToggle}
        aria-label={isOpen ? 'Close variant switcher' : 'Open variant switcher'}
        title="Variant Switcher"
      >
        ⚙
      </button>

      {isOpen && (
        <div className="dev-toolbar__panel">
          <div className="dev-toolbar__header">Section Preview</div>

          <div className="dev-toolbar__tabs">
            {sections.map((sectionType) => (
              <button
                key={sectionType}
                className={[
                  'dev-toolbar__tab',
                  sectionType === selectedSection ? 'dev-toolbar__tab--active' : '',
                ].join(' ')}
                onClick={() => onSectionChange(sectionType)}
              >
                {sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}
              </button>
            ))}
          </div>

          <div className="dev-toolbar__variants">
            <div className="dev-toolbar__variants-label">
              Variants ({variants.length})
            </div>
            <div className="dev-toolbar__variants-list">
              {variants.map((variant) => (
                <button
                  key={variant.layoutKey}
                  className={[
                    'dev-toolbar__variant-btn',
                    variant.layoutKey === activeLayout ? 'dev-toolbar__variant-btn--active' : '',
                  ].join(' ')}
                  onClick={() => onLayoutChange(variant.layoutKey)}
                >
                  {variant.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}