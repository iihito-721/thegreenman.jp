export const checksums = {
  "rockerRoom": "v3.5.0--YSEl_3a8MI3MT7mayl6gkL-ztm0nGLuQ1ZKtzXktEs4"
}
export const checksumsStructure = {
  "rockerRoom": "wbgtmbaq0fyEpCH2hLuXNF_dLz2ova6WHbGToO0fpzA"
}

export const tables = {
  "rockerRoom": "_content_rockerRoom",
  "info": "_content_info"
}

export default {
  "rockerRoom": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "body": "json",
      "copyText": "string",
      "cover": "string",
      "date": "string",
      "description": "string",
      "extension": "string",
      "meta": "json",
      "navigation": "json",
      "path": "string",
      "seo": "json",
      "slug": "string",
      "stem": "string",
      "tags": "json"
    }
  },
  "info": {
    "type": "data",
    "fields": {}
  }
}