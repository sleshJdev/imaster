package controllers

import com.google.inject.Inject
import persistence.service.Roles
import play.api.libs.json.Json
import play.api.mvc.Action

class RoleController @Inject()(private val roles: Roles) extends RestAsyncController {

  def getAll = Action.async(_ => roles.getAll map (list => Ok(Json.toJson(list))))

}
