/** Types from Singer spec
 * https://github.com/singer-io/getting-started/blob/master/SPEC.md
 */ /** hack for https://github.com/TypeStrong/typedoc/issues/603 */

/** CONFIG is a JSON file containing any configuration parameters the Tap needs.
 * https://github.com/singer-io/getting-started/blob/master/SPEC.md#configuration */
export interface ConfigType {
  // suggested by spec
  start_date?: Date
  user_agent?: string
  api_key?: string

  // used by scan_* scanner modules to describe the folder they'll be scanning
  target_folder?: string
}

/** This object contains all available CONFIG/STATE/CATALOG records
 * https://github.com/singer-io/getting-started/blob/master/SPEC.md#synopsis */
export interface allConfigs {
  config: ConfigType
  /** TODO: add state and catalog */
}

/** SCHEMA messages describe the datatypes of data in the stream
 * https://github.com/singer-io/getting-started/blob/master/SPEC.md#schema */
export class streamSchema {
  readonly type: string = 'SCHEMA'
  /** string name of the stream -- matches the stream property of the RECORDS being described */
  stream?: string
  /** Required.  A list of strings indicating which properties make up
   * the primary key for this stream. Each item in the list must be the
   * name of a top-level property defined in the schema. A value for
   * key_properties must be provided, but it may be an empty list to
   * indicate that there is no primary key. */
  key_properties: Array<string> = []
  /** Optional. A list of strings indicating which properties the tap is using as bookmarks.
   * Each item in the list must be the name of a top-level property defined in the schema. */
  bookmark_properties?: Array<string>
  /** A JSON Schema describing the data property of RECORDs from the same stream */
  schema: object | undefined
}

/** RECORD messages contain the data from the data stream.
 * https://github.com/singer-io/getting-started/blob/master/SPEC.md#record */
export class streamRecord {
  readonly type: string = 'RECORD'
  /** string name of the stream -- matches the stream property of the SCHEMA property that describes this RECORD type*/
  stream: string | undefined
  /** Optional. The time this record was observed in the source. */
  time_extracted?: Date
  /** A JSON map containing a streamed data point */
  record: object | undefined
}

/** STATE messages contain the state that the Tap wishes to persist.
 * https://github.com/singer-io/getting-started/blob/master/SPEC.md#state-1 */
export class streamState {
  readonly type: string = 'STATE'
  /** Required. The JSON formatted state value. The semantics of a STATE value are not
   *  part of the specification, and should be determined independently by each Tap. */
  value: object | undefined
}
