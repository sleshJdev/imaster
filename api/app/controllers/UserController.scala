package controllers

import com.google.inject.Inject
import persistence.service.{User, Users}
import play.api.libs.json.Json
import play.api.mvc.Action


class UserController @Inject()(private val users: Users) extends RestAsyncController {

  def all = Action.async { _ =>
    users.getAll.map(all => {
      Ok(Json.toJson(all.map(it => User(it.id, it.name, "", it.roles))))
    })
  }

}
