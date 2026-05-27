/**
 * Year → travel metadata for chapters where the couple traveled somewhere.
 * Used by [TravelAccents](../components/scrapbook/TravelAccents.tsx) to render
 * ticket stubs and passport stamps on the corresponding year chapter pages.
 */
export interface TravelMeta {
  destination: string
  from: string
  stampDate: string
  ticketDate: string
}

export const TRAVEL_META: Record<number, TravelMeta | undefined> = {
  2017: { destination: 'Guwahati', from: 'Home', stampDate: 'AUG 2017', ticketDate: 'Aug 2017' },
  2019: { destination: 'Kolkata',  from: 'Home', stampDate: 'MAR 2019', ticketDate: 'Mar 2019' },
  2020: { destination: 'Udalguri', from: 'Home', stampDate: 'DEC 2020', ticketDate: 'Dec 2020' },
  2022: { destination: 'Sikkim',   from: 'Home', stampDate: 'MAY 2022', ticketDate: 'May 2022' },
}
