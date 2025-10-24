// app/Services/OdooService.ts
import { authenticate, getObjectClient, DB, PASSWORD } from '../Utils/OdooClient.js'

export async function buscarFaturas() {
  const uid = await authenticate()
  const client = getObjectClient()

  return new Promise((resolve, reject) => {
    client.methodCall('execute_kw', [
      DB,
      uid,
      PASSWORD,
      'account.move',
      'search_read',
      [[['move_type', '=', 'out_invoice']]],
      { fields: ['name', 'invoice_date', 'amount_total', 'partner_id'] },
    ], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

export async function buscarVendas() {
  const uid = await authenticate()
  const client = getObjectClient()

  return new Promise((resolve, reject) => {
    client.methodCall('execute_kw', [
      DB,
      uid,
      PASSWORD,
      'sale.order',
      'search_read',
      [[['state', '=', 'sale']]],
      { fields: ['name', 'date_order', 'amount_total', 'partner_id'] },
    ], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}
