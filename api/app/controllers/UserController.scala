package controllers

import com.google.inject.Inject
import persistence.service.{User, Users}
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}


class UserController @Inject()(private val users: Users) extends Controller {

  import play.api.libs.concurrent.Execution.Implicits.defaultContext

  def all = Action.async { request =>
    var future = users.getAll
    future.map(all => {
      Ok(Json.toJson(all.map(it => User(it.id, it.name, "", it.roles))))
    })
  }

}
