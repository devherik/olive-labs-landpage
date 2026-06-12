export interface Token {
  text: string
  className?: string
}

export type TerminalTab = 'manifest' | 'infrastructure' | 'commands'

export const TAB_CONTENT: Record<TerminalTab, Token[][]> = {
  manifest: [
    [
      { text: 'const ', className: 'code-keyword' },
      { text: 'studio ', className: '' },
      { text: '= {', className: '' }
    ],
    [
      { text: '  name', className: 'code-keyword' },
      { text: ': ', className: '' },
      { text: '"Olive Labs Studio"', className: 'code-string' },
      { text: ',', className: '' }
    ],
    [
      { text: '  mantra', className: 'code-keyword' },
      { text: ': ', className: '' },
      { text: '"Engineered for Longevity. Rooted in Logic."', className: 'code-string' },
      { text: ',', className: '' }
    ],
    [
      { text: '  architecture', className: 'code-keyword' },
      { text: ': ', className: '' },
      { text: '"Clean Architecture / SOLID"', className: 'code-string' },
      { text: ',', className: '' }
    ],
    [
      { text: '  status', className: 'code-keyword' },
      { text: ': ', className: '' },
      { text: '"OPERATIONAL"', className: 'code-number' }
    ],
    [
      { text: '};', className: '' }
    ]
  ],
  infrastructure: [
    [
      { text: '# docker-compose.yml', className: 'code-comment' }
    ],
    [
      { text: 'services:', className: 'code-keyword' }
    ],
    [
      { text: '  gateway:', className: 'code-keyword' }
    ],
    [
      { text: '    image: ', className: '' },
      { text: 'olivelabs/gateway:stable', className: 'code-string' }
    ],
    [
      { text: '  core-engine:', className: 'code-keyword' }
    ],
    [
      { text: '    image: ', className: '' },
      { text: 'olivelabs/core-go:stable', className: 'code-string' }
    ],
    [
      { text: '  vector-rag:', className: 'code-keyword' }
    ],
    [
      { text: '    image: ', className: '' },
      { text: 'olivelabs/rag-py:stable', className: 'code-string' }
    ]
  ],
  commands: [
    [
      { text: '$ ', className: 'code-keyword' },
      { text: './initialize_project.sh --template clean-slate', className: '' }
    ],
    [
      { text: '[INFO] Loading Olive Labs Core Manifesto...', className: 'code-comment' }
    ],
    [
      { text: '[INFO] Resolving system intersection database nodes...', className: 'code-comment' }
    ],
    [
      { text: '[SUCCESS] Initialized: 3 stable nodes operational.', className: 'code-string' }
    ],
    [
      { text: '[SUCCESS] Engine online. Let\'s build.', className: 'code-string' }
    ]
  ]
}
