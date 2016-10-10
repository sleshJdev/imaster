package controllers

import com.google.inject.Inject
import persistence.service.{User, Users}
import play.api.Logger
import play.api.libs.json.Json
import play.api.mvc.{Action, BodyParsers, Controller}

/**
  * Created by slesh on 10/10/16.
  */
class UserController @Inject()(users: Users) extends Controller {

  import play.api.libs.concurrent.Execution.Implicits.defaultContext

  implicit val userReads = Json.reads[User]
  implicit val userWrites = Json.writes[User]

  def save = Action.async(bodyParser = BodyParsers.parse.json) { request =>
    val user = request.body.asOpt[User]
    Logger.debug("user log in: " + Json.toJson(user))
    users.insert(user.get).map(x => Ok(Json.toJson[Int](x)))
  }

}
