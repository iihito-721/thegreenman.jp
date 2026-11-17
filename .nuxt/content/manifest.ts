export const checksums = {
  "rockerRoom": "v3.5.0--95QypPIlgS9jGDP8rx1mg9Vk9kzGJYIz8SMV8zoTZb4"
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