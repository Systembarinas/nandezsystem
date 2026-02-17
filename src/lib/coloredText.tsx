import React from 'react';

/**
 * Parses text with color tags like {azul}texto{/azul} and returns React elements.
 * Supported tags: {azul}, {morado}, {verde}, {rosa}, {naranja}, {degradado}
 */

const COLOR_MAP: Record<string, string> = {
  azul: 'text-primary',
  morado: 'text-[hsl(270,70%,55%)]',
  verde: 'text-secondary',
  rosa: 'text-[hsl(340,80%,55%)]',
  naranja: 'text-[hsl(25,95%,55%)]',
  degradado: 'gradient-text',
};

export function parseColoredText(text: string): React.ReactNode {
  if (!text) return null;
  
  // Match {color}content{/color}
  const regex = /\{(\w+)\}(.*?)\{\/\1\}/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const colorKey = match[1];
    const content = match[2];
    const className = COLOR_MAP[colorKey] || '';

    parts.push(
      <span key={match.index} className={className}>
        {content}
      </span>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? <>{parts}</> : text;
}

// Default texts for the site
export const DEFAULT_TEXTS: Record<string, string> = {
  hero_badge: 'Software que impulsa resultados',
  hero_title: 'Automatiza tu negocio.\n{degradado}Multiplica tus ganancias.{/degradado}',
  hero_subtitle: 'Sistemas profesionales diseñados para que vendas más, pierdas menos tiempo y tengas el control total de tu empresa desde cualquier dispositivo.',
  hero_cta_primary: 'Solicitar demo gratis',
  hero_cta_secondary: 'Ver soluciones',
  trust_1_title: '100% Seguro',
  trust_1_subtitle: 'Datos protegidos',
  trust_2_title: 'Rápido',
  trust_2_subtitle: 'Listo en minutos',
  trust_3_title: 'Soporte 24/7',
  trust_3_subtitle: 'Siempre contigo',
  services_badge: '🚀 Nuestras Soluciones',
  services_title: 'Elige el sistema perfecto\n{degradado}para tu negocio{/degradado}',
  services_subtitle: 'Cada solución está diseñada para resolver problemas reales. Haz clic en cualquier producto para ver demos, capturas y detalles completos.',
  services_empty: 'No hay servicios disponibles en este momento.',
  cta_title: '¿Listo para llevar tu negocio al {degradado}siguiente nivel{/degradado}?',
  cta_subtitle: 'Únete a los negocios que ya automatizaron sus procesos y aumentaron sus ventas con nuestros sistemas.',
  cta_button: 'Hablar con un asesor',
  cta_benefit_1: 'Sin contratos',
  cta_benefit_2: 'Soporte incluido',
  cta_benefit_3: 'Demo gratis',
};

/** Get a text value from custom_texts or fallback to default */
export function getText(customTexts: Record<string, string> | null | undefined, key: string): string {
  return customTexts?.[key] || DEFAULT_TEXTS[key] || '';
}
