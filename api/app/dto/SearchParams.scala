package dto

import play.api.libs.json.Json

case class SearchParams(sort: SortParams)

object SearchParams {
  implicit val format = Json.format[SearchParams]
}