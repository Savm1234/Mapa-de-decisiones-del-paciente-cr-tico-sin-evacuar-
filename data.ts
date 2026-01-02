
import { MindMapNode } from './types';

export const protocolData: MindMapNode = {
  id: 'root',
  label: 'PACIENTE CRÍTICO SIN EVACUAR',
  type: 'central',
  severity: 'neutral',
  description: 'Cronología de Intervención: Día 1-2 (Optimización) → Día 3 (Alerta/Laxantes) → Día 4-5 (Procinéticos) → Día 6+ (Rescate Crítico).',
  references: [
    { label: 'ESICM AGI Guidelines (2012)' }
  ],
  children: [
    {
      id: 'evaluacion',
      label: '1. EVALUACIÓN Y RIESGO',
      type: 'main',
      severity: 'low',
      description: 'Detección temprana y descarte de obstrucción.',
      references: [
        { label: 'Gungabissoon et al. (Intensive Care Med 2015)' }
      ],
      children: [
        {
          id: 'riesgo-3',
          label: 'Día 3: Alerta',
          type: 'sub',
          severity: 'low',
          action: 'Iniciar protocolo estándar de laxantes. Definir AGI Grado I/II.',
          references: [
            { label: 'WSACS International Guidelines' }
          ]
        },
        {
          id: 'riesgo-6',
          label: 'Día 6: Crítico',
          type: 'sub',
          severity: 'high',
          action: 'Escalada agresiva inmediata. Alto riesgo de falla en destete ventilatorio.',
          references: [
            { label: 'Gungabissoon: Gastric residual volume & outcome' }
          ]
        },
        {
          id: 'obstruccion',
          label: 'Descarte Mecánico',
          type: 'sub',
          severity: 'low',
          action: 'Realizar TAC Abdominal (Gold Standard). Verificar ciego < 10cm.',
          references: [
            { label: 'Radiology in Gastrointestinal Emergencies' }
          ]
        }
      ]
    },
    {
      id: 'optimizacion',
      label: '2. OPTIMIZACIÓN BASAL',
      type: 'main',
      severity: 'low',
      description: 'Cimientos del tratamiento (Días 1-2).',
      children: [
        {
          id: 'electrolitos',
          label: 'Electrolitos',
          type: 'sub',
          severity: 'low',
          action: 'Mantener K+ > 4.0 y Mg++ > 2.0. Sin esto, nada funciona.',
          references: [
            { label: 'Hypokalemia and Ileus - Clinical Review' }
          ]
        },
        {
          id: 'farmacos-off',
          label: 'Retiro de Fármacos',
          type: 'sub',
          severity: 'low',
          action: 'Minimizar opioides y retirar anticolinérgicos.',
          references: [
            { label: 'Drug-induced Gastrointestinal Dysfunction' }
          ]
        }
      ]
    },
    {
      id: 'farmacologica',
      label: '3. TERAPIA ESCALONADA',
      type: 'main',
      severity: 'medium',
      description: 'Intervención farmacológica (Días 3-5).',
      children: [
        {
          id: 'nivel-1',
          label: 'Laxantes (Día 3-4)',
          type: 'sub',
          severity: 'medium',
          action: 'Usar PEG/Macrogol. EVITAR Lactulosa (genera gas/distensión).',
          references: [
            { label: 'Van der Spoel et al. (PEG vs Lactulose in ICU)' }
          ]
        },
        {
          id: 'nivel-2',
          label: 'Procinéticos',
          type: 'sub',
          severity: 'medium',
          action: 'Eritromicina (125mg) + Metoclopramida c/8h. Efecto sinérgico.',
          references: [
            { label: 'Nguyen et al. (Prokinetic Synergism)' }
          ]
        },
        {
          id: 'nivel-3',
          label: 'Manejo Opioides',
          type: 'sub',
          severity: 'high',
          action: 'Naloxona Enteral (Estrategia México) o PAMORAs.',
          references: [
            { label: 'Meissner et al. (Enteral Naloxone in OIC)' }
          ]
        }
      ]
    },
    {
      id: 'rescate',
      label: '4. RESCATE (NEOSTIGMINA)',
      type: 'main',
      severity: 'critical',
      description: 'Para Íleo severo o Síndrome de Ogilvie (Día 6+).',
      children: [
        {
          id: 'neo-sc',
          label: 'Vía Subcutánea',
          type: 'sub',
          severity: 'high',
          action: '0.5 - 1 mg SC. Más segura, menos bradicardia, ideal sin monitoreo de lujo.',
          references: [
            { label: 'Safety of SC Neostigmine in ICU Patients' }
          ]
        },
        {
          id: 'neo-iv',
          label: 'Vía IV Directa',
          type: 'sub',
          severity: 'critical',
          action: '2 mg en 5 min. REQUIERE monitoreo cardíaco por bradicardia severa.',
          references: [
            { label: 'Ponec et al. (NEJM - Neostigmine for Ogilvie)' }
          ]
        }
      ]
    },
    {
      id: 'quirurgico',
      label: '5. MEDIDAS CRÍTICAS',
      type: 'main',
      severity: 'critical',
      description: 'Intervenciones mecánicas finales.',
      children: [
        {
          id: 'descompresion',
          label: 'Descompresión',
          type: 'sub',
          severity: 'critical',
          action: 'Sonda rectal/NG o descompresión colonoscópica.',
          references: [
            { label: 'Endoscopic Decompression Guidelines' }
          ]
        },
        {
          id: 'cecostomia',
          label: 'Quirúrgico',
          type: 'sub',
          severity: 'critical',
          action: 'Cecostomía inmediata si ciego > 12cm o sospecha de isquemia.',
          references: [
            { label: 'Surgical Management of Ogilvie Syndrome' }
          ]
        }
      ]
    }
  ]
};
