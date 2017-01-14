package dto

import play.api.libs.json.Json

case class SortParams(field: String, asc: Boolean)

object SortParams {
  implicit val format = Json.format[SortParams]
}

