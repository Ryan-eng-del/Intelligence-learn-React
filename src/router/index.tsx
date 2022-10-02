import type { RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: null,
    children: [
      { index: true, element: null },
      {
        path: '/courses',
        element: null,
        children: [
          { index: true, element: null },
          { path: '/courses/:id', element: null }
        ]
      },
      { path: '*', element: null }
    ]
  }
]
