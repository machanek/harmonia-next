/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from 'next'

import config from '../../payload.config'
import { RootLayout } from '@payloadcms/next/layouts'

import './custom.scss'

type Args = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Payload Admin',
  description: 'Admin Panel for Payload CMS',
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config}>
    {children}
  </RootLayout>
)

export default Layout
