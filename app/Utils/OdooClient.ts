// app/Utils/OdooClient.ts
import xmlrpc from 'xmlrpc'
import env from '#start/env'

export const ODOO_URL = env.get('ODOO_URL')
export const DB = env.get('ODOO_DB')
export const USER = env.get('ODOO_USER')
export const PASSWORD = env.get('ODOO_PASS')

export async function authenticate(): Promise<number> {
  const client = xmlrpc.createClient({ url: `${ODOO_URL}/xmlrpc/2/common` })

  return new Promise((resolve, reject) => {
    client.methodCall('authenticate', [DB, USER, PASSWORD, {}], (err, uid) => {
      if (err) return reject(err)
      resolve(uid)
    })
  })
}

export function getObjectClient() {
  return xmlrpc.createClient({ url: `${ODOO_URL}/xmlrpc/2/object` })
}
