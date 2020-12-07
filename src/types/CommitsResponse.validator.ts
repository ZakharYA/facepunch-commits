/* tslint:disable */
// generated by typescript-json-validator
import {inspect} from 'util';
import Ajv = require('ajv');
import CommitsResponse from './CommitsResponse';
export const ajv = new Ajv({"allErrors":true,"coerceTypes":false,"format":"fast","nullable":true,"unicode":true,"uniqueItems":true,"useDefaults":true});

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

export {CommitsResponse};
export const CommitsResponseSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "defaultProperties": [
  ],
  "definitions": {
    "Commit": {
      "defaultProperties": [
      ],
      "properties": {
        "branch": {
          "description": "name branch",
          "type": "string"
        },
        "changeset": {
          "description": "changeset id",
          "type": "string"
        },
        "created": {
          "description": "date created fixation commit (PLS SUPPORT UNIXTIME!!!)",
          "type": "string"
        },
        "id": {
          "description": "unique id commit",
          "type": "number"
        },
        "message": {
          "description": "commit message",
          "type": "string"
        },
        "repo": {
          "description": "name repository",
          "type": "string"
        },
        "user": {
          "defaultProperties": [
          ],
          "description": "user info commit",
          "properties": {
            "avatar": {
              "description": "avatar author commit",
              "type": "string"
            },
            "name": {
              "description": "name author commit",
              "type": "string"
            }
          },
          "required": [
            "avatar",
            "name"
          ],
          "type": "object"
        }
      },
      "required": [
        "branch",
        "changeset",
        "created",
        "id",
        "message",
        "repo",
        "user"
      ],
      "type": "object"
    }
  },
  "properties": {
    "results": {
      "items": {
        "$ref": "#/definitions/Commit"
      },
      "type": "array"
    },
    "skip": {
      "type": "number"
    },
    "take": {
      "type": "number"
    },
    "total": {
      "type": "number"
    }
  },
  "required": [
    "results",
    "skip",
    "take",
    "total"
  ],
  "type": "object"
};
export type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>
export const isCommitsResponse = ajv.compile(CommitsResponseSchema) as ValidateFunction<CommitsResponse>;
export default function validate(value: unknown): CommitsResponse {
  if (isCommitsResponse(value)) {
    return value;
  } else {
    throw new Error(
      ajv.errorsText(isCommitsResponse.errors!.filter((e: any) => e.keyword !== 'if'), {dataVar: 'CommitsResponse'}) +
      '\n\n' +
      inspect(value),
    );
  }
}