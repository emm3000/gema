import { Readable } from 'stream'

/**
 * Crea un stream JSON lineal (NDJSON) para exportar grandes volúmenes de datos sin sobrecargar memoria.
 *
 * @param fetchBatch función que recibe un offset y un limit, y devuelve un array de objetos
 * @param batchSize cantidad de registros a traer por chunk
 * @param transform opcional: transforma cada registro antes de escribirlo en el stream
 */
export function createChunkedJsonStream<T>(
  fetchBatch: (offset: number, limit: number) => Promise<T[]>,
  batchSize = 500,
  transform?: (item: T) => any,
): Readable {
  let offset = 0
  let buffer: T[] = []
  let index = 0

  return new Readable({
    async read() {
      try {
        // Si no hay buffer, traer siguiente batch
        if (buffer.length === 0) {
          buffer = await fetchBatch(offset, batchSize)
          offset += buffer.length
          index = 0
        }

        // Si ya no hay más datos -> finalizar stream
        if (buffer.length === 0) {
          this.push(null)
          return
        }

        // Enviar un chunk
        const item = buffer[index++]
        const output = JSON.stringify(transform ? transform(item) : item) + '\n'
        this.push(output)

        // Si se consumió todo el buffer, limpiarlo
        if (index >= buffer.length) {
          buffer = []
        }
      } catch (err) {
        console.error('Error en stream:', err)
        this.destroy(err)
      }
    },
  })
}
